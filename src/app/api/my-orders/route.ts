import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/model/orderModel";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }
  const userId = user._id;

  await dbConnect();

  try {
    const orders = await OrderModel.find({
        userId: userId, 
        payment: true
    }).sort({date: -1});

    return Response.json({
        success: true,
        message: "Fetched orders successfully",
        orderData: orders
    }, {status: 200});
  } catch (error) {
    console.error("Error fetching orders", error);
    return Response.json({
        success: false,
        message: "error fetching orders"
    }, {status: 500});

  }
}
