import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, createAdminToken } from "@/utils/cookieToken";

export { createAdminToken as createAdminCookieValue };

export async function requireAdminAuth() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin-auth");

  if (!authCookie || !verifyToken(authCookie.value)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  return null;
}
