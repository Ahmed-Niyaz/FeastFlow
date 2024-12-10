import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import newFoodModel from "@/model/newFoodModel";

export async function POST(request: Request) {
  const { foodId } = await request.json();

  console.log("this is food id" ,foodId)
  // this session was used here to allow the signed in person to be an admin

  // const session = await getServerSession(authOptions);

  // const user: User = session?.user as User;

  // if (!session || !session.user) {
  //   return Response.json(
  //     { success: false, message: "Not authenticated" },
  //     { status: 401 }
  //   );
  // }

  await dbConnect();

  try {
    const deletedFood = await newFoodModel.findByIdAndDelete(foodId);

    if (!deletedFood) {
      return Response.json({
        success: false,
        message: "Food item not found",
      }, { status: 404 });
    }

    const updatedFoodList = await newFoodModel.find({});

    return Response.json({
      success: true,
      message: "Successfully removed food",
      data: updatedFoodList,
    });
  } catch (error) {
    console.error("Error removing food", error);
    return Response.json({
      success: false,
      message: "Error removing food",
    });
  }
}
