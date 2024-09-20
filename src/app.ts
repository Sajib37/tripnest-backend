import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFoundRoutes";
const app: Application = express();

// parser
app.use(express.json());
// when deploy then set the client side origin and set the credentials: true.
app.use(cors({origin: ['http://localhost:5173/']}));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
