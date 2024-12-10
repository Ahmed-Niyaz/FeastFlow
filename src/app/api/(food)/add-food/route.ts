import dbConnect from "@/lib/dbConnect";
import newFoodModel from "@/model/newFoodModel";

export async function POST(request: Request) {
  const { name, description, category, price, imageUrl } = await request.json();

  console.log("these are the details ", name, description, price, category, imageUrl);

  await dbConnect();

  try {
    const foodItem = await newFoodModel.create({
      name,
      description,
      category,
      price,
      imageUrl,
    });

    return Response.json({
      success: true,
      message: "Successfully added food",
      foodItem,
    });
  } catch (error) {
    console.error("Error adding food", error);
    return Response.json({
      success: false,
      message: "Error adding food",
    });
  }
}
