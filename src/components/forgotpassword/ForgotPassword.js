import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import "./forgotpassword.css";
import "../../index.css";
import logo from "../../images/MyAdentis - Blue.png";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Veuillez vérifier votre boite mail");
    } catch (error) {
      console.log(error);
      setError("La connexion du compte a échoué");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="forgotpassword-component">
        <img src={logo} alt="logo" />
        <Card style={{ minWidth: "400px" }}>
          <Card.Body>
            <h2 className="text-center">Mot de passe oublié</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <div className="w-100 text-center mt-4"></div>
              <Button disabled={loading} className="w-100" type="submit">
                Changer de mot de passe
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Se connecter</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Vous n'avez pas de compte ? <Link to="/signup">Inscrivez-vous !</Link>
        </div>
      </div>
    </>
  );
}
