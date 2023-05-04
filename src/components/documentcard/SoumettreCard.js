import {React, useState} from 'react';
import { Card, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useSelector } from "react-redux";
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import './Card.css';

export default function SoumettreCard({id, title, type, prenom, date, toUser}) {

  const infoUser = useSelector((state) => state.user.infoUser);
  const[to_email,] = useState(toUser.email)
  const[consultant_name,] = useState(prenom)
  const[type_document,] = useState(type)
  const[date_limite,] = useState(date)

  function sendEmail() {
    var templateParams = {
        type_document: type_document,
        consultant_name: consultant_name,
        to_email: to_email,
        date_limite: date_limite,
    };

    emailjs.send('service_eglby8c', 'template_2iyvfvl', templateParams, 'KT09w11EzIbMyCpzz')
        .then((result) => {
            sessionStorage.setItem("successMessage", "Relance envoyée !")
            window.location.href = "/?success=1"
        }, (error) => {
            toast.error("Echec de l'envoi ...");
        });

  };

  return (
    <>
        <Card style={{ maxWidth: "400px" }}>
            <Card.Header><strong>{type}</strong></Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0" style={{ fontSize: "93%" }}>
                <p>{title}</p>
                <h4>{prenom}</h4>
                <footer className="blockquote-footer" >
                    Date limite :  <cite title="Source Title">{date}</cite>
                    {infoUser.role >= 1 
                        ? 
                            <Button className='icon icon-relance' title="Relancer" type="button" onClick={() => sendEmail() }><Icon.ArrowRepeat/></Button>
                        : <></>
                          }
                          <Button className='icon' type="button" title="Modifier le document" onClick={() => window.location.href = `/editDoc/${id}`}><Icon.PencilSquare /></Button>
                </footer>
                </blockquote>
            </Card.Body>
        </Card>
    </>
  )
}
