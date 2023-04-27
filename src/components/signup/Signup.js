import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { auth } from "../../firebase";
import { sendEmailVerification } from "firebase/auth";
import "./signup.css";
import logo from "../../images/MyAdentis - Blue.png";
import { createUser } from '../../services/Users';

export default function Signup() {
  const emailRef = useRef();
  const nomRef = useRef();
  const prenomRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function newUser(){

    const json_load = {
      nom : nomRef.current.value,
      prenom : prenomRef.current.value,
      email: emailRef.current.value,
      role : 0,
    }

    createUser(json_load)
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      // newUser();
      return setError("Les mots de passe ne correspondent pas");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      sendEmailVerification(auth.currentUser);
      newUser();
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("L'inscription du compte a échoué");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="signup-component">
        <img src={logo} alt="logo" />
        <Card style={{ minWidth: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Création du compte</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="name">
                <Form.Label>Nom</Form.Label>
                <Form.Control type="name" ref={nomRef} required />
              </Form.Group>
              <Form.Group id="firstname">
                <Form.Label>Prénom</Form.Label>
                <Form.Control type="firstname" ref={prenomRef} required />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Confirmation mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <div className="w-100 text-center mt-4"></div>
              <Button disabled={loading} className="w-100" type="submit">
                S'incrire
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Vous avez déjà un compte ? <Link to="/login">Connectez-vous !</Link>
        </div>
      </div>
    </>
  );
}
