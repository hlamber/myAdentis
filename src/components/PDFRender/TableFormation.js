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

export default function TableFormation({data, res}) {

    var convertRes = ""
    if(res !== undefined){
      convertRes = res.intitule.split(";").map(pair => pair.split("-")); 
    }
    
    return (
        <>
        <View style={styles.table}>
            <View style={[styles.row, styles.table_title]}>
                {data.map((app, i) => (
                    <>
                        <Text style={styles.row1}>{app}</Text>
                    </>
                ))}
            </View>
            {[...Array(3)].map((row, numRow) => (
                <View style={styles.row} wrap={false}>
                    {[...Array(data.length)].map((col, numCol) => (
                        <>
                            {convertRes.length !== 1 && convertRes.length !== 0
                              ? <Text style={styles.row1}>{convertRes[numRow][numCol]}</Text>
                              : <Text style={styles.row1}></Text>
                            }
                            
                        </>
                    ))}
                </View>
             ))}
        </View>
        </>
    )
}
