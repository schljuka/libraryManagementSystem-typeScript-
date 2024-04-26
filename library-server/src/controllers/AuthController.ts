import { Request, Response } from "express";
import { register } from "../services/UserServices";
import { IUser } from "../models/IUser";

async function handleRegister(req: Request, res: Response) {
    const user: IUser = req.body;

    try {
        const registeredUser = await register(user);
        res.status(200).json({
            message: "User successfully created",
            user: {
                _id: registeredUser._id,
                type: registeredUser.type,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                email: registeredUser.email
            }
        });
    } catch (error: any) {
        if (error.message.includes("E11000 duplicate key error collection:")) {
            res.status(409).json({ message: "User with this email already exist", error: error.message });
        } else {
            res.status(500).json({ message: "Unable to register user at this time", error: error.message });
        }
    }
}

export default { handleRegister };