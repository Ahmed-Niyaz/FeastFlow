import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/model/orderModel";
import UserModel from "@/model/userModel";
import Stripe from "stripe";

const stripe = new Stripe(String(process.env.STRIPE_API_SECRET));
interface CartItem {
  name: string;
  price: number;
  quantity: number;
}
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }
  const userId = user._id;
  const { items, address, amount } = await request.json();

  await dbConnect();

  try {
    const newOrder = await OrderModel.create({
      userId,
      items,
      amount,
      address,
    });

    // will empty the cart once the payment is true else keep it in user data
    // const updatedUserCart = await UserModel.findByIdAndUpdate(userId, {
    //   cartData: {},
    // });

    // stripe payments functionality
    const line_items = items.map((item: CartItem) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 15,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 5 * 100 * 10,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/verify-payment?success=true&orderId=${newOrder._id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/verify-payment?success=false&orderId=${newOrder._id}`,
    });

    return Response.json({
      success: true,
      message: "Created order successfully",
      session_url: session.url,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return Response.json(
      { success: false, message: "Error placing order" },
      { status: 500 }
    );
  }
}
