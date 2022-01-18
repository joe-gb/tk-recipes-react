import React from "react";
import styled from 'styled-components';


export const Messagebox = styled.div`
  & {
    background: #FFFFFF;
    border-radius: 4px;
    border: 1px solid #fff;
    border-left: 4px solid #144FCC;
    padding: 0px 20px;

    & h3 {
      margin: 20px auto;
      color: #003097;
    }

    & p {
      margin: 20px auto;
      font-size: 14px;
      font-weight: 400;
      color: #1D2C3C;
    }
  }
`;


export const Successbox = styled(Messagebox)`
  & {
    background: #E5FFF4;
    border: 1px solid #E5FFF4;
    border-radius: 4px;
    border-left: 0px;
    & h3 {
      font-size: 16px;
      font-weight: 600;
      color: #000000CC;
    }
  }
`;


export const Errorbox = styled(Successbox)`
  & {
    background: #FFE5E5;
    border: 1px solid #FFE5E5;
  }
`;
