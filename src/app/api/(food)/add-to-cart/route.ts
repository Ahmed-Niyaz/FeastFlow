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

  const { itemId } = await request.json();

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unable to find user to add to cart",
        },
        { status: 404 }
      );
    }
    
    // const cartData: { [key: string]: number } = user.cartData as { [key: string]: number } || {};

    // // Update cartData
    // cartData[itemId] = (cartData[itemId] || 0) + 1;

    // // Save the updated cartData to the user's document
    // user.cartData = cartData;
    // await user.save();


    // Successfully updated message acceptance status
    return Response.json(
      {
        success: true,
        message: "cart updated",
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

