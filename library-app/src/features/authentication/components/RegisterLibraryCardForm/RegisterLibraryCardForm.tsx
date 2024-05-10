import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { setDisplayLibraryCard, setDisplayLogin } from "../../../../redux/slices/ModalSlice";

import { getLibraryCard } from "../../../../redux/slices/AuthenticationSlice";
import './RegisterLibraryCardForm.css';

export const RegisterLibraryCardForm: React.FC = () => {

    const userState = useSelector((state: RootState) => state.authentication);

    const dispatch: AppDispatch = useDispatch();

    const handleCreateLibraryCard = () => {
        if (userState.loggedInUser) {
            dispatch(
                getLibraryCard(userState.loggedInUser?._id)
            )
        }
    }

    const handleLoginClick = () => {
        dispatch(setDisplayLibraryCard(false));
        dispatch(setDisplayLogin(true));

    }

    return (
        <>
            {
                userState.loggedInUser ?
                    <div className="register-library-card-container">
                        <h3 className="register-library-card-text">Welcome {userState.loggedInUser.firstName} {userState.loggedInUser.lastName}</h3>
                        <h5 className="register-library-card-text">To signup for a new library card, or your forgot the ID number on your card, use the button below.</h5>
                        {userState.libraryCard ? <p className="register-library-card-text">Your library card number: {userState.libraryCard}</p>
                            : <button className="register-library-modal-button" onClick={handleCreateLibraryCard}>Get Library Card</button>
                        }
                    </div>
                    :
                    <div className="register-library-card-container">
                        <h3 className="register-library-card-text">You must be a member of the library to obtain a library card</h3>
                        <h4 className="register-library-card-text">Use the button below to login to your account or register for free.</h4>
                        <button className="register-library-modal-button" onClick={handleLoginClick}>Login Here</button>
                    </div>
            }
        </>
    )


}