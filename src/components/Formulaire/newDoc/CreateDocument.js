import { React, useEffect } from "react";
import Data from "./Data";
import { useNavigate } from "react-router-dom";
import checkDoc from "../../../utilities/checkDoc";
import "../Form.css";

export default function CreateDocument() {
  const navigate = useNavigate();
  useEffect(() => {
    checkDoc();
  });
  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="inegration">
      <Data></Data>

      <button className="retour" onClick={goBack}>
        retour à l'acceuil
      </button>
    </div>
  );
}
