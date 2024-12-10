import dbConnect from "@/lib/dbConnect";
import newFoodModel from "@/model/newFoodModel";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();

  try {
    const foodList = await newFoodModel.find({});

    if (foodList.length > 0) {
      return Response.json({
        success: true,
        message: "Successfully fetched all foods",
        data: foodList,
      });
    }

    return Response.json({
      success: false,
      message: "No food items here",
    });
  } catch (error) {
    console.error("Error getting all food", error);
    return Response.json({
      success: false,
      message: "Error getting all food",
    });
  }
}
