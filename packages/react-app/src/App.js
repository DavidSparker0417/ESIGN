import React, { useEffect, useState } from "react";
import { Body, Button, Container, Header } from "./components";
import WalletButton from "./components/WalletButton";
import EsignPage from "./pages/esign";

function App() {
  return (
    <Container>
      <Header>
        <WalletButton />
      </Header>
      <EsignPage />
    </Container>
  );
}

export default App;
