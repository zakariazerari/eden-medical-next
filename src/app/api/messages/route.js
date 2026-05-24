import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import ContactMessage from "@/models/ContactMessage";
import { requireAdminAuth } from "@/utils/adminAuth";

// GET: Fetch recent messages - Admin only
export async function GET() {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    await connectDB();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const messages = await ContactMessage.find({
      createdAt: { $gte: oneWeekAgo }
    }).sort({ createdAt: -1 }).lean();

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
