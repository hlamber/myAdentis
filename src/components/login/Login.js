import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import logo from "../../images/MyAdentis - Blue.png";
import "./login.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      setError("La connexion du compte a échoué");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="login-component">
        <img src={logo} alt="logo" />
        <h4 className="text-center mb-4">Bienvenue sur MyAdentis</h4>
        <Card style={{ minWidth: "400px" }}>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <div className="w-100 text-center mb-4">
                <Link to="/forgot-password">Mot de passe oublié ?</Link>
              </div>
              <Button disabled={loading} className="w-100" type="submit">
                Se connecter
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Vous n'avez pas de compte ? <Link to="/signup">Inscrivez-vous !</Link>
        </div>
      </div>
    </>
  );
}
