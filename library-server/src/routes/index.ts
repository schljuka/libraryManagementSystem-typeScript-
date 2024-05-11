import { Express, Request, Response } from "express";
import authRoutes from './AuthRoutes';
import userRoutes from './UserRoutes';
import bookRoutes from './BookRoutes';
import cardRoutes from './LibraryCardRoutes';
import loanRoutes from './LoanRecordRoutes';

export function registerRoutes(app: Express) {

    app.get("/health", (req: Request, resp: Response) => {
        resp.status(200).json({ message: "Server is running properly" });
    })

    app.use("/auth", authRoutes);
    app.use("/users", userRoutes);
    app.use("/book", bookRoutes);
    app.use("/card", cardRoutes);
    app.use("/loan", loanRoutes);
}