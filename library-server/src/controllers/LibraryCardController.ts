import { Request, Response } from "express";
import { registerLibraryCard, findLibraryCard } from "../services/LibraryCardService";

import { ILibraryCard } from './../models/LibraryCard';
import { LibraryCardDoesNotExistError } from "../utils/LibraryErrors";


async function getLibraryCard(req: Request, res: Response) {
    const { cardId } = req.params;

    try {
        let libraryCard = await findLibraryCard(cardId);
        res.status(200).json({ message: "retrived the users card", libraryCard });
    } catch (error: any) {
        if (error instanceof LibraryCardDoesNotExistError) {
            res.status(400).json({ message: "The specified library card does not exist" });
        } else {
            res.status(500).json({ message: "Unable to retrive the library card", error });
        }
    }
}

async function createLibraryCard(req: Request, res: Response) {
    const card: ILibraryCard = req.body;

    try {
        let libraryCard = await registerLibraryCard(card);
        res.status(201).json({ message: "Generated library card for user", libraryCard });
    } catch (error) {
        res.status(500).json({ message: "Unable to create library card at this time", error });
    }
}

export default { getLibraryCard, createLibraryCard };
