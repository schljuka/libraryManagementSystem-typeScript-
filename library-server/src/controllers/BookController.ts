import { Request, Response } from 'express';
import { findAllBooks, modifyBook, queryBooks, registerBook, removeBook } from '../services/BookService';

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


async function searchForBooksByQuery(req: Request, res: Response) {
    let { title, barcode, author, description, subject, genre, page = 1, limit = 25 } = req.query;

    let books = await queryBooks(
        Number(page),
        Number(limit),
        title as string,
        barcode as string,
        description as string,
        author as string,
        subject as string,
        genre as string
    )

    res.status(200).json({ message: "Retrived books from query", page: books });
}

export default { getAllBooks, createBook, updateBook, deleteBook, searchForBooksByQuery };