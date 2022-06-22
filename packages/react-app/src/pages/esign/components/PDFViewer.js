import { Box, Button, Grid, styled, Typography } from "@mui/material";
import nstyled from "styled-components";
import { useState } from "react";
import { Document, Page } from "react-pdf";

import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

export default function PDFViewer({ pdf }) {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    console.log("[PDF] document load success :: pages = ", numPages);
    setTotalPages(numPages);
  }

  function onHandlePageNumber(num) {
    if (num === 0 || num > totalPages) return;
    setCurrentPage(num);
  }

  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {pdf && (
        <Document file={pdf.url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={currentPage} />
        </Document>
      )}
      <Grid container alignItems="center">
        <Grid item xs={3} pl={2} overflow="hidden">
          <Typography>{pdf?.filename}</Typography>
        </Grid>
        <Grid item xs={6} container justifyContent="center" alignItems="center">
          <Button onClick={() => onHandlePageNumber(currentPage - 1)}>
            Prev
          </Button>
          <Typography mx={2}>{currentPage}</Typography>
          <Button onClick={() => onHandlePageNumber(currentPage + 1)}>
            Next
          </Button>
        </Grid>
        <Grid item xs={3} pr={2} justifyContent="end">
          <Typography textAlign="end">Page 1-{totalPages} </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
