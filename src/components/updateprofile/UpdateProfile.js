import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Card, Alert} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import './updateprofile.css';
import "../../index.css";
import logo from "../../images/MyAdentis - Blue.png";
import { updateUser } from '../../services/Users';
import { useSelector, useDispatch } from "react-redux";
import checkUser from '../../utilities/checkUser';

export default function UpdateProfile() {
    const emailRef = useRef();
    const nomRef = useRef();
    const prenomRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const infoUser = useSelector(state => state.user.infoUser);

    useEffect(() => {

        checkUser()

    }, [])

    function changesUser(){


        const json_load = {
          id : infoUser.id,
          nom : nomRef.current.value,
          prenom : prenomRef.current.value,
          email: emailRef.current.value,
          role : 1,
        }
    
        updateUser(json_load, infoUser.id)
      }

    function handleSubmit(e){
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Les mots de passe ne correspondent pas')
        }

        const promises = [];
        setLoading(true);
        setError('');
        if (emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value));
        }
        if (passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value));
        }

        changesUser()

        Promise.all(promises).then(() => {
            window.location.href = "/";
        }).catch(() => {
            setError('La modification du profil a échoué');
        }).finally(() => {
            setLoading(false);
        })
    }
    
  return (
    <>
        <div className="updateprofile-component" >
            <img src={logo} alt="logo" />
            <Card style={{ minWidth: "400px" }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Modifier le profil</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control type="name" ref={nomRef} defaultValue={infoUser.nom} />
                        </Form.Group>
                        <Form.Group id="firstname">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control type="firstname" ref={prenomRef}  defaultValue={infoUser.prenom} />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email}/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Laisser vide pour garder le même mot de passe"/>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Confirmation mot de passe</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required/>
                        </Form.Group>
                        <div className="w-100 text-center mt-4"></div>
                        <Button disabled={loading} className="w-100" type="submit">
                            Modifier
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Annuler</Link>
            </div>
        </div>
    </>
  )
}
