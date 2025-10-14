// app/api/stats/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Booking from "@/models/Booking";
import ContactMessage from "@/models/ContactMessage";
import Driver from "@/models/Driver";
import Review from "@/models/Review";

// GET: Fetch all statistics
export async function GET() {
  try {
    await connectDB();

    // Bookings stats
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const canceledBookings = await Booking.countDocuments({ status: 'canceled' });

    // Messages stats
    const totalMessages = await ContactMessage.countDocuments();
    const pendingMessages = await ContactMessage.countDocuments({ status: 'pending' });
    const confirmedMessages = await ContactMessage.countDocuments({ status: 'confirmed' });
    const canceledMessages = await ContactMessage.countDocuments({ status: 'canceled' });

    // Drivers stats
    const totalDrivers = await Driver.countDocuments();
    const activeDrivers = await Driver.countDocuments({ isActive: true });

    // Reviews stats
    const totalReviews = await Review.countDocuments();
    const approvedReviews = await Review.countDocuments({ isApproved: true });
    const pendingReviews = await Review.countDocuments({ isApproved: false });

    // Calculate average rating
    const approvedReviewsList = await Review.find({ isApproved: true });
    const avgRating = approvedReviewsList.length > 0
      ? (approvedReviewsList.reduce((sum, r) => sum + r.rating, 0) / approvedReviewsList.length).toFixed(1)
      : 0;

    // Recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentBookings = await Booking.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    const recentMessages = await ContactMessage.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    const recentReviews = await Review.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    return NextResponse.json({
      bookings: {
        totalBookings,
        confirmedBookings,
        pendingBookings,
        canceledBookings,
        recentBookings,
      },
      messages: {
        totalMessages,
        pendingMessages,
        confirmedMessages,
        canceledMessages,
        recentMessages,
      },
      drivers: {
        totalDrivers,
        activeDrivers,
        inactiveDrivers: totalDrivers - activeDrivers,
      },
      reviews: {
        totalReviews,
        approvedReviews,
        pendingReviews,
        averageRating: parseFloat(avgRating),
        recentReviews,
      },
    }, { status: 200 });

  } catch (error) {
    console.error("❌ GET stats error:", error);
    return NextResponse.json(
      { message: "Error fetching statistics" },
      { status: 500 }
    );
  }
}