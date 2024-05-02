import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, UseSelector } from "react-redux";

import './CatalogOverviewSection.css';
import { Book } from "../../../../models/Book";
import { RootState } from "../../../../redux/ReduxStore";
import { BookCarousel } from "../../../book";

interface CatalogOverviewSectionProps {
    books: Book[];
    label: string;
}

export const CatalogOverviewSection: React.FC<CatalogOverviewSectionProps> = ({ books, label }) => {

    const bookState = useSelector((state: RootState) => state.book);

    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate(`catalog?genre=${label}&subject=${label}`);
    }

    return (
        <div className="catalog-overview-section">
            <div className="caralog-overview-section-top">
                <h4>{label}</h4>
                <p className="catalog-overview-section-more" onClick={handleViewMore}>View more...</p>
            </div>
            {books.length > 0 && !bookState.loading && <BookCarousel books={books} />}
        </div>
    )

}