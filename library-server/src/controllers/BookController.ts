import { Request, Response } from 'express';
import { findAllBooks, registerBook, modifyBook, removeBook } from '../services/BookService';

import { IBook } from '../models/Book';
import { IBookModel } from '../daos/BookDao';
import { BookDoesNotExistError } from '../utils/LibraryErrors';

async function getAllBooks(req: Request, res: Response) {
    try {
        let books = await findAllBooks();
        res.status(200).json({ message: "Retrived all books", count: books.length, books })
    } catch (error: any) {
        res.status(500).json({ message: "Unable to retrive books at this time", error });
    }
}

async function createBook(req: Request, res: Response) {
    let book = req.body;
    try {
        let savedBook = await registerBook(book);
        res.status(200).json({ message: "Book created successfully", savedBook })
    } catch (error: any) {
        res.status(500).json({ message: "Unable to save book at this time", error })
    }
}


async function updateBook(req: Request, res: Response) {
    let book = req.body;
    try {
        let updateBook = await modifyBook(book);
        res.status(200).json({ message: "Book update successfully", updateBook });
    } catch (error: any) {
        if (error instanceof BookDoesNotExistError) {
            res.status(404).json({ message: "Cannot update book that does not exist", error })
        } else {
            res.status(500).json({ message: "Unable to save book at this time", error })
        }
    }
}

async function deleteBook(req: Request, res: Response) {
    let { barcode } = req.params;
    try {
        let message = await removeBook(barcode);
        res.status(200).json({ message });
    } catch (error: any) {
        if (error instanceof BookDoesNotExistError) {
            res.status(404).json({ message: "Cannot delete a book that does not exist", error })
        } else {
            res.status(500).json({ message: "Unable to delete book at this time", error })
        }
    }
}

export default { getAllBooks, createBook, updateBook, deleteBook };