import { Text, View, StyleSheet } from '@react-pdf/renderer';
import React, { Fragment } from "react";
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
        // borderTop: 'none',
      },
      bold: {
        fontWeight: 'bold',
      },
      row1: {
        width: '30%',
        border: '1px solid black',
        padding: 5,
      },
      table_title: {
        textAlign: 'center',
        color: '#1D70B7',
      },
  });

export default function TablePDF({data, type}) {

    return (
        <View style={styles.table}>
            <View style={[styles.row, styles.table_title]}>
                {data.map((row, i) => (
                    <>
                        <Text style={styles.row1}>{row.desc}</Text>
                    </>
                ))}
            </View>
            {data.map((row, i) => (
                <>
                    <View style={styles.row} wrap={false}>
                        <Text style={styles.row1}>{row.desc2} </Text>
                    </View>
                    <View style={styles.row} wrap={false}>
                        <Text style={styles.row1}>{row.desc3} </Text>
                    </View>
                </>
            ))}
      </View>
    )
}
