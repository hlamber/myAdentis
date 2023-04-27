import {React, useRef} from 'react';
import ReactDOM from "react-dom";
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import PropTypes from "prop-types";
import { getUsers } from '../../services/Users';
import { createSoumission } from '../../services/Soumissions';
import "./Modal.css";
import "../documentcard/Card.css";

export default function SendModal({isShowing, id, hide, title, type}) {

    const emailRef = useRef();
    const dateRef = useRef();

    function closeSendModal() {
        hide()
    }

    async function sendDoc(){
      var userCible
  
      await getUsers()
      .then(res => {
        for (var r in res){
          if (res[r].email === emailRef.current.value){
            userCible = res[r]
          }
        }
      })
  
      const json_load = {
        userId : userCible.id,
        documentId : id,
        user : userCible,
        document : 
          {id: id,
          type: type,
          intitule: title
        },
        dateLimite : "2023-02-26T17:21:39.930Z",
      }
  
      createSoumission(json_load)
      .then(res => {
        if (res.status === 201) {
          sessionStorage.setItem("successMessage", "Envoi reussi !")
          window.location.href = "/?success=1"
        } else {
          toast.error("Echec de l'envoi ...");
        }
      })
    }

    return isShowing &&
        ReactDOM.createPortal(
            <div className="detail-modal">
                <div className="modal-wrapper" onClick={() => hide()}>
                    <div className="modal2" onClick={e => e.stopPropagation()}>
                      <div>
                        <div className='header-modal'><h2>Envoyer un document</h2></div>
                        <div className='row-modal'>
                          <label>Veuillez sélectionner le destinataire du document : </label>
                          <input type="text" placeholder="Email" ref={emailRef}></input>
                        </div>
                        <div className='row-modal'>
                          <label>Choix de la date limite : </label><input type="date" ref={dateRef}/>
                        </div>
                      </div>
                      <br/>
                      <Button className='btn-modal' onClick={() => sendDoc()}>Envoyer</Button>
                    </div>
                  </div>
            </div>, document.body
        )
}

SendModal.propTypes = {
    isShowing: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  };