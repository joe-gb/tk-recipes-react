import React from "react";
import styled from "styled-components";

export const Messagebox = styled.div`
  & {
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #fff;
    border-left: 4px solid #144fcc;
    padding: 0px 20px;

    & h3 {
      margin: 20px auto;
      color: #003097;
    }

    & p {
      margin: 20px auto;
      font-size: 14px;
      font-weight: 400;
      color: #1d2c3c;
    }
  }
`;

export const Successbox = styled(Messagebox)`
  & {
    background: #e5fff4;
    border: 1px solid #e5fff4;
    border-radius: 4px;
    border-left: 0px;
    & h3 {
      font-size: 16px;
      font-weight: 600;
      color: #000000cc;
    }
  }
`;

export const Errorbox = styled(Successbox)`
  & {
    background: #ffe5e5;
    border: 1px solid #ffe5e5;
  }
`;
