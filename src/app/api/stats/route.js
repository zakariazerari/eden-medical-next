import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Booking from "@/models/Booking";
import ContactMessage from "@/models/ContactMessage";

export async function GET() {
  try {
    await connectDB();

    // Calculate stats for LAST 7 DAYS ONLY
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Booking Stats (last 7 days)
    const totalBookings = await Booking.countDocuments({
      createdAt: { $gte: oneWeekAgo }
    });
    const confirmedBookings = await Booking.countDocuments({ 
      status: "confirmed",
      createdAt: { $gte: oneWeekAgo }
    });
    const canceledBookings = await Booking.countDocuments({ 
      status: "canceled",
      createdAt: { $gte: oneWeekAgo }
    });
    const pendingBookings = await Booking.countDocuments({ 
      status: "pending",
      createdAt: { $gte: oneWeekAgo }
    });

    // Messages Stats (last 7 days)
    const totalMessages = await ContactMessage.countDocuments({
      createdAt: { $gte: oneWeekAgo }
    });
    const pendingMessages = await ContactMessage.countDocuments({ 
      status: "pending",
      createdAt: { $gte: oneWeekAgo }
    });
    const confirmedMessages = await ContactMessage.countDocuments({ 
      status: "confirmed",
      createdAt: { $gte: oneWeekAgo }
    });
    const canceledMessages = await ContactMessage.countDocuments({ 
      status: "canceled",
      createdAt: { $gte: oneWeekAgo }
    });

    return NextResponse.json({
      bookings: { 
        totalBookings, 
        confirmedBookings, 
        canceledBookings, 
        pendingBookings 
      },
      messages: { 
        totalMessages, 
        pendingMessages, 
        confirmedMessages, 
        canceledMessages 
      },
    });
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json(
      { message: "Error fetching stats" }, 
      { status: 500 }
    );
  }
}