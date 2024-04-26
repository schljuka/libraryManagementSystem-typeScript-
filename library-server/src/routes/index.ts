import { Express, Request, Response } from "express";
import authRoutes from './AuthRoutes';

export function registerRoutes(app: Express) {

    app.get("/health", (req: Request, resp: Response) => {
        resp.status(200).json({ message: "Server is running properly" });
    })
    
    app.use("/auth", authRoutes)
}