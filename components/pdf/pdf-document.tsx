import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { TextSourceProps } from '../TextSource';
var pdfUtil = require('../../util/pdf-util');

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    margin: 12,
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Times-Roman'
  }
});

const MyDocument: React.FC<{ textSource: TextSourceProps[] }> = ({ textSource }) => {
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