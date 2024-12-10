import dbConnect from "@/lib/dbConnect";
import newFoodModel from "@/model/newFoodModel";

export async function DELETE(request: Request) {
  await dbConnect();

  try {
    const removeAllFood = await newFoodModel.deleteMany();

    return Response.json({
      success: true,
      message: "Successfully removed all food",
      removeAllFood,
    });
  } catch (error) {
    console.error("Error removing all food", error);
    return Response.json({
      success: false,
      message: "Error removing all food",
    });
  }
}
