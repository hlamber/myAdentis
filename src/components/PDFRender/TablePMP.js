import { Text, View, StyleSheet } from '@react-pdf/renderer';
import React, { Fragment } from "react";
import "./PDFRender.css";
import { colors } from '@mui/material';

const styles = StyleSheet.create({
    table: {
        margin: '10px',
        textAlign: "center",
        // marginLeft: "auto",
        // marginRight: "auto",
      },
      row: {
        display: 'flex',
        flexDirection: 'row',
      },
      header: {
        // borderTop: 'none',
      },
      bold: {
        fontWeight: 'bold',
      },
      row1: {
        width: '50%',
        border: '1px solid black',
        padding: 5,
      },
      row2: {
        width: '100%',
        border: '1px solid black',
        padding: 5,
      },
      table_title: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: "#496AA2"
      },
      rep: {
        fontFamily: 'Avenir', 
      },
  });

export default function TablePMP({data, reponses}) {

    var section = data.filter(d => d.type === "section")
    var content1 = data.slice(1, data.indexOf(data.find((rep) => rep.intitule === "bilan Adentis")))
    var content2 = data.slice(data.indexOf(data.find((rep) => rep.intitule === "bilan Adentis")) + 1, data.indexOf(data.find((rep) => rep.intitule === "remarques")))
    var content3 = data.slice(data.indexOf(data.find((rep) => rep.intitule === "remarques")) + 1, data.length)

    return (
        <View style={styles.table}>
            <View style={[styles.row, styles.table_title]}>
                <Text style={styles.row1}>{section[0].intitule}</Text>
                <Text style={styles.row1}>{section[1].intitule}</Text>
            </View>
            {content1.map((row, i) => (
                <>
                    <View style={styles.row} wrap={false}>
                        <Text style={styles.row1}>{row.intitule} {"\n"} {"\n"} <Text style={styles.rep}>{reponses.find(r => r.positionChamp === row.position).intitule}</Text></Text>
                        <Text style={styles.row1}>{content2[i].intitule} {"\n"} {"\n"} <Text style={styles.rep}>{reponses.find(r => r.positionChamp === content2[i].position).intitule}</Text></Text>
                    </View>
                </>
            ))}
            <View style={[styles.row]}>
                <Text style={styles.row2}>{content3[0].intitule} {"\n"} {"\n"} <Text style={styles.rep}>{reponses.find(r => r.positionChamp === content3[0].position).intitule}</Text></Text>
            </View>
            <View style={[styles.row, styles.table_title]}>
                <Text style={styles.row2}>Merci de compléter ce Point Mensuel Projet et de le retourner avant le 20 de chaque mois à votre manager.</Text>
            </View>
      </View>
    )
}
