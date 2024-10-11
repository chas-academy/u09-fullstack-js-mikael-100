import express, { Express, Request, Response } from "express";
import cuisineRouter from "./routes/cuisineRoutes";
import cors from "cors";
// import multer from "multer";
import orderRouter from "./routes/orderRoutes";
import adminRouter from "./routes/adminRoutes";
import authRouter from "./routes/authRoutes";
import uploadConfigRoutes from "./routes/uploadConfigRoutes";
import path from "path";
import cookieParser from "cookie-parser";
import {
  authenticateAdminSuperAdmin,
  authenticateSuperAdmin,
} from "./middleweare/authMiddleware";

const app: Express = express();

// Middleware för att kunna läsa JSON-kroppar. Denna kod gör om JSON-Data till javascript-Object
// Detta måste göras för att datan skall kunna skickas runt genom den expressapp.
app.use(express.json());

// Detta middleware används för att tolka inkommande application/x-www-form-urlencoded data, vanligtvis skickad från HTML-formulär, och omvandla det till ett JavaScript-objekt som kan användas i min Express-applikation.
app.use(express.urlencoded({ extended: true }));
// Middleware för att hantera multipart/form-data
// const upload = multer(); // Här kan du konfigurera multer för att hantera filer om du behöver
// app.use(upload.none()); // Detta kommer att hantera alla multipart/form-data-begäran med en tom fältkonfiguration

// Konfigurera CORS
// Denna kod kommer att ställa in cors till att ta emot endast CRUD begäran. Samt låta data som är json komma igenom samt token.
const corsOptions = {
  origin: [
    "http://localhost:5173", // För Vite eller React dev server
    "http://localhost:3000", // port för frontend
    "https://u09mikael.netlify.app", // Din Netlify-adress när du deployar
    "http://localhost:4173", // För npm run preview
  ],
  methods: ["GET", "POST", "PUT", "DELETE"], // Använd array för metoder
  allowedHeaders: ["Content-Type", "Authorization"], // Använd array för headers
  credentials: true, // Tillåt cookies och autentisering
  optionsSuccessStatus: 200, // För att hantera äldre webbläsare
};

app.use(cors(corsOptions));

// Middleware för att hantera cookies
app.use(cookieParser());

// Vägen till uploads-mappen utanför src
const uploadsPath = path.join(__dirname, "..", "uploads");

// Middleware för att servera statiska filer
app.use("/uploads", express.static(uploadsPath));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Här nedan länkas de olika Routers endpoints som kan användas för get och post.
app.use("/api/cuisines", cuisineRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admins", authenticateSuperAdmin, adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/uploads", authenticateAdminSuperAdmin, uploadConfigRoutes);

export default app;
