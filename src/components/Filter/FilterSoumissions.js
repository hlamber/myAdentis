import { render } from "@testing-library/react";
import React from "react";
import SoumettreCard from "../documentcard/SoumettreCard";
import SoumisCard from "../documentcard/SoumisCard";

import "./Filter.css";

// React Component to display individual item
const FilterDocuments = ({ id, title, type, prenom, date, dateDeSoumission, toUser }) => (
    <div className="swiper-slide">
        {dateDeSoumission === null
            ? 
                <SoumettreCard
                    id={id}
                    title={title}
                    type={type}
                    prenom={prenom}
                    date={date}
                    toUser={toUser}
                ></SoumettreCard>
            : 
                <SoumisCard
                    id={id}
                    title={title}
                    type={type}
                    prenom={prenom}
                    date={date}
                ></SoumisCard>
        }
        
    </div>
);

export default FilterDocuments;