// Import necessary modules
import { auth } from "@clerk/nextjs";
import { connectToDatabase } from "../../../../lib/database"; // Import MongoDB connection function

export async function POST(request) {
  const { userId } = auth();

  console.log(userId);

  const db = connectToDatabase();
}
