// this is currently not used as in this project there is no verify code required and I need to inject the user data in session so I have used the signup functionality in authOptions itself
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/userModel";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

  await dbConnect();

  try {
    const isUserExisting = await UserModel.findOne({
      email: email,
    });

    if (isUserExisting) {
      return Response.json({
        success: false,
        message:
          "This email is already in use, please login or use different email to sign-up",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return Response.json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error signing up user", error);
    return Response.json({
      success: false,
      message: "Failed creating user",
    });
  }
}
