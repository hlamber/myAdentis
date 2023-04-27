import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import checkSoumissions from '../../../utilities/checkSoumissions';
import DataUpdate from "./DataUpdate";

export default function EditDocument() {

    var { id } = useParams()
    const cachedSoumissions = useSelector(state => state.doc.soumissions);
    const [mySoumission, setMySoumission] = useState(cachedSoumissions.find(s => s.id === +id))
    const [find, setFind] = useState(false)

    useEffect(() => {

        checkSoumissions()

    }, [])

    if (find === false){
        if (cachedSoumissions !== undefined && JSON.stringify(cachedSoumissions) !== "[]" && id !== undefined){
            var search = cachedSoumissions.find(s => s.id === +id)
            setMySoumission(search)
            setFind(true)
        }
    }   

    return (
        <>
            <DataUpdate data={mySoumission}></DataUpdate>
        </>
    )

}