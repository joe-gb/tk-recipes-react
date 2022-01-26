import React from "react";
import { render, screen } from "@testing-library/react";
import { LinkList, List } from "../List";
import { BrowserRouter as Router } from "react-router-dom";

test("List snapshot test", () => {
  let iterable = ["One", "Two", "Three", "Four", "Five"];
  let { container } = render(<>{List(iterable)}</>);
  expect(container).toMatchSnapshot();
  expect(container.textContent).toBe("OneTwoThreeFourFive");
});

test("LinkList snapshot test", () => {
  let iterable = [
    { link: "/url1/", text: "Link1" },
    { link: "/url2/", text: "Link2" },
  ];
  let { container } = render(<Router>{LinkList(iterable)}</Router>);
  expect(container).toMatchSnapshot();
  expect(container.textContent).toBe("Link1Link2");
});
