import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/model/orderModel";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/userModel";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  const { orderId } = await request.json();

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message:
          "Failed to remove the cart Data from verify due to no user found with that id or problem getting the id",
      },
      { status: 401 }
    );
  }

  const userId = user._id;

  try {
    if (orderId && userId) {
      const updatedUserCart = await UserModel.findByIdAndUpdate(userId, {
        cartData: {},
      });

      const updateOrderPayment = await OrderModel.findByIdAndUpdate(
        orderId,
        {
          payment: true,
        },
        { new: true }
      );

      return Response.json(
        {
          success: true,
          message: "Payment updated and emptied the cart data from user",
          orderData: updateOrderPayment,
          userData: updatedUserCart,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error updating payment:", error);
    return Response.json(
      { success: false, message: "Error updating payment" },
      { status: 500 }
    );
  }
}
