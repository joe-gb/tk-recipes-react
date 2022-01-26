import styled from "styled-components";
import { Link } from "react-router-dom";

export const ListItem = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  vertical-align: baseline;
  text-transform: unset;
  color: #4c5566;
  background-color: #eff2f7;
  margin: 2px 0px 2px 0px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const List = (i: Array<string>) => {
  const list = i.map((item, index) => (
    <ListItem key={index.toString()}>{item}</ListItem>
  ));
  return list;
};

interface LinkListItem {
  link: string;
  text: string;
}

export const LinkList = (i: Array<LinkListItem>) => {
  const list = i.map((item, index) => (
    <Link key={index.toString()} to={item.link}>
      <ListItem key={index.toString()}>{item.text}</ListItem>
    </Link>
  ));
  return list;
};
