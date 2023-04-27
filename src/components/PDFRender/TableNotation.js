import { Text, View, StyleSheet } from '@react-pdf/renderer';
import React, { Fragment, useState } from "react";
import "./PDFRender.css";
import { green } from '@mui/material/colors';

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
        color: "black"
      },
      table_title: {
        textAlign: 'center',
        color: '#1D70B7',
      },
  });

export default function TableNotation({type, res}) {

  if(type == "notation"){
    var appreciation = 
      [
          {nb:1, color: "#FF001B"},
          {nb:2, color: "#FF3317"},
          {nb:3, color: "#FF6606"},
          {nb:4, color: "#FF9933"},
          {nb:5, color: "#FFCD66"},
          {nb:6, color: "#FFED67"},
          {nb:7, color: "#FFFE50"},
          {nb:8, color: "#DCFE11"},
          {nb:9, color: "#CBED01"},
          {nb:10, color: "#92D050"},
      ]

    if(res !== undefined){
      var result = res
    }
  }
   var test = "green"


    return (
        <View style={[styles.table]}>
            <View style={[styles.row, styles.table_title]}>
                {appreciation.map((app, i) => (
                    <>
                        <Text style={[{backgroundColor: app.color}, styles.row1]}>{app.nb}</Text>
                    </>
                ))}
            </View>
            <View style={styles.row} wrap={false}>
                {appreciation.map((app, i) => (
                    <>
                      {result !== undefined
                        ? 
                            <>
                                {Number(res.intitule) === i + 1
                                    ? <Text style={[{backgroundColor: app.color}, styles.row1]}>X</Text>
                                    : <Text style={[{backgroundColor: app.color}, styles.row1]}></Text>
                                }
                            </>
                        : <></>
                      }
                    </>
                ))}
            </View>
        </View>
    )
}
