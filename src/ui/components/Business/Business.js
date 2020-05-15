import React from "react";
import styled from "styled-components";

export const Business = ({ businessData }) => {
  return (
    <Container>
      {businessData.name} <br/>
      {businessData.description} <br/>
      {businessData.address}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
`;
