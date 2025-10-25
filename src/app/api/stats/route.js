import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Booking from "@/models/Booking";
import ContactMessage from "@/models/ContactMessage";
import Driver from "@/models/Driver";
import Review from "@/models/Review";

// GET: Fetch all statistics - OPTIMIZED
export async function GET() {
  try {
    console.time("⏱️ Stats API");
    await connectDB();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // ✅ Run ALL queries in parallel using Promise.all
    const [
      bookingStats,
      messageStats,
      driverStats,
      reviewStats
    ] = await Promise.all([
      // Bookings - aggregate all counts in ONE query
      Booking.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            confirmed: [{ $match: { status: 'confirmed' } }, { $count: "count" }],
            pending: [{ $match: { status: 'pending' } }, { $count: "count" }],
            canceled: [{ $match: { status: 'canceled' } }, { $count: "count" }],
            recent: [{ $match: { createdAt: { $gte: sevenDaysAgo } } }, { $count: "count" }]
          }
        }
      ]),

      // Messages - aggregate all counts in ONE query
      ContactMessage.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            pending: [{ $match: { status: 'pending' } }, { $count: "count" }],
            confirmed: [{ $match: { status: 'confirmed' } }, { $count: "count" }],
            canceled: [{ $match: { status: 'canceled' } }, { $count: "count" }],
            recent: [{ $match: { createdAt: { $gte: sevenDaysAgo } } }, { $count: "count" }]
          }
        }
      ]),

      // Drivers - aggregate all counts in ONE query
      Driver.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            active: [{ $match: { isActive: true } }, { $count: "count" }]
          }
        }
      ]),

      // Reviews - aggregate all counts AND average in ONE query
      Review.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            approved: [{ $match: { isApproved: true } }, { $count: "count" }],
            pending: [{ $match: { isApproved: false } }, { $count: "count" }],
            recent: [{ $match: { createdAt: { $gte: sevenDaysAgo } } }, { $count: "count" }],
            avgRating: [
              { $match: { isApproved: true } },
              { $group: { _id: null, avg: { $avg: "$rating" } } }
            ]
          }
        }
      ])
    ]);

    // Extract results with safe defaults
    const bookings = {
      totalBookings: bookingStats[0]?.total[0]?.count || 0,
      confirmedBookings: bookingStats[0]?.confirmed[0]?.count || 0,
      pendingBookings: bookingStats[0]?.pending[0]?.count || 0,
      canceledBookings: bookingStats[0]?.canceled[0]?.count || 0,
      recentBookings: bookingStats[0]?.recent[0]?.count || 0
    };

    const messages = {
      totalMessages: messageStats[0]?.total[0]?.count || 0,
      pendingMessages: messageStats[0]?.pending[0]?.count || 0,
      confirmedMessages: messageStats[0]?.confirmed[0]?.count || 0,
      canceledMessages: messageStats[0]?.canceled[0]?.count || 0,
      recentMessages: messageStats[0]?.recent[0]?.count || 0
    };

    const drivers = {
      totalDrivers: driverStats[0]?.total[0]?.count || 0,
      activeDrivers: driverStats[0]?.active[0]?.count || 0,
      inactiveDrivers: (driverStats[0]?.total[0]?.count || 0) - (driverStats[0]?.active[0]?.count || 0)
    };

    const reviews = {
      totalReviews: reviewStats[0]?.total[0]?.count || 0,
      approvedReviews: reviewStats[0]?.approved[0]?.count || 0,
      pendingReviews: reviewStats[0]?.pending[0]?.count || 0,
      recentReviews: reviewStats[0]?.recent[0]?.count || 0,
      averageRating: reviewStats[0]?.avgRating[0]?.avg 
        ? parseFloat(reviewStats[0].avgRating[0].avg.toFixed(1)) 
        : 0
    };

    console.timeEnd("⏱️ Stats API");

    return NextResponse.json({
      bookings,
      messages,
      drivers,
      reviews
    }, { status: 200 });

  } catch (error) {
    console.error("❌ GET stats error:", error);
    return NextResponse.json(
      { message: "Error fetching statistics" },
      { status: 500 }
    );
  }
}