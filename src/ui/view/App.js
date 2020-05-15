import React, { useEffect, useState } from "react";
import * as service from "../../core/service";
import { Container } from "./App.styles";
import { Map } from "../components/Map/Map";
import { Retail } from "../components/Retail/Retail";
const App = () => {
  const [tradeData, setTradeData] = useState()
  useEffect(() => {
    loadRecords();
  }, []);

  return (
    <Container>
      <Retail tradeData={tradeData}/>
      <Map tradeData={tradeData}/>
    </Container>
  );

  async function loadRecords() {
    const result = await service.getAllRecords();
    setTradeData(result)
  }
};

export default App;
