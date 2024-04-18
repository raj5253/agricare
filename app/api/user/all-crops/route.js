// Import necessary modules
import { connectToDatabase } from "./db"; // Import MongoDB connection function

export async function GET(request) {
  try {
    await connectToDatabase();

    const data = await YourMongoDBModel.find(); // Replace YourMongoDBModel with your actual Mongoose model

    // Return data as JSON response
    return {
      status: 200,
      body: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      status: 500,
      body: {
        error: "Internal server error",
      },
    };
  }
}

export async function HEAD(request) {}

export async function POST(request) {}

export async function PUT(request) {}

export async function DELETE(request) {}

export async function PATCH(request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request) {}
