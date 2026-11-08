import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "./db";
import User, { IUser } from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "learnwithsky_super_secret_jwt_key_2026";

export const generateToken = (id: string | unknown): string => {
  return jwt.sign({ id: String(id) }, JWT_SECRET, { expiresIn: "30d" });
};

export const verifyToken = (token: string): { id: string } => {
  return jwt.verify(token, JWT_SECRET) as { id: string };
};

export async function getAuthUser(req: Request | NextRequest): Promise<IUser | null> {
  await connectDB();
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select("-password");
    return user;
  } catch (err) {
    return null;
  }
}

export async function requireAuth(
  req: Request | NextRequest,
  roles?: string[]
): Promise<{ user: IUser; errorResponse?: never } | { user?: never; errorResponse: NextResponse }> {
  const user = await getAuthUser(req);

  if (!user) {
    return {
      errorResponse: NextResponse.json(
        { message: "Not authorized, token failed or missing" },
        { status: 401 }
      ),
    };
  }

  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return {
      errorResponse: NextResponse.json(
        { message: `User role '${user.role}' is not authorized to access this resource` },
        { status: 403 }
      ),
    };
  }

  return { user };
}
