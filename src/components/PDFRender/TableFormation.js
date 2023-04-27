import { Text, View, StyleSheet } from '@react-pdf/renderer';
import React, { Fragment, useState } from "react";
import "./PDFRender.css";

const styles = StyleSheet.create({
    table: {
        // width: '100%',
        margin: '10px',
      },
      row: {
        display: 'flex',
        flexDirection: 'row',
        // border: '1px solid black',
      },
      header: {
        // borderTop: 'none',
      },
      bold: {
        fontWeight: 'bold',
      },
      // So Declarative and unDRY 👌
      row1: {
        width: '30%',
        border: '1px solid black',
        padding: 5,
        fontFamily: 'Avenir', 
      },
      table_title: {
        textAlign: 'center',
        color: '#1D70B7',
      },
      sousSection: {
        fontSize: "12px",
        color: "#1E70B7",
        textAlign: "left",
        textDecoration: "underline"
      },
  });

export default function TableFormation({data, reponses}) {

    var tab1 = data.slice(data.indexOf(data.find((rep) => rep.intitule === "Formation 1")) + 1, data.indexOf(data.find((rep) => rep.intitule === "Formation 2")))
    var tab2 = data.slice(data.indexOf(data.find((rep) => rep.intitule === "Formation 2")) + 1, data.indexOf(data.find((rep) => rep.intitule === "Formation 3")))
    var tab3 = data.slice(data.indexOf(data.find((rep) => rep.intitule === "Formation 3")) + 1, data.indexOf(data.find((rep) => rep.intitule === "Quelles formations t'intéressent ?")))

    var tab4 = data.slice(data.indexOf(data.find((rep) => rep.intitule === "Quelles formations t'intéressent ?")) + 2, data.indexOf(data.find((rep) => rep.intitule === "Quelles formations t'intéressent ?")) + 4)
    var tab5 = data.slice(data.indexOf(data.find((rep) => rep.intitule === "Quelles formations t'intéressent ?")) + 5, data.indexOf(data.find((rep) => rep.intitule === "Quelles formations t'intéressent ?")) + 7)
    var tab6 = data.slice(data.indexOf(data.find((rep) => rep.intitule === "Quelles formations t'intéressent ?")) + 8, data.indexOf(data.find((rep) => rep.intitule === "Quelles formations t'intéressent ?")) + 10)

    var infoTab = ["Formations","Date de la formation","Certifications"]
    var infoTab2 = ["Formations","Certifications"]

    return (
        <>
        <View style={styles.table}>
            <View style={[styles.row, styles.table_title]}>
                {infoTab.map((app, i) => (
                    <>
                        <Text style={styles.row1}>{app}</Text>
                    </>
                ))}
            </View>
            <View style={styles.row} wrap={false}>
                {tab1.map((app, i) => (
                    <>           
                        <Text style={styles.row1}>{reponses.find(r => r.positionChamp === app.position).intitule}</Text>     
                    </>
                ))}
            </View>
            <View style={styles.row} wrap={false}>
                {tab2.map((app, i) => (
                    <>           
                        <Text style={styles.row1}>{reponses.find(r => r.positionChamp === app.position).intitule}</Text>     
                    </>
                ))}
            </View>
            <View style={styles.row} wrap={false}>
                {tab3.map((app, i) => (
                    <>           
                        <Text style={styles.row1}>{reponses.find(r => r.positionChamp === app.position).intitule}</Text>     
                    </>
                ))}
            </View>
        </View>

        <Text style={styles.sousSection}>Quelles formations t'intéressent ?</Text>
        <Text>{"\n"}</Text>

        <View style={styles.table}>
            <View style={[styles.row, styles.table_title]}>
                {infoTab2.map((app, i) => (
                    <>
                        <Text style={styles.row1}>{app}</Text>
                    </>
                ))}
            </View>
            <View style={styles.row} wrap={false}>
                {tab4.map((app, i) => (
                    <>           
                        <Text style={styles.row1}>{reponses.find(r => r.positionChamp === app.position).intitule}</Text>     
                    </>
                ))}
            </View>
            <View style={styles.row} wrap={false}>
                {tab5.map((app, i) => (
                    <>           
                        <Text style={styles.row1}>{reponses.find(r => r.positionChamp === app.position).intitule}</Text>     
                    </>
                ))}
            </View>
            <View style={styles.row} wrap={false}>
                {tab6.map((app, i) => (
                    <>           
                        <Text style={styles.row1}>{reponses.find(r => r.positionChamp === app.position).intitule}</Text>     
                    </>
                ))}
            </View>
        </View>
        </>
    )
}
