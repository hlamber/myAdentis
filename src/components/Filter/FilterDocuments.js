import React from "react";
import DocumentCard from "../documentcard/DocumentCard";
import "./Filter.css";

// React Component to display individual item
const FilterDocuments = ({ id, intitule, type }) => (
    <div className="swiper-slide">
        <DocumentCard
            id={id}
            title={intitule}
            type={type}
        ></DocumentCard>
    </div>
);

export default FilterDocuments;