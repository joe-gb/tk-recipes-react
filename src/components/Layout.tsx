import React, {useState} from "react";
import styled from 'styled-components';
import {Link} from "react-router-dom";

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  & * {
    width: 100%;
  }
`;


export const Container = styled.div`
  max-width: 850px;
  margin: 0 auto;
`

export const Header = styled.div`
  padding: 0px 20px;
  line-height: 80px;
  background: #0039b3;
  & svg.logo {
    width: 200px;
    height: 40px;
    vertical-align: middle;
  }
`

export const Nav = styled(Link)`
  display: inline-block;
  color: white;
  line-height: 80px;
  height: 80px;
  margin: 0 20px;

  &:hover {
    text-decoration: underline;
  }
`

const Hamburger = () => (
    <svg fill="white" viewBox="0 0 100 80" width="40" height="40">
        <rect width="100" height="10"></rect>
        <rect y="30" width="100" height="10"></rect>
        <rect y="60" width="100" height="10"></rect>
    </svg>)

const NavbarComponent = ({children, ...props}: React.HTMLAttributes<HTMLDivElement>) => {

    const [menu, setMenu] = useState(false);

    return (<>
        <div {...props}>
            <button onClick={() => setMenu(!menu)}>
                <Hamburger/>
            </button>
            <div className={(menu) ? "active" : ""}>
                {children}
            </div>
        </div>

    </>)

}
export const Navbar = styled(NavbarComponent)`
  
  display: inline-block;
  & button {
    display: none;
    position: absolute;
    right: 20px;
    top: 20px;
    height: 40px;
    width: 40px;
    float: right;
    border: 0;
    background: 0;
  }

  @media screen and (max-width: 800px) {
    & {
      display: block;
    }
    & div {
      display: none;
    }
    & div.active {
      display: block;
    }
    & div.active a {
      display: block;
      height: 100px;
      clear: left;
    }
    .topnav a.icon {
      float: right;
      display: block;
    }
    & button {
      display: block;
    }

  }
`
