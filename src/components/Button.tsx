import styled from "styled-components";
import React from "react";

export const Button = styled.button`
  && {
    display: block;
    text-decoration: none;
    width: 100%;
    margin: 20px auto;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    line-height: 18px;
    user-select: none;
    color: #fff;
    border-radius: 8px;
    background: #003097;
    border: 1px solid #003097;
    padding: 19px;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: all 0.175s ease-in-out;

    &:hover {
      background-color: #144fcc;
      border: 1px solid #144fcc;
    }
  }
`;

export const NeutralButton = styled(Button)`
  && {
    background: transparent;
    border-color: #9eabbe;
    color: #144fcc;

    &:hover {
      background-color: transparent;
      border: 1px solid #144fcc;
    }
  }
`;

export const WarningButton = styled(Button)`
  && {
    background: transparent;
    border-color: #003097;
    color: #003097;
  }
`;

const SvgCrossButton = (props: React.ButtonHTMLAttributes<any>) => (
  <button {...props}>
    <svg data-testid="svg-cross" viewBox="0 0 24 24" width="1em" height="1em">
      <path
        fillRule="evenodd"
        d="M13.414 12l4.293 4.293a1 1 0 01-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 11-1.414-1.414L10.586 12 6.293 7.707a1 1 0 011.414-1.414L12 10.586l4.293-4.293a1 1 0 011.414 1.414L13.414 12z"
      ></path>
    </svg>
  </button>
);

export const CrossButton = styled(SvgCrossButton)`
  && {
    
    z-index: 1;
    margin: 5px;
    background: white;
    border: 1px solid #C9D3DF;
    box-sizing: border-box;
    box-shadow: 0px 1px 2px rgb(0 0 0 / 8%);
    border-radius: 4px;
    padding: 4px;
    height: 32px;
    width: 32px;
    &:hover {
      cursor: pointer;
      border: 1px solid #9EABBE;
      box-shadow: 0px 0px 0px 1px rgb(50 50 93 / 5%), 0px 2px 6px rgb(50 50 93 / 8%);
    }
    & svg {
      fill: #4C5566;
      color: #4C5566;
      vertical-align: middle;
      font-size: 24px;
      & path {
        fill: #4C5566;
      }

    }
`;
