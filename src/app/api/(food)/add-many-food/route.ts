import dbConnect from "@/lib/dbConnect";
import newFoodModel from "@/model/newFoodModel";
import { foods } from '@/foodData';

const imgUrl =
  "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=1630&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


export async function POST(request: Request) {

  await dbConnect();

  try {

    

    const result = await newFoodModel.insertMany(foods)

    return Response.json({
      success: true,
      message: "Successfully added all food",
      data: result,
    });
  } catch (error) {
    console.error("Error adding food", error);
    return Response.json({
      success: false,
      message: "Error adding food",
    });
  }
}


// const foods = [
//         {
//           name: "Greek Salad",
//           imageUrl: imgUrl,
//           price: 12,
//           description:
//             "A refreshing mix of cucumbers, tomatoes, feta cheese, and olives.",
//           category: FoodCategory.APPETIZER,
//         },
//         {
//           name: "Caesar Salad",
//           imageUrl: imgUrl,
//           price: 10,
//           description:
//             "Classic Caesar salad with crunchy croutons and parmesan cheese.",
//           category: FoodCategory.APPETIZER,
//         },
//         {
//           name: "Bruschetta",
//           imageUrl: imgUrl,
//           price: 8,
//           description: "Grilled bread topped with tomato, basil, and olive oil.",
//           category: FoodCategory.APPETIZER,
//         },
//         {
//           name: "Spring Rolls",
//           imageUrl: imgUrl,
//           price: 7,
//           description:
//             "Crispy rolls filled with vegetables and served with sweet chili sauce.",
//           category: FoodCategory.APPETIZER,
//         },
//         {
//           name: "Minestrone Soup",
//           imageUrl: imgUrl,
//           price: 9,
//           description:
//             "A hearty Italian soup made with vegetables, pasta, and beans.",
//           category: FoodCategory.APPETIZER,
//         },
//         {
//           name: "Grilled Chicken",
//           imageUrl: imgUrl,
//           price: 18,
//           description: "Juicy grilled chicken served with steamed vegetables.",
//           category: FoodCategory.MAIN_COURSE,
//         },
//         {
//           name: "Spaghetti Bolognese",
//           imageUrl: imgUrl,
//           price: 14,
//           description: "Traditional Italian pasta with a rich meat sauce.",
//           category: FoodCategory.MAIN_COURSE,
//         },
//         {
//           name: "Beef Stroganoff",
//           imageUrl: imgUrl,
//           price: 20,
//           description: "Tender beef strips in creamy mushroom sauce over noodles.",
//           category: FoodCategory.MAIN_COURSE,
//         },
//         {
//           name: "Chicken Tikka Masala",
//           imageUrl: imgUrl,
//           price: 16,
//           description: "Marinated chicken cooked in creamy tomato sauce with spices.",
//           category: FoodCategory.MAIN_COURSE,
//         },
//         {
//           name: "Grilled Salmon",
//           imageUrl: imgUrl,
//           price: 22,
//           description: "Fresh salmon grilled to perfection with lemon butter.",
//           category: FoodCategory.MAIN_COURSE,
//         },
//         {
//           name: "Cheesecake",
//           imageUrl: imgUrl,
//           price: 8,
//           description: "Creamy cheesecake with a graham cracker crust.",
//           category: FoodCategory.DESSERT,
//         },
//         {
//           name: "Chocolate Lava Cake",
//           imageUrl: imgUrl,
//           price: 9,
//           description: "Warm chocolate cake with a gooey center.",
//           category: FoodCategory.DESSERT,
//         },
//         {
//           name: "Tiramisu",
//           imageUrl: imgUrl,
//           price: 10,
//           description:
//             "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone.",
//           category: FoodCategory.DESSERT,
//         },
//         {
//           name: "Panna Cotta",
//           imageUrl: imgUrl,
//           price: 7,
//           description: "Silky-smooth vanilla dessert with a berry compote.",
//           category: FoodCategory.DESSERT,
//         },
//         {
//           name: "Apple Pie",
//           imageUrl: imgUrl,
//           price: 6,
//           description: "Warm apple pie served with vanilla ice cream.",
//           category: FoodCategory.DESSERT,
//         },
//         {
//           name: "Cappuccino",
//           imageUrl: imgUrl,
//           price: 4,
//           description: "Classic Italian coffee with steamed milk foam.",
//           category: FoodCategory.BEVERAGE,
//         },
//         {
//           name: "Iced Tea",
//           imageUrl: imgUrl,
//           price: 3,
//           description: "Refreshing iced tea served with a slice of lemon.",
//           category: FoodCategory.BEVERAGE,
//         },
//         {
//           name: "Smoothie",
//           imageUrl: imgUrl,
//           price: 5,
//           description: "Blended fruit smoothie made with fresh ingredients.",
//           category: FoodCategory.BEVERAGE,
//         },
//         {
//           name: "Mojito",
//           imageUrl: imgUrl,
//           price: 6,
//           description: "Classic mint and lime cocktail with soda water.",
//           category: FoodCategory.BEVERAGE,
//         },
//         {
//           name: "Hot Chocolate",
//           imageUrl: imgUrl,
//           price: 4,
//           description: "Rich and creamy hot chocolate topped with whipped cream.",
//           category: FoodCategory.BEVERAGE,
//         },
//         {
//           name: "Garlic Bread",
//           imageUrl: imgUrl,
//           price: 5,
//           description: "Toasty bread topped with garlic butter and herbs.",
//           category: FoodCategory.SIDE_DISH,
//         },
//         {
//           name: "French Fries",
//           imageUrl: imgUrl,
//           price: 4,
//           description: "Crispy golden fries served with ketchup.",
//           category: FoodCategory.SIDE_DISH,
//         },
//         {
//           name: "Mashed Potatoes",
//           imageUrl: imgUrl,
//           price: 6,
//           description: "Creamy mashed potatoes with a touch of butter.",
//           category: FoodCategory.SIDE_DISH,
//         },
//         {
//           name: "Coleslaw",
//           imageUrl: imgUrl,
//           price: 4,
//           description: "Crunchy cabbage salad in a tangy dressing.",
//           category: FoodCategory.SIDE_DISH,
//         },
//         {
//           name: "Steamed Rice",
//           imageUrl: imgUrl,
//           price: 3,
//           description: "Fluffy steamed rice, a perfect complement to main dishes.",
//           category: FoodCategory.SIDE_DISH,
//         },
//         {
//           name: "Stuffed Mushrooms",
//           imageUrl: imgUrl,
//           price: 9,
//           description: "Baked mushrooms filled with a cheesy herb stuffing.",
//           category: FoodCategory.APPETIZER,
//         },
//         {
//           name: "Buffalo Wings",
//           imageUrl: imgUrl,
//           price: 11,
//           description: "Spicy and tangy chicken wings served with ranch dip.",
//           category: FoodCategory.APPETIZER,
//         },
//         {
//           name: "Margherita Pizza",
//           imageUrl: imgUrl,
//           price: 14,
//           description:
//             "Classic pizza with fresh basil, mozzarella, and tomato sauce.",
//           category: FoodCategory.MAIN_COURSE,
//         },
//         {
//           name: "Fettuccine Alfredo",
//           imageUrl: imgUrl,
//           price: 15,
//           description: "Rich and creamy Alfredo sauce over fettuccine pasta.",
//           category: FoodCategory.MAIN_COURSE,
//         },
//         {
//           name: "Chicken Fajitas",
//           imageUrl: imgUrl,
//           price: 17,
//           description: "Sizzling chicken served with tortillas and sides.",
//           category: FoodCategory.MAIN_COURSE,
//         },
//         {
//           name: "Creme Brulee",
//           imageUrl: imgUrl,
//           price: 10,
//           description: "Rich custard topped with a caramelized sugar crust.",
//           category: FoodCategory.DESSERT,
//         },
//         {
//           name: "Brownie Sundae",
//           imageUrl: imgUrl,
//           price: 8,
//           description:
//             "Warm chocolate brownie served with ice cream and fudge sauce.",
//           category: FoodCategory.DESSERT,
//         },
//         {
//           name: "Fruit Tart",
//           imageUrl: imgUrl,
//           price: 9,
//           description: "Buttery tart filled with custard and fresh fruits.",
//           category: FoodCategory.DESSERT,
//         },
//         {
//           name: "Espresso",
//           imageUrl: imgUrl,
//           price: 3,
//           description: "Strong and bold Italian coffee shot.",
//           category: FoodCategory.BEVERAGE,
//         },
//         {
//           name: "Lemonade",
//           imageUrl: imgUrl,
//           price: 4,
//           description: "Refreshing lemonade with a hint of mint.",
//           category: FoodCategory.BEVERAGE,
//         },
//         {
//           name: "Garlic Mashed Potatoes",
//           imageUrl: imgUrl,
//           price: 7,
//           description: "Mashed potatoes infused with roasted garlic.",
//           category: FoodCategory.SIDE_DISH,
//         },
//         {
//           name: "Onion Rings",
//           imageUrl: imgUrl,
//           price: 6,
//           description: "Crispy fried onion rings served with dipping sauce.",
//           category: FoodCategory.SIDE_DISH,
//         },
//         {
//           name: "Grilled Vegetables",
//           imageUrl: imgUrl,
//           price: 8,
//           description: "Fresh vegetables grilled with olive oil and herbs.",
//           category: FoodCategory.SIDE_DISH,
//         },
//         {
//           name: "Sweet Potato Fries",
//           imageUrl: imgUrl,
//           price: 7,
//           description: "Golden sweet potato fries with a touch of cinnamon.",
//           category: FoodCategory.SIDE_DISH,
//         },
//         {
//           name: "Cheese Sticks",
//           imageUrl: imgUrl,
//           price: 8,
//           description: "Breaded and fried cheese sticks served with marinara sauce.",
//           category: FoodCategory.SIDE_DISH,
//         },
//       ];
    