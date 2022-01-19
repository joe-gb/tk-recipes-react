import React from "react";
import styled from "styled-components";

const Loader = styled.div`
  text-align: center;
  box-sizing: border-box;
  margin: 0 auto;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 4px solid;
  border-color: #144fcc #144fcc rgba(20, 79, 204, 0.30000000000000004)
    rgba(20, 79, 204, 0.30000000000000004);
  -webkit-animation: spin 0.8s infinite linear;
  animation: spin 0.8s infinite linear;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
