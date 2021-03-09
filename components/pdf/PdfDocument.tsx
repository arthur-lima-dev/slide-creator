import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { TextSourceProps } from '../TextSource';
var pdfUtil = require('../../util/pdf-util');

export class PdfStyleSheet {
  constructor(
    public fontColor: string,
    public fontSize: number,
    public fontFamily: string,
    public backgroundColor: string) {

  }
}

const initStyleSheet = (pdfStyleSheet) => {
  return StyleSheet.create({
    page: {
      backgroundColor: pdfStyleSheet?.backgroundColor ? pdfStyleSheet?.backgroundColor : 'black',
      justifyContent: 'center'
    },
    text: {
      color: pdfStyleSheet?.fontColor ? pdfStyleSheet?.fontColor : 'white',
      margin: 12,
      fontSize: pdfStyleSheet?.fontSize ? pdfStyleSheet?.fontSize : 35,
      textAlign: 'center',
      fontFamily: pdfStyleSheet?.fontFamily ? pdfStyleSheet?.fontFamily : 'Times-Roman'
    }
  })
}

const MyDocument: React.FC<{ textSource: TextSourceProps[], pdfStyleSheet?: PdfStyleSheet }> = ({ textSource, pdfStyleSheet }) => {
  const styles = initStyleSheet(pdfStyleSheet);
  const documentSource = pdfUtil.generateSourceMultiplePDF(textSource, '\n\n');
  
  return (
    <Document>
      {documentSource.map((text, index) => {
        return (
          <Page key={`page${index}`} orientation='landscape' size="A5" style={styles.page}>
            <View>
              <Text style={styles.text}>{text}</Text>
            </View>
          </Page>
        )
      })}
    </Document>
  );
};

export default MyDocument