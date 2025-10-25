import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Driver from "@/models/Driver";
import Review from "@/models/Review";

// GET single driver WITH image
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    
    const driver = await Driver.findById(id).lean();
    
    if (!driver) {
      return NextResponse.json(
        { success: false, message: "Driver not found" },
        { status: 404 }
      );
    }
    
    // Get stats
    const reviewStats = await Review.aggregate([
      {
        $match: { 
          driverId: driver._id,
          isApproved: true 
        }
      },
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          averageRating: { $avg: "$rating" }
        }
      }
    ]);
    
    const stats = reviewStats[0] || { totalReviews: 0, averageRating: 0 };
    
    return NextResponse.json({ 
      success: true, 
      driver: {
        ...driver,
        totalReviews: stats.totalReviews,
        averageRating: stats.averageRating ? parseFloat(stats.averageRating.toFixed(1)) : 0
      }
    });
  } catch (error) {
    console.error("❌ GET single driver error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching driver" },
      { status: 500 }
    );
  }
}
