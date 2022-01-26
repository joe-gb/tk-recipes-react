import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Nav, Navbar } from "../Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { within } from "@testing-library/dom";

test("Test mobile burger menu", () => {
  const { container } = render(
    <Router>
      <Navbar>
        <Nav to="/">One</Nav>
        <Nav to="/">Two</Nav>
        <Nav to="/">Three</Nav>
      </Navbar>
    </Router>
  );
  const burger = within(container).getByTestId("burger");
  const nav = within(container).getByTestId("navigation");

  expect(burger).toBeDefined();
  expect(nav).toBeDefined();
  expect(nav).not.toHaveClass("active");

  fireEvent.click(burger);
  expect(nav).toHaveClass("active");
  fireEvent.click(burger);
  expect(nav).not.toHaveClass("active");
});
