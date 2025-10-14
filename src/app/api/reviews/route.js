// app/api/reviews/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Review from "@/models/Review";

// GET: Fetch reviews
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const driverId = searchParams.get('driverId');
    const includeUnapproved = searchParams.get('includeUnapproved') === 'true';

    let query = {};
    
    if (driverId) {
      query.driverId = driverId;
    }

    // Public: only approved reviews, Admin: all reviews
    if (!includeUnapproved) {
      query.isApproved = true;
    }

    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
      .limit(200);

    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("❌ GET reviews error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching reviews" },
      { status: 500 }
    );
  }
}

// POST: Create new review (Public - from visitors)
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Validation
    if (!body.driverId) {
      return NextResponse.json(
        { success: false, message: "Driver ID is required" },
        { status: 400 }
      );
    }

    if (!body.patientName || body.patientName.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Your name is required" },
        { status: 400 }
      );
    }

    if (!body.rating || body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { success: false, message: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (!body.comment || body.comment.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Comment is required" },
        { status: 400 }
      );
    }

    // Get IP for spam protection
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : request.ip || "unknown";

    // Check if same IP reviewed same driver in last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingReview = await Review.findOne({
      driverId: body.driverId,
      ipAddress: ip,
      createdAt: { $gte: oneDayAgo }
    }).select('+ipAddress');

    if (existingReview) {
      return NextResponse.json(
        { success: false, message: "You already reviewed this driver recently. Please wait 24 hours." },
        { status: 429 }
      );
    }

    // Create review
    const review = await Review.create({
      driverId: body.driverId,
      patientName: body.patientName.trim(),
      rating: parseInt(body.rating),
      comment: body.comment.trim(),
      ipAddress: ip,
      isApproved: false, // Needs admin approval
    });

    return NextResponse.json({ 
      success: true, 
      review: {
        _id: review._id,
        patientName: review.patientName,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        isApproved: review.isApproved
      },
      message: "Thank you! Your review is pending approval."
    }, { status: 201 });
  } catch (error) {
    console.error("❌ POST review error:", error);
    return NextResponse.json(
      { success: false, message: "Error submitting review", error: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update review (Admin only - for approval/rejection)
export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body._id && !body.id) {
      return NextResponse.json(
        { success: false, message: "Review ID is required" },
        { status: 400 }
      );
    }

    const reviewId = body._id || body.id;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      {
        isApproved: body.isApproved,
      },
      { new: true }
    );

    if (!review) {
      return NextResponse.json(
        { success: false, message: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error("❌ PUT review error:", error);
    return NextResponse.json(
      { success: false, message: "Error updating review", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete review (Admin only)
export async function DELETE(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body._id && !body.id) {
      return NextResponse.json(
        { success: false, message: "Review ID is required" },
        { status: 400 }
      );
    }

    const reviewId = body._id || body.id;
    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      return NextResponse.json(
        { success: false, message: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Review deleted successfully" 
    });
  } catch (error) {
    console.error("❌ DELETE review error:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting review", error: error.message },
      { status: 500 }
    );
  }
}