import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/userModel";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        isSignup: {
          label: "Is Signup",
          type: "text",
        }, //  Used to differentiate between signin and signup
      },

      async authorize(credentials: any): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }
        await dbConnect();

        try {
          // Handle Signup
          if (credentials.isSignup === "true") {
            if (!credentials.username) {
              throw new Error("Username required for signup");
            }

            const existingUser = await UserModel.findOne({
              email: credentials.email,
            });

            if (existingUser) {
              throw new Error("User with this email already exists");
            }

            const hashedPassword = await bcrypt.hash(credentials.password, 10);

            const newUser = new UserModel({
              username: credentials.username,
              email: credentials.email,
              password: hashedPassword,
            });

            await newUser.save();
            return newUser;
          } else {
            const user = await UserModel.findOne({
              email: credentials.email,
            });
            if (!user) {
              throw new Error("No user found with this email");
            }

            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Incorrect password");
            }
          }
        } catch (error: any) {
          console.error("This is inside options.ts file in catch block", error);
          throw new Error(error);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.email = token.email;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: "/sign-in",
  },
};
