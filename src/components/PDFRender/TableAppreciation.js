import { Text, View, StyleSheet } from '@react-pdf/renderer';
import React, { Fragment, useState } from "react";
import "./PDFRender.css";
import { colors } from '@mui/material';

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
        textAlign: 'center',
        fontFamily: 'Avenir', 
      },
      row2: {
        width: '20%',
      },
      row3: {
        width: '20%',
      },
      row4: {
        width: '20%',
      },
      row5: {
        width: '20%',
      },
      table_title: {
        textAlign: 'center',
        color: '#1D70B7',
      },
  });

export default function TableAppreciation({data, type, res}) {

  if(type == "tableau d'appreciation"){
    var appreciation = [
      {
        desc: "Pas du tout satisfaisant",
      },
      {
        desc: "Peu satisfaisant",
      },
      {
        desc: "Moyennement satisfaisant",
      },
      {
        desc: "Satisfaisant",
      },
      {
        desc: "Très satisfaisant",
      }
    ]

    if(res !== undefined){
      var result = res.intitule.split('-')
      if(result.slice(-1)[0] === ""){
        result.pop()
      }
    }
}


    return (
        <View style={styles.table}>
            <View style={[styles.row, styles.table_title]}>
                <Text style={styles.row1}></Text>
                {appreciation.map((app, i) => (
                    <>
                        <Text style={styles.row1}>{app.desc}</Text>
                    </>
                ))}
            </View>
            {data.map((row, i) => (
                <>  
                    <View style={styles.row} wrap={false}>
                      <Text style={styles.row1}>{row}</Text>

                      {appreciation.map((app, i) => (
                        <>
                          {result !== undefined
                            ? <>
                                {result.find(r => r === row + ":" + app.desc)
                                  ? <Text style={styles.row1}>X</Text>
                                  : <Text style={styles.row1}></Text>
                                }
                              </>
                            : <></>
                          }
                        </>
                      ))}
                    </View>
                </>
            ))}
      </View>
    )
}
