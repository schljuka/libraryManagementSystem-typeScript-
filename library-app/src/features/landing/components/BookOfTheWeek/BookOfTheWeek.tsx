import React from 'react';

import './BookOfTheWeek.css';
import { BookInformation } from '../../../book';

export const BookOfTheWeek: React.FC = () => {

    return (
        <div className="book-of-the-week">
            <h1>Book of the week: </h1>
            <BookInformation
                book={
                    {
                        _id: "1234",
                        barcoode: "1234",
                        cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg",
                        title: "Java : test test",
                        authors: ["Mark Reed"],
                        description: "test test test",
                        subjects: ["java", "learning"],
                        publicationDate: new Date("2020-01-01"),
                        publisher: "some publ",
                        pages: 222,
                        genre: "non genre",
                        records: []
                    }
                }
            />
        </div>
    )
}