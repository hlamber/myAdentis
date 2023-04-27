import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Dropdown,
  DropdownButton,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import "./header.css";
import { useSelector } from "react-redux";
import logo from "../../images/My Adentis - White.png";

export default function Header() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const infoUser = useSelector((state) => state.user.infoUser);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("La déconnexion du compte a échoué");
    }
  }
  return (
    <>
      <Navbar style={{ backgroundColor: "rgb(1, 72, 124)" }}>
        <Container>
          <Navbar.Brand className="col-nav">
            <h3>Tableau de bord</h3>
          </Navbar.Brand>
          <div className="col-nav"> 
            <img src={logo} alt="" className="dashImg" />
            <h3 className="user-profil">Salut {infoUser.prenom} 👋</h3>
          </div>
          <Navbar.Toggle />
          <Navbar.Collapse className="col-nav">
            <DropdownButton
              id="dropdown-item-button"
              title={
                <span>
                  <Icon.List />
                </span>
              }
            >
              <Dropdown.ItemText>{currentUser.email}</Dropdown.ItemText>
              <Dropdown.Item as="Link">
                <Link to="/update-profile">Modifier le profil</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as="button">
                <Button variant="link" onClick={handleLogout}>
                  Se déconnecter
                </Button>
              </Dropdown.Item>
            </DropdownButton>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
