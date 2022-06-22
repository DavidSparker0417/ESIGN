import React, { useEffect, useState } from "react";
import PDFViewer from "./components/PDFViewer";
import testPayload from "../../assets/payload.json";

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });

  return blob;
} 
const base64toBlob = (data) => {
  const bytes = atob(data);
  let length = bytes.length;
  let out = new Uint8Array(length);

  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }

  return new Blob([out], { type: "application/pdf" });
};

export default function EsignPage() {
  const [pdf, setPdf] = useState();

  useEffect(() => {
    console.log("[DAVID] testPayload :: ", testPayload);
    const doc = testPayload.documents[0];
    const blob = b64toBlob(doc.documentBase64, "application/pdf");
    const url = URL.createObjectURL(blob);
    const dinfo = {
      url: url,
      filename: doc.name
    };
    setPdf(dinfo);
    console.log("[DAVID] base64Response :: ", blob, dinfo);
  }, []);

  return(
  <>
    <PDFViewer pdf={pdf}/>
  </>)
}
