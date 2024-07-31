import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";

// Ladda miljövariabler från .env-fil
dotenv.config();

const port = process.env.PORT || 3000;

// Anslut till MongoDB och starta servern endast om anslutningen lyckas
const startServer = async () => {
  try {
    // Anslut till MongoDB
    await connectDB();

    // Starta servern om anslutningen till databasen lyckas
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1);
  }
};

startServer();
