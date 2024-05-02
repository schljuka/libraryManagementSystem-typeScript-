import { useNavigate } from "react-router-dom";

import './BookCard.css';
import { mapAuthorsToString } from "../../utils/BookUtils";
import { Book } from "../../../../models/Book";

interface BookCardProps {
    book: Book
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
    const navigate = useNavigate();

    const displayBook = () => {
        navigate(`/resource/${book.barcode}`);
    }

    return (
        <div id="book-card" className="book-card" onClick={displayBook}>
            <img className="book-card-cover" src={book.cover} alt={book.title} />
            <div className="book-card-info" >
                <h1 className="book-card-title">{book.title}</h1>
                <h3 className="book-card-author">{mapAuthorsToString(book)}</h3>
                <p className="book-card-description">{book.description}</p>
            </div>
        </div>
    )

}