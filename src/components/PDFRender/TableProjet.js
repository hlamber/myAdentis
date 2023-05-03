import { Text, View, StyleSheet } from '@react-pdf/renderer';
import React, { Fragment, useState } from "react";
import "./PDFRender.css";

const styles = StyleSheet.create({
    table: {
        margin: '10px',
      },
      row: {
        display: 'flex',
        flexDirection: 'row',
      },
      header: {
        backgroundColor: "#1E70B7",
        textAlign: 'center',
        color: "white",
      },
      bold: {
        fontWeight: 'bold',
      },
      row1: {
        border: '1px solid black',
        padding: 5,
        fontFamily: 'Avenir', 
        width: "100%",
      },
      row2: {
        border: '1px solid black',
        padding: 5,
        width: "100%",
      },
      row3: {
        border: '1px solid black',
        padding: 5,
        fontFamily: 'Avenir', 
        width: "70%",
      },
      sousSection: {
        fontSize: "12px",
        color: "#1E70B7",
        textAlign: "left",
        textDecoration: "underline"
      },
      rep: {
        fontFamily: 'Avenir', 
      }
  });

export default function TableProjet({data, res}) {

    var convertRes = ""
    if(res !== undefined){
      convertRes = res.intitule.split(";").map(pair => pair.split("-")); 
    }
    
    return (
        <>
        {[...Array(3)].map((row, numRow) => (
            <View style={styles.table}>
                <View style={[styles.header]}>
                    <Text style={styles.row1}>Projet {numRow + 1}</Text>
                </View>
                <View style={styles.row}>
                    <View style={{width: "30%"}}>
                        <View style={styles.row} wrap={false}>
                          {convertRes === ""
                            ? <Text style={styles.row2}>Client: <Text style={styles.rep}></Text></Text>
                            : <Text style={styles.row2}>Client: <Text style={styles.rep}>{convertRes[numRow][0]}</Text></Text>
                          }
                        </View>
                        <View style={styles.row} wrap={false}>
                          {convertRes === ""
                            ? <Text style={styles.row2}>Durée: <Text style={styles.rep}></Text></Text>
                            : <Text style={styles.row2}>Durée: <Text style={styles.rep}>{convertRes[numRow][1]}</Text></Text>
                          }
                        </View>
                        <View style={styles.row} wrap={false}>
                          {convertRes === ""
                            ? <Text style={styles.row2}>Missions réalisées: <Text style={styles.rep}></Text></Text>
                            : <Text style={styles.row2}>Missions réalisées: <Text style={styles.rep}>{convertRes[numRow][2]}</Text></Text>
                          }
                        </View>
                    </View>
                    <View style={{width: "70%"}}>
                        <Text style={styles.row2}>Comment as-tu perçu l'expérience ? 
                          {"\n"} (Réussite du projet, épanouissement personnel, délais respectés, satisfaction client, autonomie, nouvel environnement, etc.) {"\n"}
                          {convertRes === ""
                            ? <Text style={styles.rep}></Text>
                            : <Text style={styles.rep}>{convertRes[numRow][3]}</Text>
                          } 
                        </Text>
                    </View>
                </View>
            </View>
        ))}
        </>
    )
}