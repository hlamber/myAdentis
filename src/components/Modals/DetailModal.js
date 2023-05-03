import {React, useRef} from 'react';
import ReactDOM from "react-dom";
import * as Icon from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { updateDocument, deleteDocument } from '../../services/Documents';
import PropTypes from "prop-types";
import "./Modal.css";
import "../documentcard/Card.css";

export default function DetailModal({isShowing, id, hide, title, type}) {

    const titleRef = useRef();
    const typeRef = useRef();
    const slugRef = useRef();

    function closeDetailModal() {
        hide()
    }

    function newDoc() {
        window.location.href = `Document/${id}`;
    }

    function changesDocument(){
        const json_load = {
          id: id,
          type: typeRef.current.value,
          intitule: titleRef.current.value,
          slug: slugRef.current.value,
        }
        updateDocument(json_load, id)
        .then(res => {
          if (res.status === 204) {
            sessionStorage.setItem("successMessage", "Modification réussi !")
            window.location.href = "/?success=1"
          } else {
            toast.error("Echec de la modification ...");
          }
        })
    }

    function suppDocument(){
        const json_load = {
          id: id,
        }
        deleteDocument(json_load, id)
        .then(res => {
          if (res.status === 204) {
            sessionStorage.setItem("successMessage", "Suppression réussi !")
            window.location.href = "/?success=1"
          } else {
            toast.error("Echec de la suppression ...");
          }
        })
      }

    return isShowing &&
        ReactDOM.createPortal(
            <div className="detail-modal">
                <div className="modal-wrapper" onClick={() => hide()}>
                    <div className="modal2" onClick={e => e.stopPropagation()}>
                        <div className='header-modal'>
                            <h2>Nom du document</h2><Button className='icon icon-delete' type="button" onClick={() => suppDocument()}><Icon.Trash/></Button>
                        </div>
                        <div className='row-modal'>
                            <input type="text" className='title-modal' defaultValue={title} ref={titleRef}></input>
                        </div>
                        <div className='row-modal'>
                            <label>Type</label>
                            <select defaultValue={type} ref={typeRef}>
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
                        <Button className='btn-modal' onClick={closeDetailModal}>Annuler</Button>
                        <br/>
                        <br/>
                        <Button className='btn-modal' onClick={() => newDoc()}>Voir le formulaire</Button>
                        <br/>
                        <br/>
                        <Button className='btn-modal' onClick={changesDocument}>Ok</Button>
                    </div>
                </div>
            </div>, document.body
        )
}

DetailModal.propTypes = {
    isShowing: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  };