import express, { Express, NextFunction, Request, Response } from "express";
import cuisineRouter from "./routes/cuisineRoutes";
import cors from "cors";
import orderRouter from "./routes/orderRoutes";
import adminRouter from "./routes/adminRoutes";
import authRouter from "./routes/authRoutes";

const app: Express = express();

// Middleware för att kunna läsa JSON-kroppar. Denna kod gör om JSON-Data till javascript-Object
// Detta måste göras för att datan skall kunna skickas runt genom den expressapp.
app.use(express.json());

// Konfigurera CORS
// Denna kod kommer att ställa in cors till att ta emot endast CRUD begäran. Samt låta data som är json komma igenom samt token.
const corsOptions = {
  // Lista över godkända portar eller domäner
  origin: ["http://localhost:3000", "SKRIV IN DIN NETLYFY ADRESS HÄR SEN"],
  // Står för metoderna som får skickas
  methods: "GET,POST,PUT,DELETE",
  // Står för att json format och token får skickas. Om authorization inte hade stått med hade
  // man inte fått skicka med token i headers. Där emot är det inte ett måste i begäran.
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Här nedan länkas de olika Routers endpoints som kan användas för get och post.
app.use("/api/cuisines", cuisineRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admins", adminRouter);
app.use("/api/auth", authRouter);

export default app;
