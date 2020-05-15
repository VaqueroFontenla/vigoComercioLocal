import React from "react";
import styled from "styled-components";
import { Business } from "../Business/Business";

export const BussinesGroup = ({ tradeData }) => {
  return (
    <Container>
      {tradeData &&
        tradeData.map((business) => <Business businessData={business} />)}
    </Container>
  );
};

const Container = styled.div`
  overflow-y: scroll;
`;
