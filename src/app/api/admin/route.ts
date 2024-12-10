import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/model/orderModel";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {

  // this session was used here to allow the signed in person to be an admin

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  await dbConnect();

  const { orderId, status } = await request.json();

  try {
    const orders = await OrderModel.findByIdAndUpdate(
      orderId,
      {
        status,
      },
      {
        new: true,
      }
    );

    if (!orders) {
      return Response.json(
        {
          success: false,
          message: "No order with that id to update",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Successfully changed the order status",
        ordersData: orders,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error changing status",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  try {
    const orders = await OrderModel.find({}).sort({ date: -1 });

    if (orders) {
      return Response.json({
        success: true,
        message: "Fetched all orders",
        ordersData: orders,
      });
    }

    return Response.json({
      success: false,
      message: "No orders",
      ordersData: orders,
    });
  } catch (error) {
    console.error("Error fetching all orders", error);
    return Response.json({
      success: false,
      message: "Error fetching all orders",
    });
  }
}
