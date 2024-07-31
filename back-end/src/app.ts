import express, { Express, Request, Response } from "express";
import cuisineRouter from "./routes/cuisineRoutes";
import cors from "cors";

const app: Express = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/cuisines", cuisineRouter);

export default app;
