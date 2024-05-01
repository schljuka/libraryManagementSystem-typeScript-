import React from "react";

import './BookInformation.css';
import { Book } from "../../../../models/Book";
import { mapAuthorsToString } from "../../utils/BookUtils";

interface BookInfoProps {
    book: Book;
}



export const BookInformation: React.FC<BookInfoProps> = ({ book }) => {



    return (
        <div className="book-info">
            <div className="book-info-container">
                <img className="book-info-cover" src={book.cover} />
                <div>
                    <h2>{book.title}</h2>
                    <h3>{mapAuthorsToString(book)}</h3>
                    <p>{book.description}</p>
                </div>
            </div>
        </div>
    )
}