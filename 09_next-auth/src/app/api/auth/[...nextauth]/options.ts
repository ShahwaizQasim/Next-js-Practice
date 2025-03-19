import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
// import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";

interface CustomUser {
  id: string;
  userName: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password are required");
        }
        await dbConnect();
        try {
          const user = await UserModel.findOne({ email: credentials?.email });
          if (!user) {
            throw new Error("User Not Found");
          }
          const isPasswordMatch = await bcrypt.compare(
            credentials?.password,
            user?.password
          );
          if (!isPasswordMatch) {
            throw new Error("Incorrect Password");
          }
          return {
            id: user._id.toString(),
            userName: user.userName,
            email: user.email,
            isVerified: user.isVerified,
            isAdmin: user.isAdmin,
          };
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: CustomUser }) {
      if (user) {
        token.id = user.id;
        token.userName = user.userName;
        token.email = user.email;
        token.isVerified = user.isVerified;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.userName = token.userName;
        session.user.email = token.email;
        session.user.isAdmin = token.isAdmin;
        session.user.isVerified = token.isVerified;
      }
      return session;
    },
  },
  session:{
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET || '12345'
};
