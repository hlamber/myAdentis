import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import React from "react";
import arrow from "../../images/forward_arrow.png";
import * as Icon from "react-bootstrap-icons";

import "./PDFRender.css";

const styles = StyleSheet.create({
    table: {
        // width: '100%',
        margin: '10px',
      },
      row: {
        display: 'flex',
        flexDirection: 'row',
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: "22%",
        color: "#1E70B7",
        fontFamily: "Avenir",
      },
      bold: {
        fontWeight: 'bold',
      },
      // So Declarative and unDRY 👌
      row1: {
        width: '30%',
        border: '1px solid black',
        padding: 2,
        fontFamily: 'Avenir', 
      },
      row2: {
        width: '10%',
        border: '1px solid black',
        padding: 2,
        fontFamily: 'Avenir', 
      },
      row2Gray: {
        width: '10%',
        border: '1px solid black',
        padding: 2,
        fontFamily: 'Avenir', 
        backgroundColor: 'gray'
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
      arrow: {
        marginLeft: "20%",
      },
  });

export default function TableHistorique({data, res}) {

    var convertRes = ""
    if(res !== undefined){
      convertRes = res.intitule.split(";").map(pair => pair.split("-")); 
    }

    return (
      <>
        <View style={styles.table}>
          <View style={styles.header}>
            <Text style={{marginRight: "29%"}}>Il y a 1 an</Text>
            <Text style={{marginRight: "29%"}}>Mois 6</Text>
            <Text>Aujourd'hui</Text>
          </View>
          <Image style={styles.arrow} src={arrow}/>
          {[...Array(4)].map((row, numRow) => (
            <View style={styles.row} wrap={false}>
              {convertRes === ""
                ? <Text style={styles.row1}>Client: {"\n"}Poste: </Text>
                : <Text style={styles.row1}>Client: {convertRes[numRow][0]} {"\n"}Poste: {convertRes[numRow][1]}</Text>
              }
              {[...Array(12)].map((row, numCol) => (
                <>
                  {convertRes !== ""
                    ? 
                      <>
                        {numCol + 1 > 12 - convertRes[numRow][2] && numCol + 1 <= (12 - convertRes[numRow][2] + Number(convertRes[numRow][3]))
                          ? <Text style={styles.row2Gray}></Text>
                          : <Text style={styles.row2}></Text>
                        }
                      </>
                    : <Text style={styles.row2}></Text>
                  }
                </>
              ))}
            </View>
          ))}
        </View>
        </>
    )
}