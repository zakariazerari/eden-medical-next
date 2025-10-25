// app/api/drivers/route.js - OPTIMIZED VERSION
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Driver from "@/models/Driver";
import Review from "@/models/Review";

// ✅ OPTIMIZED: Batch load reviews with drivers
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const includeImages = searchParams.get('includeImages') === 'true';
    const includeReviews = searchParams.get('includeReviews') === 'true';
    
    // Fetch all drivers
    const drivers = await Driver.find().sort({ createdAt: -1 }).lean();
    
    if (includeReviews && drivers.length > 0) {
      // ✅ OPTIMIZATION: Get ALL reviews in ONE query instead of N queries
      const driverIds = drivers.map(d => d._id);
      
      const [reviews, stats] = await Promise.all([
        // Get all approved reviews
        Review.find({
          driverId: { $in: driverIds },
          isApproved: true
        })
        .select('driverId rating')
        .lean(),
        
        // Get stats (count + average) in one aggregation
        Review.aggregate([
          {
            $match: {
              driverId: { $in: driverIds },
              isApproved: true
            }
          },
          {
            $group: {
              _id: '$driverId',
              totalReviews: { $sum: 1 },
              averageRating: { $avg: '$rating' }
            }
          }
        ])
      ]);
      
      // Create stats map for fast lookup
      const statsMap = {};
      stats.forEach(stat => {
        statsMap[stat._id.toString()] = {
          totalReviews: stat.totalReviews,
          averageRating: parseFloat(stat.averageRating.toFixed(1))
        };
      });
      
      // Attach stats to drivers
      drivers.forEach(driver => {
        const driverId = driver._id.toString();
        const driverStats = statsMap[driverId] || { totalReviews: 0, averageRating: 0 };
        driver.totalReviews = driverStats.totalReviews;
        driver.averageRating = driverStats.averageRating;
      });
    }
    
    // Remove images if not requested (for public API)
    if (!includeImages) {
      drivers.forEach(driver => {
        delete driver.image;
      });
    }
    
    return NextResponse.json(
      { success: true, drivers },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
        }
      }
    );
  } catch (error) {
    console.error("❌ GET drivers error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching drivers" },
      { status: 500 }
    );
  }
}

// POST: Create new driver
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.name || !body.age) {
      return NextResponse.json(
        { success: false, message: "Name and age are required" },
        { status: 400 }
      );
    }

    const driver = await Driver.create({
      name: body.name.trim(),
      age: parseInt(body.age),
      image: body.image || null,
      isActive: body.isActive !== undefined ? body.isActive : true
    });

    return NextResponse.json(
      { success: true, driver },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ POST driver error:", error);
    return NextResponse.json(
      { success: false, message: "Error creating driver" },
      { status: 500 }
    );
  }
}

// PUT: Update driver
export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body._id) {
      return NextResponse.json(
        { success: false, message: "Driver ID is required" },
        { status: 400 }
      );
    }

    const updateData = {};
    if (body.name) updateData.name = body.name.trim();
    if (body.age) updateData.age = parseInt(body.age);
    if (body.image !== undefined) updateData.image = body.image;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;

    const driver = await Driver.findByIdAndUpdate(
      body._id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!driver) {
      return NextResponse.json(
        { success: false, message: "Driver not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, driver });
  } catch (error) {
    console.error("❌ PUT driver error:", error);
    return NextResponse.json(
      { success: false, message: "Error updating driver" },
      { status: 500 }
    );
  }
}

// DELETE: Delete driver
export async function DELETE(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body._id) {
      return NextResponse.json(
        { success: false, message: "Driver ID is required" },
        { status: 400 }
      );
    }

    // Delete driver and all their reviews
    await Promise.all([
      Driver.findByIdAndDelete(body._id),
      Review.deleteMany({ driverId: body._id })
    ]);

    return NextResponse.json({
      success: true,
      message: "Driver and reviews deleted successfully"
    });
  } catch (error) {
    console.error("❌ DELETE driver error:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting driver" },
      { status: 500 }
    );
  }
}