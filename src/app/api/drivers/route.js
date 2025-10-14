// app/api/drivers/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Driver from "@/models/Driver";
import Review from "@/models/Review";

// GET: Fetch all drivers with stats
export async function GET() {
  try {
    await connectDB();
    const drivers = await Driver.find({}).sort({ createdAt: -1 });
    
    // Calculate stats for each driver
    const driversWithStats = await Promise.all(
      drivers.map(async (driver) => {
        const reviews = await Review.find({ 
          driverId: driver._id, 
          isApproved: true 
        });

        const totalReviews = reviews.length;
        const averageRating = totalReviews > 0
          ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
          : 0;

        return {
          ...driver.toObject(),
          totalReviews,
          averageRating: parseFloat(averageRating),
        };
      })
    );
    
    return NextResponse.json({ success: true, drivers: driversWithStats });
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

    // Validation
    if (!body.name || body.name.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Name is required" },
        { status: 400 }
      );
    }

    if (!body.age || body.age < 18 || body.age > 70) {
      return NextResponse.json(
        { success: false, message: "Age must be between 18 and 70" },
        { status: 400 }
      );
    }

    const driver = await Driver.create({
      name: body.name.trim(),
      age: parseInt(body.age),
      image: body.image || null,
      isActive: body.isActive !== undefined ? body.isActive : true,
    });

    return NextResponse.json({ 
      success: true, 
      driver: {
        ...driver.toObject(),
        totalReviews: 0,
        averageRating: 0
      }
    }, { status: 201 });
  } catch (error) {
    console.error("❌ POST driver error:", error);
    return NextResponse.json(
      { success: false, message: "Error creating driver", error: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update driver
export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body._id && !body.id) {
      return NextResponse.json(
        { success: false, message: "Driver ID is required" },
        { status: 400 }
      );
    }

    const driverId = body._id || body.id;

    // Validation
    if (body.age && (body.age < 18 || body.age > 70)) {
      return NextResponse.json(
        { success: false, message: "Age must be between 18 and 70" },
        { status: 400 }
      );
    }

    const driver = await Driver.findByIdAndUpdate(
      driverId,
      {
        name: body.name,
        age: parseInt(body.age),
        image: body.image,
        isActive: body.isActive,
      },
      { new: true, runValidators: true }
    );

    if (!driver) {
      return NextResponse.json(
        { success: false, message: "Driver not found" },
        { status: 404 }
      );
    }

    // Calculate stats
    const reviews = await Review.find({ 
      driverId: driver._id, 
      isApproved: true 
    });
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
      ? parseFloat((reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1))
      : 0;

    return NextResponse.json({ 
      success: true, 
      driver: {
        ...driver.toObject(),
        totalReviews,
        averageRating
      }
    });
  } catch (error) {
    console.error("❌ PUT driver error:", error);
    return NextResponse.json(
      { success: false, message: "Error updating driver", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete driver
export async function DELETE(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body._id && !body.id) {
      return NextResponse.json(
        { success: false, message: "Driver ID is required" },
        { status: 400 }
      );
    }

    const driverId = body._id || body.id;
    
    const driver = await Driver.findByIdAndDelete(driverId);

    if (!driver) {
      return NextResponse.json(
        { success: false, message: "Driver not found" },
        { status: 404 }
      );
    }

    // Delete all reviews for this driver
    await Review.deleteMany({ driverId });

    return NextResponse.json({ 
      success: true, 
      message: "Driver and all reviews deleted successfully" 
    });
  } catch (error) {
    console.error("❌ DELETE driver error:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting driver", error: error.message },
      { status: 500 }
    );
  }
}