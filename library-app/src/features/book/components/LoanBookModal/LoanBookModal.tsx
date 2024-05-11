import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../../components";
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { setDisplayLoan } from "../../../../redux/slices/ModalSlice";
import { determineLoanModalContent } from "../../utils/BookUtils";

export const LoanBookModal: React.FC = () => {
    const currentBook = useSelector((state: RootState) => state.book.currentBook);

    const dispatch: AppDispatch = useDispatch();

    const closeModal = () => {
        dispatch(setDisplayLoan(false));
    }

    return (
        <Modal content={currentBook? determineLoanModalContent(currentBook): <></>} toggleModal={closeModal} />
    )
}