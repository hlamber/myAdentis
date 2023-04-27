import { Document, Page, Text, View, StyleSheet, PDFViewer, Image, Font } from '@react-pdf/renderer';
import logo from "../../images/logo-adentis.png";
import img_couverture from "../../images/img_couverture.png";
import React, { Fragment } from "react";
import RenderCouverture from "./RenderCouverture"
import TablePDF from './TablePDF';
import * as Icon from "react-bootstrap-icons";
import "./PDFRender.css";
import TableAppreciation from './TableAppreciation';
import TableNotation from './TableNotation';
import TablePMP from './TablePMP';
import LogoCooptation from "../../images/logo-cooptation.png";
import TableFormation from './TableFormation';

Font.register({
  family: 'Avenir',
  fonts: [
  // { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
  { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf'}
  ]
  });

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    flexDirection: "column",
    padding: "5%"
  },
  logo: {
    width: "150px",
    marginLeft: "75%",
    marginBottom: "10px",
  },
  ref: {
    marginRight: "75%",
    marginTop: "-40px"
  },
  pagination: {
    color: "#1D70B7",
    fontSize: "11px",
    position: "absolute",
    bottom: "5",
    right: "53%",
  },
  checkbox: {
    flexDirection: "row",
  },
  section: {
    fontSize: "20px",
    color: "#1E70B7",
    textAlign: "left",
    fontFamily: "Avenir",
  },
  sousSection: {
    fontSize: "12px",
    color: "#1E70B7",
    textAlign: "left",
    textDecoration: "underline"
  },
  sectionPAP: {
    backgroundColor: "#01487C",
    color: "white",
    fontSize: "25px",
    fontFamily: "Avenir",
    textAlign: "center",
    paddingBottom: "28px",
    paddingTop: "18px",
    marginBottom: "10px",
    marginLeft: "-6%",
    marginRight: "-6%",
    marginTop: "-8%"
  },
  sectionPAP2: {
    backgroundColor: "#01487C",
    color: "white",
    fontSize: "20px",
    fontFamily: "Avenir",
    paddingBottom: "20px",
    paddingTop: "10px",
    paddingLeft: "20px",
    marginBottom: "10px",
    marginLeft: "-6%",
    marginRight: "-6%",
  },
  rep: {
    fontFamily: 'Avenir', 
  },

})


