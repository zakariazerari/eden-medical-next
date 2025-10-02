import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Booking from "@/models/Booking";
import ContactMessage from "@/models/ContactMessage";

export async function GET() {
  try {
    await connectDB();

    // Booking Stats
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: "confirmed" });
    const canceledBookings = await Booking.countDocuments({ status: "canceled" });
    const pendingBookings = await Booking.countDocuments({ status: "pending" });

    // Messages Stats
    const totalMessages = await ContactMessage.countDocuments();
    const pendingMessages = await ContactMessage.countDocuments({ status: "pending" });
    const confirmedMessages = await ContactMessage.countDocuments({ status: "confirmed" });
    const canceledMessages = await ContactMessage.countDocuments({ status: "canceled" });

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