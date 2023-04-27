import {React, useRef} from 'react';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { createDocument } from "../../services/Documents";
import { Button } from "react-bootstrap";
import "./Modal.css";
import "../documentcard/Card.css";

export default function NewDocModal({isShowing, hide}) {

    const titleRef = useRef();
    const typeRef = useRef();
    const slugRef = useRef();

    function closeNewDocModal() {
        hide()
    }
    
    function newDoc() {
        const json_load = {
            type: typeRef.current.value,
            intitule: titleRef.current.value,
            slug: slugRef.current.value,
        };
        createDocument(json_load);
        window.location.href = "/newDoc";
    }

    return isShowing &&
        ReactDOM.createPortal(
            <div className="detail-modal">
                <div className="modal-wrapper" onClick={() => hide()}>
                    <div className="modal2" onClick={e => e.stopPropagation()}>
                        <div className='header-modal'>
                            <h2>Nom du document</h2>
                        </div>
                        <div className="row-modal">
                            <input type="text" className="title-modal" ref={titleRef}></input>
                        </div>
                        <div className="row-modal">
                            <label>Type</label>
                            <select ref={typeRef}>
                            <option valeur="Intégration">Intégration</option>
                            <option valeur="Management">Management</option>
                            <option valeur="Suivi de carrière">Suivi de carrière</option>
                            </select>
                        </div>
                        <div className="row-modal">
                            <label>Slug</label>
                            <select ref={slugRef}>
                            <option value="suivi-integration-1-mois">Suivi d’intégration à 1 mois</option>
                            <option value="suivi-integration-3-mois">Suivi d’intégration à 3 mois</option>
                            <option value="suivi-integration-6-mois">Suivi d’intégration à 6 mois</option>
                            <option value="pap">Point Avancement Projet (PAP)</option>
                            <option value="pmp">Point Mensuel Projet (PMP)</option>
                            <option value="bilan-professionnel">Bilan professionnel</option>
                            <option value="bilan-annuel">Bilan annuel</option>
                            <option value="bilan-intermediaire">Bilan intermédiaire</option>
                            </select>
                        </div>
                        <Button className="btn-modal" onClick={closeNewDocModal}>
                            Annuler
                        </Button>
                        <br />
                        <br />
                        <Button className="btn-modal" onClick={() => newDoc()}>
                            Ok
                        </Button>
                    </div>
                  </div>
            </div>, document.body
        )
}

NewDocModal.propTypes = {
    isShowing: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
  };