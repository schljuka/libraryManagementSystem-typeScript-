import { Express, Request, Response } from "express";
import authRoutes from './AuthRoutes';
import userRoutes from './UserRoutes';

export function registerRoutes(app: Express) {

    app.get("/health", (req: Request, resp: Response) => {
        resp.status(200).json({ message: "Server is running properly" });
    })

    app.use("/auth", authRoutes);
    app.use("/users", userRoutes);

}