import React from "react";
import styled from "styled-components";
import { Audio } from "react-loader-spinner";

function LoadingPage() {
  return (
    <Container>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="#20bad2"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </Container>
  );
}

const Container = styled.div`
  height: 20vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default LoadingPage;
