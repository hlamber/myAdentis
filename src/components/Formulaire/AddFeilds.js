import {React, useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Stack, Rating } from "@mui/material";
import "./addFeilds.css";

const AddFeilds = (props) => {
  const [selectTnput, setSelectInput] = useState();
  const [feilds, setFeilds] = useState([]);
  const [labelInput, setLabelInput] = useState();
  const [proposition, setProposition] = useState();
  const [colonnesTableauInformations, setColTab] = useState();
  const [nbRow, setNbRow] = useState();
  const [criteresAppreciation, setCriteresAppreciation] = useState();
  const [notation, setNotation] = useState(1)
  const [isRequire, setIsRequire] = useState();
  const [rating, setRating] = useState(0);

  const addChamp = () => {
    const donnee = [
      ...feilds,
      {
        type: `${selectTnput}`,
        intitule: labelInput,
        propositionDeReponse: proposition,
        colonnesTableauInformations: colonnesTableauInformations,
        nbRow: nbRow,
        criteresAppreciation: criteresAppreciation,
        notation: notation,
        estObligatoire: isRequire,
        index: "",
      },
    ];

    setFeilds([...donnee]);
    // mettre à jour le formulaire et ajouter les nouveaux champs
    if(props.champ === undefined){
      donnee[0].index = Math.random()
      props.addData(donnee);
    }
    else {
      if(donnee[0].propositionDeReponse === undefined){
        donnee[0].propositionDeReponse = props.champ.propositionDeReponse
      }
      if(donnee[0].criteresAppreciation === undefined){
        donnee[0].criteresAppreciation = props.champ.criteresAppreciation
      }
      if(donnee[0].colonnesTableauInformations === undefined){
        donnee[0].colonnesTableauInformations = props.champ.colonnesTableauInformations
      }
      if(donnee[0].intitule === undefined){
        donnee[0].intitule = props.champ.intitule
      }
      donnee[0].index = props.champ.index
      donnee[0].position = props.champ.position
      props.modif(donnee, props.champ.id)
    }
    props.closeModal();
  };

  useEffect(() => {
    if(props.champ !== undefined){
      setSelectInput(props.champ.type)
    }
  }, []);

  function changeNotation(newVal){
    setNotation(newVal)
  }

  return (
    <div>
        <select className="form-add-field" id="feild-select" onChange={(e) => {const input = e.target.value; setSelectInput(input);}} defaultValue={props.champ !== undefined ? props.champ.type : ""}>
          <option>selectionner le champ</option>
          <option value="section">section</option>
          <option value="sous section">sous section</option>
          <option value="texte simple">texte simple</option>
          <option value="texte long">texte long</option>
          <option value="choix simple">choix simple</option>
          <option value="choix multiples">choix multiples</option>
          <option value="tableau">tableau</option>
          <option value="tableau d'appreciation">tableau d'appreciation</option>
          <option value="notation">notation</option>
        </select>
        <input className="form-add-field" defaultValue={props.champ !== undefined ? props.champ.intitule : ""} onChange={(e) => {setLabelInput(e.target.value);}} type="text" placeholder="Intitulé" value={labelInput}/>
        {selectTnput === "choix simple" || selectTnput === "choix multiples"
          ?
            <input
              className="form-add-field"
              onChange={(e) => {
                setProposition(e.target.value);
              }}
              type="text"
              placeholder="Réponse possible"
              value={proposition}
              defaultValue={props.champ !== undefined ? props.champ.propositionDeReponse.join("-") : ""}
            />
          : <></>
        }
        {selectTnput === "tableau" 
          ?
          <>
            <input
              className="form-add-field"
              onChange={(e) => {
                setColTab(e.target.value);
              }}
              type="text"
              placeholder="Colonnes du tableau"
              value={colonnesTableauInformations}
              defaultValue={props.champ !== undefined ? props.champ.colonnesTableauInformations.join("-") : ""}
            />
            {/* <input 
              type="number" 
              value={nbRow}
              defaultValue={props.champ !== undefined ? props.champ.nbRow.join("-") : ""}
              onChange={(e) => {
                setNbRow(e.target.value);
              }}
            /> */}
          </>
          : <></>
        }
        {selectTnput === "tableau d'appreciation" 
          ?
            <input
              className="form-add-field"
              onChange={(e) => {
                setCriteresAppreciation(e.target.value);
              }}
              type="text"
              placeholder="Critères d'apréciation"
              value={criteresAppreciation}
              defaultValue={props.champ !== undefined ? props.champ.criteresAppreciation.join("-") : ""}
            />
          : <></>
        }
        {selectTnput === "notation" 
          ?
            <div className="star">
              <Rating value={notation} onChange={(e) => { changeNotation(e.target.value)}} precision={0.5}></Rating>
            </div>
          : <></>
        }
        <label>Champs requis</label>
        <label className="switch">
          <input type="checkbox" onChange={(e) => {setIsRequire(e.target.value);}}/>
          <span className="slider round"></span>
        </label>
        <Button className="btn-add-champ" onClick={addChamp}>
          <Icon.PlusSquareFill /> Ajouter un Champs
        </Button>
    </div>
  );
};

export default AddFeilds;
