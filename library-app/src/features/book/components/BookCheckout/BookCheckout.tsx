import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { checkoutBook, setCurrentBook } from "../../../../redux/slices/BookSlice";
import { setDisplayLoan } from "../../../../redux/slices/ModalSlice";
import './BookCheckout.css';

export const BookCheckout: React.FC = () => {
    const user = useSelector((state: RootState) => state.authentication.loggedInUser);
    const book = useSelector((state: RootState) => state.book.currentBook);

    const dispatch: AppDispatch = useDispatch();

    const libraryCardRef = useRef<HTMLInputElement>(null);

    const checkout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (book && user && libraryCardRef.current) {
            dispatch(checkoutBook({
                book,
                employee: user,
                libraryCard: libraryCardRef.current.value
            }))
        }

        dispatch(setCurrentBook(undefined));
        dispatch(setDisplayLoan(false));
    }



    return (
        <div className="book-checkout">
            {
                book && user &&
                <form className="book-checkout-form">
                    <h3>Loan Book Titled: {book.title}</h3>
                    <h4>Enter patrons Library Card: </h4>
                    <input className="book-checkout-input" placeholder="Library Card ID" ref={libraryCardRef} />
                    <h4>Checkout Employee ID: </h4>
                    <input className="book-checkout-input" value={user._id} disabled />
                    <button className="book-checkout-button" onClick={checkout}>Loan Book</button>
                </form>
            }
        </div>
    )
}