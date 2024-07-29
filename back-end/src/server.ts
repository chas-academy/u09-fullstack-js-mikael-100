import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";

// Denna ger möjlighet att hämta miljövariabler från .en
dotenv.config();

const port = process.env.PORT || 3000;

// Anslutningen till MongoDB
connectDB();

// Denna kod startar servern och lyssnar på alla aktivitet vid porten
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
