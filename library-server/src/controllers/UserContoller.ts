import { Request, Response } from "express";
import { findAllUsers, findUsersById, removeUser, modifyUser } from "../services/UserServices";
import { UserDoesNotExistError } from "../utils/LibraryErrors";

async function getAllUsers(req: Request, res: Response) {
    try {
        let users = await findAllUsers();
        res.status(200).json({ message: "Users retrived successfully", users })
    } catch (error: any) {
        res.status(500).json({ message: "Unable to retrive users at this time", error: error.message });
    }
}

async function getUserById(req: Request, res: Response) {
    const userId = req.params.userId;
    try {
        let user = await findUsersById(userId);
        res.status(200).json({ message: "Users find successfully", user })
    } catch (error: any) {
        if (error instanceof UserDoesNotExistError) {
            res.status(404).json({ message: "User requested does not exist" });
        } else {
            res.status(500).json({ message: "Could not find user", error: error.message });
        }
    }
}


async function updateUser(req: Request, res: Response) {
    const user = req.body;
    try {
        let updateUser = await modifyUser(user);
        res.status(200).json({ message: "User update successfully", user: updateUser })
    } catch (error: any) {
        if (error instanceof UserDoesNotExistError) {
            res.status(404).json({ message: "User requested does not exist" });
        } else {
            res.status(500).json({ message: "Unable to update user currently", error: error.message });
        }
    }
}

async function deleteUser(req: Request, res: Response) {
    let userId: string = req.params.userId;
    try {
        await removeUser(userId);
        res.status(200).json({ message: "User delete successfully" })
    } catch (error: any) {
        if (error instanceof UserDoesNotExistError) {
            res.status(404).json({ message: "User requested does not exist" });
        } else {
            res.status(500).json({ message: "Unable to delete user at this time", error: error.message });
        }
    }
}

export default { getAllUsers, getUserById, updateUser, deleteUser };