import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Booking from "@/models/Booking";
import ContactMessage from "@/models/ContactMessage";

// ✅ FIXED: Removed Driver & Review (not needed for now)
// If you need them later, make sure to:
// 1. Create the models: @/models/Driver.js and @/models/Review.js
// 2. Import them here

// GET: Fetch all statistics - OPTIMIZED
export async function GET() {
  try {
    console.time("⏱️ Stats API");
    await connectDB();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // ✅ Run queries in parallel using Promise.all
    const [bookingStats, messageStats] = await Promise.all([
      // Bookings - aggregate all counts in ONE query
      Booking.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            confirmed: [{ $match: { status: "confirmed" } }, { $count: "count" }],
            pending: [{ $match: { status: "pending" } }, { $count: "count" }],
            canceled: [{ $match: { status: "canceled" } }, { $count: "count" }],
            recent: [
              { $match: { createdAt: { $gte: sevenDaysAgo } } },
              { $count: "count" },
            ],
          },
        },
      ]),

      // Messages - aggregate all counts in ONE query
      ContactMessage.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            pending: [{ $match: { status: "pending" } }, { $count: "count" }],
            confirmed: [{ $match: { status: "confirmed" } }, { $count: "count" }],
            canceled: [{ $match: { status: "canceled" } }, { $count: "count" }],
            recent: [
              { $match: { createdAt: { $gte: sevenDaysAgo } } },
              { $count: "count" },
            ],
          },
        },
      ]),
    ]);

    // Extract results with safe defaults
    const bookings = {
      totalBookings: bookingStats[0]?.total[0]?.count || 0,
      confirmedBookings: bookingStats[0]?.confirmed[0]?.count || 0,
      pendingBookings: bookingStats[0]?.pending[0]?.count || 0,
      canceledBookings: bookingStats[0]?.canceled[0]?.count || 0,
      recentBookings: bookingStats[0]?.recent[0]?.count || 0,
    };

    const messages = {
      totalMessages: messageStats[0]?.total[0]?.count || 0,
      pendingMessages: messageStats[0]?.pending[0]?.count || 0,
      confirmedMessages: messageStats[0]?.confirmed[0]?.count || 0,
      canceledMessages: messageStats[0]?.canceled[0]?.count || 0,
      recentMessages: messageStats[0]?.recent[0]?.count || 0,
    };

    console.timeEnd("⏱️ Stats API");

    return NextResponse.json(
      {
        bookings,
        messages,
        // ✅ Optional: Add these when you create the models
        // drivers: { totalDrivers: 0, activeDrivers: 0, inactiveDrivers: 0 },
        // reviews: { totalReviews: 0, approvedReviews: 0, pendingReviews: 0, averageRating: 0 }
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=120, stale-while-revalidate=240",
        },
      }
    );
  } catch (error) {
    console.error("❌ GET stats error:", error);
    return NextResponse.json(
      { message: "Error fetching statistics", error: error.message },
      { status: 500 }
    );
  }
}