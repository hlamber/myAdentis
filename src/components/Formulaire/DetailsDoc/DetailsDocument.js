import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import checkChamps from "../../../utilities/checkChamps";

import Data from "../newDoc/Data";

export default function UpdateDocument() {
  let { id } = useParams();


    useEffect(() => {

        checkChamps(id)

    }, [])

    return (
        <>
            <Data></Data>
        </>
    )
}
