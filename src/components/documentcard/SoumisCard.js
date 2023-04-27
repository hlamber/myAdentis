import React from 'react';
import { Card, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useSelector } from "react-redux";
import './Card.css';

export default function SoumisCard({id, title, type, prenom, date}) {

    const infoUser = useSelector(state => state.user.infoUser);

    return (
        <>
            <Card style={{ maxWidth: "400px" }}>
                <Card.Header><strong>{type}</strong></Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0" style={{ fontSize: "1em" }}>
                    <p>{title}</p>
                    <h4>{prenom}</h4>
                    <footer className="blockquote-footer" >
                        Soumis le : <cite title="Source Title">{date}</cite>
                        {infoUser.role >= 1 
                            ? <Button className='icon' type="button" onClick={() => window.location.href=`/editDoc/${id}` }><Icon.PencilSquare/></Button>
                            : <></>
                        }
                    </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        </>
    )
}