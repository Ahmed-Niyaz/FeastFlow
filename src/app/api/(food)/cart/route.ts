import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";
import { User } from "next-auth";
import UserModel from "@/model/userModel";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  const userId = user._id;

  const { cartData } = await request.json();

  try {
    const updateCartInUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        cartData,
      },
      {
        new: true,
      }
    );

    if (!updateCartInUser) {
      // User not found
      return Response.json(
        {
          success: false,
          message: "Unable to find user to update message acceptance status",
        },
        { status: 404 }
      );
    }

    // Successfully updated message acceptance status
    return Response.json(
      {
        success: true,
        message: "cart updated",
        updateCartInUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating cart:", error);
    return Response.json(
      { success: false, message: "Error updating cart" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  const userId = user._id;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      // User not found
      return Response.json(
        {
          success: false,
          message: "Unable to find user to get cart data",
        },
        { status: 404 }
      );
    }

    // Successfully updated message acceptance status

    return Response.json(
      {
        success: true,
        message: "get cart data",
        cartData: user.cartData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting cart data:", error);
    return Response.json(
      { success: false, message: "Error getting cart data" },
      { status: 500 }
    );
  }
}
