"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cuisineRoutes_1 = __importDefault(require("./routes/cuisineRoutes"));
const cors_1 = __importDefault(require("cors"));
// import multer from "multer";
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const uploadConfigRoutes_1 = __importDefault(require("./routes/uploadConfigRoutes"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authMiddleware_1 = require("./middleweare/authMiddleware");
const app = (0, express_1.default)();
// Middleware för att kunna läsa JSON-kroppar. Denna kod gör om JSON-Data till javascript-Object
// Detta måste göras för att datan skall kunna skickas runt genom den expressapp.
app.use(express_1.default.json());
// Detta middleware används för att tolka inkommande application/x-www-form-urlencoded data, vanligtvis skickad från HTML-formulär, och omvandla det till ett JavaScript-objekt som kan användas i min Express-applikation.
app.use(express_1.default.urlencoded({ extended: true }));
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
app.use((0, cors_1.default)(corsOptions));
// Middleware för att hantera cookies
app.use((0, cookie_parser_1.default)());
// Vägen till uploads-mappen utanför src
const uploadsPath = path_1.default.join(__dirname, "..", "uploads");
// Middleware för att servera statiska filer
app.use("/uploads", express_1.default.static(uploadsPath));
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
// Här nedan länkas de olika Routers endpoints som kan användas för get och post.
app.use("/api/cuisines", cuisineRoutes_1.default);
app.use("/api/orders", orderRoutes_1.default);
app.use("/api/admins", authMiddleware_1.authenticateSuperAdmin, adminRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
app.use("/api/uploads", authMiddleware_1.authenticateAdminSuperAdmin, uploadConfigRoutes_1.default);
exports.default = app;
