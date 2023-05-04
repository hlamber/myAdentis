import React from "react";
import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { Button, CardGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import checkDoc from "../../../utilities/checkDoc";
import AddFeilds from "../AddFeilds";
import { deleteChamp, newChamps, updateChamps } from "../../../services/Champs";
import logo from "../../../images/logo-adentis.png";
import "../data.css";

export default function Data({}) {

  var { id } = useParams()
  const myDocs = useSelector((state) => state.doc.docList); // recuperer tout les documents
  const doc = myDocs.slice(-1)[0];
  var oldDoc = myDocs.find(d => d.id === +id)
  const cachedChamps = useSelector(state => state.doc.champsList);

  var [dataFeilds, setDataFeilds] = useState(cachedChamps);
  var [selectedChamp, setSelectedChamp] = useState();
  var [changedChamp, setChangedChamp] = useState([])


  const [find, setFind] = useState(false);
  var type=""
  var tabHistorique = ["Client", "Poste", "Débuté il y a combien de mois (chiffre uniquement)", "Durée en mois (chiffre uniquement)"]
  var tabProjet = ["Client", "Durée", "Missions réalisées", "Comment as-tu perçu cette expérience ?"]

  useEffect(() => {
    checkDoc();
  }, []);

  if (find === false) {
    if (
      cachedChamps !== undefined &&
      JSON.stringify(cachedChamps) !== "[]" &&
      id !== undefined
    ) {
      var myChamps = cachedChamps;
      for (var d in myChamps) {
        if (
          myChamps[d].type === "choix multiples" ||
          myChamps[d].type === "choix simple"
        ) {
          var split;
          var sp;
          split = myChamps[d].intitule + "";
          sp = split.split("-");
          if (sp.length > 1) {
            myChamps[d].intitule = sp;
          }
        }
        setFind(true);
      }
      setDataFeilds(myChamps);
    }
  }

  //modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "17%",
      height: "30%",
      overflow: "auto",
    },
  };

  //--------------------supprimer un champs
  const removeFeild = (index, i) => {
    const list = [...dataFeilds];
    list.splice(index, 1);
    setDataFeilds(list);
    if (i !== undefined) {
      deleteChamp(i);
    }
  };
  //  fonction modal
  const openModal = (index) => {
    setModalIsOpen(true);
    setSelectedChamp(dataFeilds[index])
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // ajouter des chmaps avec modal
  const champAjout = (data) => {
    setDataFeilds((dataFeilds) => [...dataFeilds, ...data]);
  };

  const champModif = (data, id) => {

    if(id !== undefined){
      dataFeilds.find(d => d.id === id).intitule = data[0].intitule
      dataFeilds.find(d => d.id === id).type = data[0].type
      dataFeilds.find(d => d.id === id).propositionDeReponse = data[0].propositionDeReponse
      dataFeilds.find(d => d.id === id).criteresAppreciation = data[0].criteresAppreciation
      dataFeilds.find(d => d.id === id).estObligatoire = data[0].estObligatoire
      dataFeilds.find(d => d.id === id).position = data[0].position
      dataFeilds.find(d => d.id === id).colonnesTableauInformations = data[0].colonnesTableauInformations

      setChangedChamp([...changedChamp, dataFeilds.find(d => d.id === id)]);

    }
    else {
      dataFeilds.find(d => d.index === data[0].index).intitule = data[0].intitule
      dataFeilds.find(d => d.index === data[0].index).type = data[0].type
      dataFeilds.find(d => d.index === data[0].index).propositionDeReponse = data[0].propositionDeReponse
      dataFeilds.find(d => d.index === data[0].index).criteresAppreciation = data[0].criteresAppreciation
      dataFeilds.find(d => d.index === data[0].index).estObligatoire = data[0].estObligatoire
      dataFeilds.find(d => d.index === data[0].index).position = data[0].position
      dataFeilds.find(d => d.index === data[0].index).colonnesTableauInformations = data[0].colonnesTableauInformations

      setChangedChamp([...changedChamp, dataFeilds.find(d => d.index === data[0].index)]);

    }
  };

  const handleSubmit = async (e) => {
    var oldChamps = [];
    var newChamps = [];
    for (var d in dataFeilds) {
      if (dataFeilds[d].id) {
        oldChamps.push(dataFeilds[d]);
        e.preventDefault();
      } else {
        newChamps.push(dataFeilds[d]);
        e.preventDefault();
      }
    }
    createChamps(newChamps, oldChamps)
  }

  function saveChamps(){

    var update = {}

    for(var c in changedChamp){

      if(changedChamp[c].type  === "choix multiples" || changedChamp[c].type === "choix simple"){
        var convert = changedChamp[c].propositionDeReponse
        changedChamp[c].propositionDeReponse = convert.join("-")
      }

      if(changedChamp[c].type === "tableau d'appreciation"){
        var convert = changedChamp[c].criteresAppreciation
        changedChamp[c].criteresAppreciation = convert.join("-")
      }

      if(changedChamp[c].type === "tableau"){
        var convert = changedChamp[c].colonnesTableauInformations
        changedChamp[c].colonnesTableauInformations = convert.join("-")
      }

      if(changedChamp[c].estObligatoire === "on"){
        changedChamp[c].estObligatoire = true
      }
      else{
        changedChamp[c].estObligatoire = false
      }

      if(changedChamp[c].id !== undefined){
        if(id === undefined){
          update = {
            id : changedChamp[c].id,
            type: changedChamp[c].type,
            intitule: changedChamp[c].intitule,
            propositionDeReponse: changedChamp[c].propositionDeReponse,
            criteresAppreciation: changedChamp[c].criteresAppreciation,
            colonnesTableauInformations: changedChamp[c].colonnesTableauInformations,
            position: changedChamp[c].position,
            estObligatoire: changedChamp[c].estObligatoire,
            documentId: doc.id,
            document: {
              id: doc.id,
              type: doc.type,
              intitule: doc.intitule,
            }
          }
        } else {
          update = {
            id : changedChamp[c].id,
            type: changedChamp[c].type,
            intitule: changedChamp[c].intitule,
            propositionDeReponse: changedChamp[c].propositionDeReponse,
            criteresAppreciation: changedChamp[c].criteresAppreciation,
            colonnesTableauInformations: changedChamp[c].colonnesTableauInformations,
            position: changedChamp[c].position,
            estObligatoire: changedChamp[c].estObligatoire,
            documentId: oldDoc.id,
            document: {
              id: oldDoc.id,
              type: oldDoc.type,
              intitule: oldDoc.intitule,
            }
          }
        }
        updateChamps(update, changedChamp[c].id)
      }
    }
  }

  async function createChamps(currentChamps, oldChamps) {

    var pos

    if(oldChamps.length === 0){
      pos = 0
    } 
    else {
      pos = (dataFeilds.slice(-(1 + currentChamps.length))[0].position) + 1
    }

    for (var n in currentChamps){
      if(currentChamps[n].estObligatoire === "on"){
        currentChamps[n].estObligatoire = true
      }
      else{
        currentChamps[n].estObligatoire = false
      }

      if(currentChamps[n].type === "choix multiples" || currentChamps[n].type === "choix simple"){
        const champ = currentChamps[n].propositionDeReponse;
        var prop = champ.join("-");
        currentChamps[n].propositionDeReponse = prop
      }

      if(currentChamps[n].type === "tableau"){
        const champ = currentChamps[n].colonnesTableauInformations;
        var crit = champ.join("-");
        currentChamps[n].colonnesTableauInformations = crit
      }

      if(currentChamps[n].type === "tableau d'appreciation"){
        const champ = currentChamps[n].criteresAppreciation;
        var crit = champ.join("-");
        currentChamps[n].criteresAppreciation = crit
      }
        var fichier1 = {}

        if(id === undefined){
          fichier1 = {
            type: currentChamps[n].type,
            intitule: currentChamps[n].intitule,
            propositionDeReponse: currentChamps[n].propositionDeReponse,
            criteresAppreciation: currentChamps[n].criteresAppreciation,
            colonnesTableauInformations: currentChamps[n].colonnesTableauInformations,
            position: pos,
            estObligatoire: currentChamps[n].estObligatoire,
            documentId: doc.id,
            document: {
              id: doc.id,
              type: doc.type,
              intitule: doc.intitule,
            }
          }
        } else {
          fichier1 = {
            type: currentChamps[n].type,
            intitule: currentChamps[n].intitule,
            propositionDeReponse: currentChamps[n].propositionDeReponse,
            criteresAppreciation: currentChamps[n].criteresAppreciation,
            colonnesTableauInformations: currentChamps[n].colonnesTableauInformations,
            position: pos,
            estObligatoire: currentChamps[n].estObligatoire,
            documentId: oldDoc.id,
            document: {
              id: oldDoc.id,
              type: oldDoc.type,
              intitule: oldDoc.intitule,
            }
          }
        }
        await newChamps(fichier1);
        pos += 1
    }

    await saveChamps()

    window.location.href = "/";
  }

  async function changePosition(dataFeilds, index, feild, type){
    var index1
    var newPos = {}
    var newPos2 = {}

    if(type === "up"){
      index1 = dataFeilds.find(d => d.position === dataFeilds[index].position - 1)
    }
    else if (type === "down"){
      index1 = dataFeilds.find(d => d.position === dataFeilds[index].position + 1)
    }

    if(index1 !== undefined){

      if(type === "up"){
        index1.position += 1
        feild.position -= 1
      }
      else if (type === "down"){
        index1.position -= 1
        feild.position += 1
      }

      if(index1.type  === "choix multiples" || index1.type === "choix simple"){
        var convert = index1.propositionDeReponse
        index1.propositionDeReponse = convert.join("-")
      }
      if(feild.type  === "choix multiples" || feild.type === "choix simple"){
        var convert = feild.propositionDeReponse
        feild.propositionDeReponse = convert.join("-")
      }

      if(index1.type  === "tableau d'appreciation"){
        var convert = index1.criteresAppreciation
        index1.criteresAppreciation = convert.join("-")
      }
      if(feild.type  === "tableau d'appreciation"){
        var convert = feild.criteresAppreciation
        feild.criteresAppreciation = convert.join("-")
      }

      if(index1.type  === "tableau"){
        var convert = index1.colonnesTableauInformations
        index1.colonnesTableauInformations = convert.join("-")
      }
      if(feild.type  === "tableau"){
        var convert = feild.colonnesTableauInformations
        feild.colonnesTableauInformations = convert.join("-")
      }

      if(id === undefined){
        newPos = {
          id: index1.id,
          type: index1.type,
          intitule: index1.intitule,
          propositionDeReponse: index1.propositionDeReponse,
          criteresAppreciation: index1.criteresAppreciation,
          colonnesTableauInformations: index1.colonnesTableauInformations,
          position: index1.position,
          documentId: doc.id,
            document: {
              id: doc.id,
              type: doc.type,
              intitule: doc.intitule,
            }
        }
        newPos2 = {
          id: feild.id,
          type: feild.type,
          intitule: feild.intitule,
          propositionDeReponse: feild.propositionDeReponse,
          criteresAppreciation: feild.criteresAppreciation,
          colonnesTableauInformations: feild.colonnesTableauInformations,
          position: feild.position,
          documentId: doc.id,
            document: {
              id: doc.id,
              type: doc.type,
              intitule: doc.intitule,
            }
        }
      }
      else {
        newPos = {
          id: index1.id,
          type: index1.type,
          intitule: index1.intitule,
          propositionDeReponse: index1.propositionDeReponse,
          criteresAppreciation: index1.criteresAppreciation,
          colonnesTableauInformations: index1.colonnesTableauInformations,
          position: index1.position,
          documentId: oldDoc.id,
          document: {
            id: oldDoc.id,
            type: oldDoc.type,
            intitule: oldDoc.intitule,
          }
        }
  
        newPos2 = {
          id: feild.id,
          type: feild.type,
          intitule: feild.intitule,
          propositionDeReponse: feild.propositionDeReponse,
          criteresAppreciation: feild.criteresAppreciation,
          colonnesTableauInformations: feild.colonnesTableauInformations,
          position: feild.position,
          documentId: oldDoc.id,
          document: {
            id: oldDoc.id,
            type: oldDoc.type,
            intitule: oldDoc.intitule,
          }
        }
      }
      await updateChamps(newPos, index1.id)
      await updateChamps(newPos2, feild.id)
      window.location.reload()
    }
  }

  // affichage des champs
  const renderInput = (input, index) => {
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
                <label className="intitule">{input.intitule} : </label>
                {input.estObligatoire
                    ? <input  type={input.type} required />
                    : <input  type={input.type} />
                }
         
          </div>
        );
      case "texte long":
        return (
            <div className="textarea col-sm-10 mx-sm-auto" key={index}>
                <label className="intitule  mb-1">{input.intitule} :</label>
            <textarea rows="3"></textarea>
          </div>
        );
      case "choix multiples":
        var convert = input.propositionDeReponse + ''
        var value = convert.split("-")
        if(value.length > 1){
          input.propositionDeReponse = value
        }
        return (
            <div className="col-sm-10 mx-sm-auto" key={index}>
            <label className="intitule">{input.intitule} : </label>
            {input.propositionDeReponse.map((valeur, i) => (
                <label>
                    <input className="mx-2" type="checkbox" />
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
                    <select  key={index}>
                        {input.propositionDeReponse.map((lesChoix, index) => (
                            <option value={lesChoix}>{lesChoix}</option>
                        ))}
                    </select>
                 </div>
            </>
        );
      case "tableau":
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
              {[...Array(3)].map(() => (
                <tr>
                  {input.colonnesTableauInformations.map(() => (
                    <>
                      <th><input type="text"/></th>
                    </>
                  ))}
                </tr>
                ))}
              </table>
              </div>
            </div>
          </>
        );
      case "tableau historique":
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
              {[...Array(4)].map(() => (
                <tr>
                  {tabHistorique.map(() => (
                    <>
                      <th><input type="text"/></th>
                    </>
                  ))}
                </tr>
                ))}
            </table>
          </>
        );
      case "tableau projet":
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
              {[...Array(3)].map(() => (
                <tr>
                  {tabProjet.map(() => (
                    <>
                      <th><input type="text"/></th>
                    </>
                  ))}
                </tr>
                ))}
            </table>
          </>
        );
      case "tableau d'appreciation":
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
                            <th>Pas du tout satisfaisant</th>
                            <th>Peu satisfaisant</th>
                            <th>Moyennement satisfaisant</th>
                            <th>Satisfaisant</th>
                            <th>Très satisfaisant</th>
                        </tr>
                        {input.criteresAppreciation.map((criteres, index) => (
                            <tr>
                                <td>{criteres}</td>
                                <td><input type="radio" value="Pas du tout satisfaisant" name={criteres} /></td>
                                <td><input type="radio" value="Peu satisfaisant" name={criteres} /></td>
                                <td><input type="radio" value="Moyennement satisfaisant" name={criteres} /></td>
                                <td><input type="radio" value="Satisfaisant" name={criteres} /></td>
                                <td><input type="radio" value="Très satisfaisant" name={criteres} /></td>
                            </tr>
                        ))}
                    </table>
                </div>
          </>
        )
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
                            <th><input type="radio" value={i} name="note" /></th>
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

  //affichage

  return (
    <div className="background">
      <div className="block">
        <div>
          <img className="logo-form" src={logo} alt="logo" />
        </div>
              <div className="data-block">
                  <div className="allFields">
                      {dataFeilds.map((feild, index) => {
                          return (
                              <>
                                  {dataFeilds.length !== 0
                                      ?
                                      <>
                                          <div className="flexData">
                                              <button className="btn-pos option" onClick={() => { changePosition(dataFeilds, index, feild, type = "up"); }}>
                                                  <Icon.ArrowUpShort />
                                              </button>
                                              <button className="btn-pos option" onClick={() => { changePosition(dataFeilds, index, feild, type = "down"); }}>
                                                  <Icon.ArrowDownShort />
                                              </button>
                                              <button className="btn-remove option" onClick={() => { removeFeild(index, feild.id); }}>
                                                  <Icon.Trash />
                                              </button>
                                              <button className="option" onClick={() => { openModal(index) }}>
                                                  <Icon.PencilSquare />
                                              </button>
                                              <div className="champs">{renderInput(feild, index)}</div>
                                          </div>
                                      </>
                                      :
                                      <></>
                                  }
                              </>
                          );
                      })}

                      <Button className="btn-new-doc" onClick={openModal}>
                          <Icon.PlusSquareFill /> Ajouter un Champs
                      </Button>

                      <Button
                          className="new-doc-button"
                          variant="primary"
                          onClick={handleSubmit}
                      >
                          <span>
                              <Icon.Save />
                          </span>{" "}
                          Enregistrer{" "}
                      </Button>
                  </div>

        </div>


        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Exemple de modal"
        >
          <AddFeilds
            data={dataFeilds}
            addData={champAjout}
            modif={champModif}
            closeModal={closeModal}
            champ= {selectedChamp}
          ></AddFeilds>

        </Modal>
        {/* dkf */}
      </div>
    </div>
  );
}
