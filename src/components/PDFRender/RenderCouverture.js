import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import logo from "../../images/logo-adentis.png";
import img_couverture from "../../images/img_couverture.png";
import React, { Fragment } from "react";
import TablePDF from './TablePDF';
import "./PDFRender.css";

const styles = StyleSheet.create({
    logo: {
      width: "150px",
      marginLeft: "75%"
    },
    img_couverture: {
      margin: "30px"
    },
    title: {
      fontSize: "30px",
      color: "#1D70B7",
      textAlign: "center",
      marginTop: "50px"
    },
    detail_couverture: {
      border: '1px solid #1D70B7',
      margin: "30px",
      padding: "10px"
    },
    text_couverture: {
      marginLeft: "20px",
      fontWeight: "bold"
    },
  });

const data =
    [
      {
        desc: "Suivi à 1 mois",
        desc2: "Le:",
        desc3: "Manager:",
      },
    ]

const RenderCouverture = ({document, reponses}) => {
  var infosGenerales = [];
  // recuperation des champs/reponses de la partie informations generales en fonction du type du document
  switch(document.slug){
    case "suivi-integration-1-mois":
      infosGenerales = reponses.slice(1, reponses.indexOf(reponses.find((rep) => rep.champ.intitule === "retour à froid sur le recrutement")));
      break;
    
    case "suivi-integration-3-mois":
    case "suivi-integration-6-mois":
      infosGenerales = reponses.slice(1, reponses.indexOf(reponses.find((rep) => rep.champ.intitule === "situation actuelle")));
      break;
    case "pmp":
      infosGenerales = reponses.slice(1, reponses.indexOf(reponses.find((rep) => rep.champ.intitule === "bilan projet")));
      break;
    case "bilan-intermediaire":
      infosGenerales = reponses.slice(1, reponses.indexOf(reponses.find((rep) => rep.champ.intitule === "situation actuelle")));
      break;
  }

  // formatage de la date de soumission du document
  var dateSoumissionFormatted = "";
  if(reponses[0].soumission.dateDeSoumission !== null){
    var dateSoumissionJJMMAAAA = reponses[0].soumission.dateDeSoumission.split("T")[0].split("-");
    // on met la date au format jj/mm/aaaa
    dateSoumissionFormatted = `${dateSoumissionJJMMAAAA[2]}/${dateSoumissionJJMMAAAA[1]}/${dateSoumissionJJMMAAAA[0]}`
  }

  return(
    <>
      <View>
        {/* <Image style={styles.logo} src={logo} alt="logo" /> */}
        <Text style={styles.title}>{document.intitule}</Text>
        <Image style={styles.img_couverture} src={img_couverture} alt="logo" />
      </View>
      <View style={styles.detail_couverture}>
        {infosGenerales.map((item) => <Text style={styles.text_couverture}>{item.champ.intitule}: <Text style={{fontFamily: "Avenir"}}>{item.intitule}</Text></Text>)}
        <Text style={styles.text_couverture}>Date du suivi: <Text style={{fontFamily: "Avenir"}}>{dateSoumissionFormatted}</Text> </Text>
      </View>
    </>
  );
    
}

export default RenderCouverture
