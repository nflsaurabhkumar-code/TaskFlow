import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";

async function startServer() {
  try {
    if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
      throw new Error("MONGODB_URI and JWT_SECRET must be configured in .env");
    }
    await connectDB();
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`TaskFlow API listening on port ${port}`));
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
