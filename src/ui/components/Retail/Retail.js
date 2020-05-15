import React from "react";
import { BussinesGroup } from "../BusinessGroup/BusinessGroup";
import { Title } from "../Title/Title";
import { Container } from "./Retail.styles";

export const Retail = ({ tradeData }) => {
  return (
    <Container>
      <Title />
      <BussinesGroup tradeData={tradeData} />
    </Container>
  );
};
