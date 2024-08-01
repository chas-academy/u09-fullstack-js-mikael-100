import express, { Express, NextFunction, Request, Response } from "express";
import cuisineRouter from "./routes/cuisineRoutes";
import cors from "cors";

const app: Express = express();

// Middleware för att kunna läsa JSON-kroppar. Denna kod gör om JSON-Data till javascript-Object
// Detta måste göras för att datan skall kunna skickas runt genom den expressapp.
app.use(express.json());

// Middleware för att logga inkommande förfrågningar
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Middleware för att logga svarstider
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${res.statusCode} ${duration}ms`);
  });
  next();
});

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/cuisines", cuisineRouter);

export default app;
