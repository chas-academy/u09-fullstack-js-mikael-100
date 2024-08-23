// Import "dotenv" laddar in variablerna innan app laddas in detta gör dem tillgägliga för hela appen.
import "dotenv/config";
import app from "./app";
import connectDB from "./config/db";

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
