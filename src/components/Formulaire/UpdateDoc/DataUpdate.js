import React from "react";
import { useState, useEffect } from "react";
import "../Form.css";
import { Button } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons';
import { useSelector } from "react-redux";
import { json, useParams } from "react-router-dom";
import checkChamps from '../../../utilities/checkChamps';
import { createReponse, saveReponse } from "../../../services/Reponses";
import { updateSoumission } from "../../../services/Soumissions";
import checkResponses from '../../../utilities/checkResponses';
import PDFRender from "../../PDFRender/PDFRender";
import logo from "../../../images/logo-adentis.png";

export default function DataUpdateData({data}) {

    const cachedChamps = useSelector(state => state.doc.champsList);
    const cachedResponse = useSelector(state => state.doc.responsesList);
    const [defaultRes, setDefaultRes] = useState([])
    var [dataFeilds, setDataFeilds] = useState(cachedChamps);
    const [find, setFind] = useState(false)
    const [find2, setFind2] = useState(false)
    var { id } = useParams()
    var propAppreciation = ["Pas du tout satisfaisant", "Peu satisfaisant", "Moyennement satisfaisant", "Satisfaisant", "Très satisfaisant"]
    var tabHistorique = ["Client", "Poste", "Débuté il y a combien de mois (chiffre uniquement)", "Durée en mois (chiffre uniquement)"]
    var tabProjet = ["Client", "Durée", "Missions réalisées", "Comment as-tu perçu cette expérience ?"]
    var action = ""
    let MathScore = [];

    useEffect(() => {

    }, [])

    if(data !== undefined && JSON.stringify(data) !== "[]"){
        checkChamps(data.documentId)
        if (find === false){
            if (cachedChamps !== undefined && JSON.stringify(cachedChamps) !== "[]"){
                setDataFeilds(cachedChamps)
                checkResponses(id)
                setFind(true)
            }
        }
    }

    if (find2 === false){
        if(cachedResponse.length !== 0){
            for(var c in cachedResponse){
                var complete = cachedResponse[c].soumission.reponses
                for(var t in complete){
                    complete[t].soumission = {
                        document: {},
                        user: {}
                    }
                    cachedResponse[c].soumission.reponses = complete
                }
            }
            setDefaultRes(cachedResponse)
            setFind2(true)
        }
    }

    async function handleSubmit(action) {
        var d = new Date()
        var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+"T"+d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

        //TODO parcourir uniquement les champs créés ou modifiés temps de chargement trop long

        console.log(defaultRes)

        for(var r in defaultRes){

            var missingElement1 = defaultRes[r].soumission.document.champs
            var missingElement2 = defaultRes[r].champ.document.champs
            for(var m in missingElement1){
                missingElement1[m].document = {}
            }
            for(var m in missingElement2){
                missingElement2[m].document = {}
            }

            if(defaultRes[r].id === undefined){
                if(defaultRes[r].champ.type === "choix multiples" || defaultRes[r].champ.type === "choix simple"){
                    var convert = defaultRes[r].champ.propositionDeReponse
                    defaultRes[r].champ.propositionDeReponse = convert.join("-")
                }
                
                if(defaultRes[r].champ.type === "tableau d'appreciation"){
                    var convert = ""
                    for(var d in defaultRes[r].intitule){
                        convert = convert + d + ":" + defaultRes[r].intitule[d] + "-"
                    }
                    defaultRes[r].intitule = convert
                }
                if(defaultRes[r].champ.type === "tableau" || defaultRes[r].champ.type === "tableau historique" || defaultRes[r].champ.type === "tableau projet"){

                    if(typeof defaultRes[r].intitule === "object"){
                        var convert = ""
                        var convert2 = ""
                        for(var t in defaultRes[r].intitule){
                            convert = defaultRes[r].intitule[t].join('-')
                            defaultRes[r].intitule[t] = convert
                        }
                        convert2 = defaultRes[r].intitule.join(";")
                        defaultRes[r].intitule = convert2
                    }
                }
                await createReponse(defaultRes[r])
            }
            else {
                if(defaultRes[r].champ.type === "tableau" || defaultRes[r].champ.type === "tableau historique" || defaultRes[r].champ.type === "tableau projet"){
                    if(typeof defaultRes[r].intitule === "object"){
                        var convert = ""
                        var convert2 = ""
                        for(var t in defaultRes[r].intitule){
                            convert = defaultRes[r].intitule[t].join('-')
                            defaultRes[r].intitule[t] = convert
                        }
                        convert2 = defaultRes[r].intitule.join(";")
                        defaultRes[r].intitule = convert2
                    } 
                }
                await saveReponse(defaultRes[r], defaultRes[r].id)
            }
        }
        if(action === "soumettre"){
            // "2023-03-30T00:00:00.0000000"
            data.dateDeSoumission = date
            await updateSoumission(data, id)
        }
        window.location.href="/"
    }

    async function handleChange(index, value, isCheck, numRow, numCol, tabLength){

        const result = defaultRes
        var nbRow = 0
        
        for(var c in dataFeilds ){
            dataFeilds[c].document = {}   
            dataFeilds[c].criteresAppreciation = "" 
            dataFeilds[c].colonnesTableauInformations = "" 
        }

        if(dataFeilds[index].type === "notation"){
            value = Number(value) + 1
        }

        var newVal = {
            champId: dataFeilds[index].id,
            soumissionId : id,
            intitule : value,
            positionChamp: dataFeilds[index].position,
            champ: dataFeilds[index],
            soumission: data,
            reponse: data.reponses,
        }

        if ( result === undefined || result.length === 0){
            if(dataFeilds[index].type === "tableau d'appreciation"){
                newVal.intitule = []
                newVal.intitule[value.name] = value.value
            }
            if(dataFeilds[index].type === "tableau" || dataFeilds[index].type === "tableau historique" || dataFeilds[index].type === "tableau projet"){
                switch (dataFeilds[index].type) {
                    case "tableau":
                    case "tableau projet":
                        newVal.intitule = new Array(3)
                        nbRow = 3
                        break;
                    case "tableau historique":
                        newVal.intitule = new Array(4)
                        nbRow = 4
                        break;
                }
                for (i=0; i < nbRow; i++){
                    var myArray = new Array(tabLength)
                    for(t=0; t < tabLength; t++){
                        myArray[t] = ""
                    }
                    newVal.intitule[i] = myArray
                }
                newVal.intitule[numRow][numCol] = value
            }
            defaultRes.push(newVal)
        } 
        else {
            var objIndex = defaultRes.findIndex((obj => obj.positionChamp === dataFeilds[index].position));
            if(objIndex === -1){
                if(dataFeilds[index].type === "tableau d'appreciation"){
                    newVal.intitule = []
                    newVal.intitule[value.name] = value.value
                }
                if(dataFeilds[index].type === "tableau" || dataFeilds[index].type === "tableau historique" || dataFeilds[index].type === "tableau projet"){
                    switch (dataFeilds[index].type) {
                        case "tableau":
                        case "tableau projet":
                            newVal.intitule = new Array(3)
                            nbRow = 3
                            break;
                        case "tableau historique":
                            newVal.intitule = new Array(4)
                            nbRow = 4
                            break;
                    }
                    for (var i=0; i < nbRow; i++){
                        var myArray = new Array(tabLength)
                        for(t=0; t < tabLength; t++){
                            myArray[t] = ""
                        }
                        newVal.intitule[i] = myArray
                    }
                    newVal.intitule[numRow][numCol] = value
                }
                defaultRes.push(newVal)
            }
            else {
                if (dataFeilds[index].type === "choix multiples"){
                    if(!isCheck){
                        var convert = defaultRes[objIndex].intitule.split("-")
                        const arrayWithoutD = convert.filter(function (letter) {
                            return letter !== value;
                        });
                        defaultRes[objIndex].intitule = arrayWithoutD.join("-")
                    }
                    else if (isCheck){
                        defaultRes[objIndex].intitule = defaultRes[objIndex].intitule + "-" + value
                    }
                }
                else if(dataFeilds[index].type === "tableau" || dataFeilds[index].type === "tableau historique" || dataFeilds[index].type === "tableau projet"){ 
                    if(typeof defaultRes[objIndex].intitule === "object"){
                        defaultRes[objIndex].intitule[numRow][numCol] = value
                    } 
                    else {
                        var convertRes = defaultRes[objIndex].intitule.split(";").map(pair => pair.split("-")); 
                        defaultRes[objIndex].intitule = convertRes
                    }
                }
                else if(dataFeilds[index].type === "tableau d'appreciation"){
                    if(typeof defaultRes[objIndex].intitule === "object"){
                        defaultRes[objIndex].intitule[value.name] = value.value
                    }
                    else {
                        if(defaultRes[objIndex].intitule.includes(value.name + ":" + value.value)){
                        }
                        else{
                            var convert = defaultRes[objIndex].intitule.split("-")
                            if(convert.slice(-1)[0] === ""){
                                convert.pop()
                            }
                            if (convert.find(c => c.includes(value.name))){
                                var resIndex = convert.findIndex(c => c.includes(value.name))
                                convert[resIndex] = value.name + ":" + value.value
                            } else {
                                convert.push(value.name + ":" + value.value)
                            }
                            defaultRes[objIndex].intitule = convert.join('-')
                        }
                    }
                }
                else {
                    defaultRes[objIndex].intitule = value
                }
            }   
        }
    }
       
    // affichage des champs
    const renderInput = (input, index, defaultRes) => {
        switch (input.type) {
            case "section":
                return <h1 className="section col-sm-10 mx-sm-auto" key={index}>{input.intitule} </h1>;
            case "sous section":
                return <h2 className="sous-section col-sm-10 mx-sm-auto" key={index}>{input.intitule} </h2>;
            case "indication":
                return <h2 className="indication col-sm-10 mx-sm-auto" key={index}>{input.intitule} </h2>;
            case "texte simple":
                return (
                    <div className="col-sm-10 mx-sm-auto" key={index}>
                    <label className="intitule">{input.intitule} </label>
                    {input.estObligatoire
                        ? <input type={input.type} defaultValue={defaultRes} onChange={(e) => { handleChange(index, e.target.value)}} size="40" required/>
                        : <input type={input.type} defaultValue={defaultRes} onChange={(e) => { handleChange(index, e.target.value)}} size="40"/>
                    }
                </div>
                );
            case "texte long":
                return ( 
                    <div className="textarea col-sm-10 mx-sm-auto" key={index}>
                    <label className="intitule">{input.intitule}</label>
                    <textarea defaultValue={defaultRes} rows="3" onChange={(e) => { handleChange(index, e.target.value)}}></textarea>
                </div>
                );
            case "choix multiples":
                var res = ""
                if(defaultRes !== undefined){
                    res = defaultRes + ''
                }
                var convertRes = res.split("-")

                var convert = input.propositionDeReponse + ''
                var value = convert.split("-")
                if(value.length > 1){
                input.propositionDeReponse = value
                }
                return (
                <div className="col-sm-10 mx-sm-auto" key={index}>
                    <label>{input.intitule} : </label>
                    {input.propositionDeReponse.map((valeur, i) => (
                    <label>
                        {convertRes.includes(valeur) && convertRes !== undefined
                            ? <input type="checkbox" defaultChecked onChange={(e) => { handleChange(index, valeur, e.target.checked)}}/>
                            : <input type="checkbox" onChange={(e) => { handleChange(index, valeur, e.target.checked)}}/>
                        }
                        {valeur}
                    </label>
                    ))}
                </div>
                );
            case "choix simple":
                var convert = input.propositionDeReponse + ''
                var value = convert.split("-")
                if(value.length > 1){
                input.propositionDeReponse = value
                }
                return (
                    <>
                        <div className="col-sm-10 mx-sm-auto">
                            <label className="intitule">{input.intitule} : </label>
                            <select id="" key={index} onChange={(e) => { handleChange(index, e.target.value) }}>
                                <option></option>
                                {input.propositionDeReponse.map((lesChoix, index) => (
                                    <>
                                        {lesChoix === defaultRes
                                            ? <option selected="selected" value={lesChoix}>{lesChoix}</option>
                                            : <option value={lesChoix}>{lesChoix}</option>
                                        }
                                    </>
                                ))}
                            </select>
                        </div>
                    </>
                ))}
                </select>
            </>
            );
        case "tableau":
            var res = ""
            if(defaultRes !== undefined){
                res = defaultRes
            }
            var convertRes = res.split(";").map(pair => pair.split("-")); 

            var convert = input.colonnesTableauInformations + ''
            var value = convert.split("-")
            if(value.length > 1){
                input.colonnesTableauInformations = value
            }
            return(
                <>
                    <label className="intitule">{input.intitule} : </label>
                    <table className="tableau-appreciation">
                      <tr>
                        {input.colonnesTableauInformations.map((criteres) => (
                          <>
                            <th>{criteres}</th>
                          </>
                        ))}
                      </tr>
                      {[...Array(3)].map((row, numRow) => (
                        <tr>
                          {input.colonnesTableauInformations.map((col, numCol) => (
                            <>
                                <th>
                                    {convertRes.find(r => r.length !== 1 )
                                        ? <input type="text" defaultValue={convertRes[numRow][numCol]} onChange={(e) => { handleChange(index, e.target.value, e.target.checked, numRow, numCol, input.colonnesTableauInformations.length)}}/>
                                        : <input type="text" onChange={(e) => { handleChange(index, e.target.value, e.target.checked, numRow, numCol, input.colonnesTableauInformations.length)}}/>
                                    }
                                </th>
                            </>
                          ))}
                        </tr>
                        ))}
                    </table>
                </>
            );
        case "tableau historique":
            var res = ""
            if(defaultRes !== undefined){
                res = defaultRes
            }
            var convertRes = res.split(";").map(pair => pair.split("-")); 
            return(
                <>
                    <label className="intitule">{input.intitule} : </label>
                    <table className="tableau-appreciation">
                        <tr>
                            {tabHistorique.map((criteres) => (
                                <>
                                    <th>{criteres}</th>
                                </>
                            ))}
                        </tr>
                        {[...Array(4)].map((row, numRow) => (
                            <tr>
                                {tabHistorique.map((col, numCol) => (
                                    <>
                                        <th>
                                            {convertRes.find(r => r.length !== 1 )
                                                ? <input type="text" defaultValue={convertRes[numRow][numCol]} onChange={(e) => { handleChange(index, e.target.value, e.target.checked, numRow, numCol, input.colonnesTableauInformations.length)}}/>
                                                : <input type="text" onChange={(e) => { handleChange(index, e.target.value, e.target.checked, numRow, numCol, tabHistorique.length)}}/>
                                            }
                                        </th>
                                    </>
                                ))}
                            </tr>
                        ))}
                    </table>
                </>
            );
        case "tableau projet":
            var res = ""
            if(defaultRes !== undefined){
                res = defaultRes
            }
            var convertRes = res.split(";").map(pair => pair.split("-")); 
            return(
                <>
                    <label className="intitule">{input.intitule} : </label>
                    <table className="tableau-appreciation">
                        <tr>
                            {tabProjet.map((criteres) => (
                                <>
                                    <th>{criteres}</th>
                                </>
                            ))}
                        </tr>
                        {[...Array(3)].map((row, numRow) => (
                            <tr>
                                {tabProjet.map((col, numCol) => (
                                    <>
                                        <th>
                                            {convertRes.find(r => r.length !== 1 )
                                                ? <input type="text" defaultValue={convertRes[numRow][numCol]} onChange={(e) => { handleChange(index, e.target.value, e.target.checked, numRow, numCol, input.colonnesTableauInformations.length)}}/>
                                                : <input type="text" onChange={(e) => { handleChange(index, e.target.value, e.target.checked, numRow, numCol, tabProjet.length)}}/>
                                            }
                                        </th>
                                    </>
                                ))}
                            </tr>
                        ))}
                    </table>
                </>
            );
        case "tableau d'appreciation":
            var res = ""
            if(defaultRes !== undefined){
                res = defaultRes + ''
            }
            var convertRes = res.split("-").map(pair => pair.split(":")); 
            if(convertRes.slice(-1)[0] === ""){
                convertRes.pop()
            }
                var convert = input.colonnesTableauInformations + ''
                var value = convert.split("-")
                if(value.length > 1){
                    input.colonnesTableauInformations = value
                }
                return(
                    <>
                        <div className="col-sm-10 mx-sm-auto ">
                            <label className="intitule mb-3">{input.intitule} : </label>
                            <div className="table-responsive">
                                <table className="tableau-appreciation">
                                    <tr>
                                        {input.colonnesTableauInformations.map((criteres) => (
                                            <>
                                                <th>{criteres}</th>
                                            </>
                                        ))}
                                    </tr>
                                    {[...Array(3)].map((row, numRow) => (
                                        <tr>
                                            {input.colonnesTableauInformations.map((col, numCol) => (
                                                <>
                                                    <th>
                                                        {convertRes.find(r => r.length !== 1)
                                                            ? <input type="text" defaultValue={convertRes[numRow][numCol]} onChange={(e) => { handleChange(index, e.target.value, e.target.checked, numRow, numCol, input.colonnesTableauInformations.length) }} />
                                                            : <input type="text" onChange={(e) => { handleChange(index, e.target.value, e.target.checked, numRow, numCol, input.colonnesTableauInformations.length) }} />
                                                        }
                                                    </th>
                                                </>
                                            ))}
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </>
                );
            case "tableau d'appreciation":
                var res = ""
                if(defaultRes !== undefined){
                    res = defaultRes + ''
                }
                var convertRes = res.split("-").map(pair => pair.split(":")); 
                if(convertRes.slice(-1)[0] === ""){
                    convertRes.pop()
                }

                var convert = input.criteresAppreciation + ''
                var value = convert.split("-")
                if(value.length > 1){
                  input.criteresAppreciation = value
                }
                return (
                    <>
                        <div className="col-sm-10 mx-sm-auto">
                            <label className="intitule mb-3">{input.intitule} : </label>
                            <table className="tableau-appreciation">
                                <tr>
                                    <th></th>
                                    {propAppreciation.map((prop) => (
                                        <><th>{prop}</th></>
                                    ))}
                                </tr>


                                {input.criteresAppreciation.map((criteres) => (
                                    <tr>
                                        <td>{criteres}</td>
                                        {propAppreciation.map((prop) => (
                                            <>
                                                {convertRes.find(r => r[0] === criteres && r[1] === prop)
                                                    ? <td><input type="radio" value={prop} name={criteres} defaultChecked onChange={(e) => { handleChange(index, e.target) }} /></td>
                                                    : <td><input type="radio" value={prop} name={criteres} onChange={(e) => { handleChange(index, e.target) }} /></td>
                                                }
                                            </>
                                        ))}
                                    </tr>
                                ))}


                            </table>
                        </div>
                       
                  </>
                );
            case "notation":
                return (
                    <div className="col-sm-10 mx-sm-auto">
                        <label className="intitule mb-1">{input.intitule} : </label>
                        <table className="tableau-notation">
                             <tr>
                               {[...Array(10)].map((star, i) => (
                                 <>
                                   <th>{i + 1}</th>
                                 </>
                               ))}
                             </tr>
                           {[...Array(10)].map((star, i) => (
                             <>
                                {i + 1 === Number(defaultRes)
                                    ? <th><input type="radio" defaultChecked value={i} name={input.intitule} onChange={(e) => { handleChange(index, e.target.value)}}/></th>
                                    : <th><input type="radio" value={i} name={input.intitule} onChange={(e) => { handleChange(index, e.target.value)}}/></th>
                                }
                            
                             </>
                           ))}
                             <tr>
   
                             </tr>
                       </table>
                 </div>
                );
            default:
                return <> </>;
        }
    };

    function pdf() {
        var pdf = document.getElementsByClassName('pdf')
        var block1 = document.getElementsByClassName('block')
        pdf[0]['style'].display = "block"
        block1[0]['style'].display = "none"
      } 

    function cancel() {
        var pdf = document.getElementsByClassName('pdf')
        var block1 = document.getElementsByClassName('block')
        pdf[0]['style'].display = "none"
        block1[0]['style'].display = "block"
      }

    return (
        <>
            <div className="pdf">
                    <Button onClick={cancel}>
                        <Icon.ArrowBarLeft /> Retour
                    </Button>
                    <PDFRender data={dataFeilds} reponses={defaultRes}></PDFRender>
                </div>
            <div className="background">
                <div className="block">
                    <div>
                        <img className="logo-form" src={logo} alt="logo" />
                    </div>
                    <form className="data-block">
                        {dataFeilds.map((feild, index) => {
                            return (
                            <div className="flexData">
                                {defaultRes.length !== 0 && feild.type !== "section"
                                    ? <>
                                        {defaultRes.find(d => d.positionChamp === feild.position)
                                            ? <>{renderInput(feild, index, defaultRes.find(r => r.positionChamp === feild.position).intitule)} </>
                                            : <>{renderInput(feild, index)}</>
                                        }
                                        
                                    </>
                                    : <>{renderInput(feild, index)}</>
                                }
                            </div>
                            );
                        })}
                        <Button className="btn-new-doc" onClick={pdf}>
                            <Icon.PlusSquareFill /> View PDF
                        </Button>
                        <Button className="new-doc-button2" variant="primary" onClick={handleSubmit}><span><Icon.Save/></span> Enregistrer et continuer plus tard </Button>
                        <Button className="new-doc-button" variant="primary" onClick={ e => {handleSubmit(action="soumettre")}}><span><Icon.Save/></span> Terminer </Button>
                    </form>
                </div>
            </div>
        </>
    )
};