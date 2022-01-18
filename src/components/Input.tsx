import React from "react";
import styled from 'styled-components';
import { Text  } from "./Text"


export const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  vertical-align: baseline;
  text-transform: unset;
  margin: 20px auto;`

interface InputProps<T> extends React.InputHTMLAttributes<T>{
    error?: String | null,
    label?: String,
}

const InputError = styled(Text)`
  color: #EA3E3E;
  font-size: 12px;
`

const WrappedInput = ({className, error, label, ...props}: InputProps<any>) => (
    <div className={className}>
        {label &&
            <Label htmlFor={className}>{label}</Label>
        }
        <div>
            <input id={className} {...props} />
        </div>
        {error &&
            <InputError>{error}</InputError>
        }

    </div>
)

export const Input = styled(WrappedInput)`
  & {
    margin: 10px auto;
  }
  & div {
    align-items: center;
    width: 100%;
    min-height: 40px;
    z-index: initial;
    font-size: 16px;
    background: #FFFFFF;
    caret-color: auto;
    border: 1px solid ${props => props.error ? "#EA3E3E" : "#C9D3DF"};
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    transition: opacity 0.2s ease-in-out, border-color 0.2s ease-in-out;

    & div:hover {
      border-left: 1px solid #738094;
      border-right: 1px solid #738094;
      border-top: 1px solid #738094;
      border-bottom: 1px solid #738094;
    }

    & input {      
      height: 40px;
      box-sizing: border-box;
      width: 100%;
      padding: 0 14px;
      border-radius: 2px;
      line-height: 32px;
      font-size: 16px;
      border: none;
      color: #323B4D;
    }

    & input:focus {
      outline: none;
    }

  }

`;