export default function PDFRender({data, reponses}){  
  
  function renderSwitch(param, intitule, position, propositionDeReponse, criteresAppreciation){
    switch(param) {
      case 'section':
        return (
          <>
            {reponses[0].champ.document.slug === "pap"
              ? <Text style={styles.sectionPAP2}>{intitule.toUpperCase()}</Text>
              : <Text style={styles.section}>{intitule.toUpperCase()}</Text>
            }
          </>
          
        );
      case 'sous section':
        return (
          <>
            <Text style={styles.sousSection}>{intitule}</Text>
            <Text>{"\n"}</Text>
          </>    
        );
      case 'choix multiples':
        if(reponses.find(r => r.positionChamp === position) !== undefined){
          var res = reponses.find(r => r.positionChamp === position).intitule.split("-")          
          return (
            <>
              <Text>{intitule} : </Text>
              <div style={styles.checkbox}>
                {propositionDeReponse.map((prop, index) => {
                  return (
                    <>
                      {res.includes(prop)
                        ? <Text style={styles.rep}><Image src="https://cdn-icons-png.flaticon.com/512/2440/2440972.png"></Image> {prop} </Text>
                        : <Text><Image src="https://cdn-icons-png.flaticon.com/128/7794/7794657.png"></Image> {prop} </Text>
                        }
                    </>
                  )
                })}
                
              </div>
              <Text>{"\n"}</Text>
            </>
          );
        }
        else{
          return(
            <>
              <Text>{intitule} : </Text>
              <div style={styles.checkbox}>
                {propositionDeReponse.map((prop, index) => {
                  return (
                    <>
                      <Text><Image src="https://cdn-icons-png.flaticon.com/128/7794/7794657.png"></Image> {prop} </Text>
                    </>
                  )
                })}
              </div>
            </>
          )
        }
      case "tableau d'appreciation":
        return (
          <>
            <Text>{intitule} : </Text>
            <TableAppreciation data={criteresAppreciation} type={param} res={reponses.find(r => r.positionChamp === position)}/>
          </>
        );
      case "notation":
        return (
          <>
            <Text>{intitule} : </Text>
            <TableNotation type={param} res={reponses.find(r => r.positionChamp === position)}/>
          </>
        )
      default:
        return (
          <>
            <Text>{intitule} : </Text>
            {reponses.find(r => r.positionChamp === position) !== undefined
              ? 
                <>
                  <Text style={styles.rep}>{reponses.find(r => r.positionChamp === position).intitule}</Text>
                </ >
              : <></ >
            }
            <Text>{"\n"}</Text>  
          </>
        );
    }  
  }

  // on skip l'affichage des infos generales dans le contenu du document en fonction du document
  var fieldsToDisplay = [];
  var fieldsToDisplay2 = [];
  if(reponses[0] !== undefined){
    switch(reponses[0].champ.document.slug){
      case "suivi-integration-1-mois":
        fieldsToDisplay = data.slice(data.indexOf(data.find((field) => field.intitule === "retour à froid sur le recrutement")), data.length);
        break;

      case "suivi-integration-3-mois":
      case "suivi-integration-6-mois":
        fieldsToDisplay = data.slice(data.indexOf(data.find((field) => field.intitule === "situation actuelle")), data.length);
        break;
      case "pmp":
        fieldsToDisplay = data.slice(data.indexOf(data.find((field) => field.intitule === "bilan projet")), data.length);
        break;
      case "pap":
        fieldsToDisplay = data.slice(1, data.length);
        break;
      case "bilan-intermediaire":
        fieldsToDisplay = data.slice(data.indexOf(data.find((field) => field.intitule === "situation actuelle")), data.indexOf(data.find((field) => field.intitule === "Formation 1")));
        fieldsToDisplay2 = data.slice(data.indexOf(data.find((field) => field.intitule === "En quoi te permettraient-elles d'atteindre ton projet professionnel ?")), data.length);
        break;
    }
  }
    
  function renderCouverture(document, reponses){
    switch(reponses[0].champ.document.slug) {
      case "pap": 
        return(
          <>
            <View>
              <Text style={styles.sectionPAP}>POINT D'AVANCEMENT PROJET</Text>
              {fieldsToDisplay.map((field, index) => {
                return (
                  <>
                    {renderSwitch(field.type, field.intitule, field.position, field.propositionDeReponse, field.criteresAppreciation)}
                  </>
                )
              })}
            </View>
            <Image src={logo} style={{width: "100px", marginRight: "75%", marginTop: "10px",}} fixed />
            <Text style={{marginLeft: "75%", marginTop: "-30px"}} fixed>Référence : PR3-FOR-01 Version : 2</Text>
          </>
        )
        break;
      case "pmp": 
        return(
          <>
            <Image src={logo} style={styles.logo} fixed />
            <Text style={styles.ref} fixed>Référence : PR3-FOR-04 V2</Text>
            <RenderCouverture document={document} reponses={reponses}></RenderCouverture>
            <View break>
              <TablePMP data={fieldsToDisplay} reponses={reponses}></TablePMP>
              <Text style={{textAlign: "center", color: "#1E70B7"}}>Vous avez dans votre entourage quelqu'un qui pourrait rejoindre l'aventure Adentis ? {"\n"} Parlez-lui de nous !</Text>
              <Text>{"\n"}</Text>
              <Text>Pour rappel, coopter c'est recommander un ami, une personne de sa famille ou un collègue de travail qui recherche de nouvelles opportunités professionnelles. Pour nous mettre en contact, c'est très simple il suffit d'envoyer un CV à son manager ou à la responsable recrutement. Adentis s'occupe du reste !</Text>
              <Text>{"\n"}</Text>
              <Image style={{width: "100px", marginLeft: "auto", marginRight: "auto"}} src={LogoCooptation}></Image>
            </View>
          </>        
        )
        break;
      case "bilan-intermediaire":
        return(
          <>
            <Image src={logo} style={styles.logo} fixed />
            <RenderCouverture document={document} reponses={reponses}></RenderCouverture>
            <View break>
              {fieldsToDisplay.map((field, index) => {
                return (
                  <>
                    {renderSwitch(field.type, field.intitule, field.position, field.propositionDeReponse, field.criteresAppreciation)}
                  </>
                )
              })}
              <TableFormation data={data} reponses={reponses}></TableFormation>
              {fieldsToDisplay2.map((field, index) => {
                return (
                  <>
                    {renderSwitch(field.type, field.intitule, field.position, field.propositionDeReponse, field.criteresAppreciation)}
                  </>
                )
              })}
            </View>
          </>        
        )
        break;
      default: 
        return(
          <>
            <Image src={logo} style={styles.logo} fixed />
            <RenderCouverture document={document} reponses={reponses}></RenderCouverture>
            <View break>
              {fieldsToDisplay.map((field, index) => {
                return (
                  <>
                    {renderSwitch(field.type, field.intitule, field.position, field.propositionDeReponse, field.criteresAppreciation)}
                  </>
                )
              })}
            </View>
          </>        
        )
    }
  }

    return (
      <div>
        <PDFViewer width="100%" height="950px">
          <Document>
            <Page size="A4" style={styles.page}>
              {reponses[0] !== undefined && renderCouverture(reponses[0].champ.document, reponses)}
              <Text style={styles.pagination} render={({ pageNumber, totalPages }) => (
                `${pageNumber} / ${totalPages}`
              )} fixed />
            </Page>
          </Document>
        </PDFViewer>
      </div>
    )
  }