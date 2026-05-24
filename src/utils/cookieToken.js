import crypto from "crypto";

function getSecret() {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error("NEXTAUTH_SECRET not set");
  return secret;
}

export function signToken(value) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function verifyToken(cookieValue) {
  if (!cookieValue) return false;
  const parts = cookieValue.split(".");
  if (parts.length !== 2) return false;
  const [value, signature] = parts;
  try {
    const expected = signToken(value);
    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}

export function createAdminToken() {
  const value = "admin-authenticated";
  return `${value}.${signToken(value)}`;
}
