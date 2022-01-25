import React from "react";
import { render } from "@testing-library/react";
import { Button, WarningButton, NeutralButton, CrossButton } from "../Button";
import { within } from "@testing-library/dom";

test("Primary button snapshot test", () => {
  let { container } = render(<Button>Click me</Button>);
  expect(container).toMatchSnapshot();
  expect(container.textContent).toBe("Click me");
});

test("Neutral button Snapshot test", () => {
  let { container } = render(<NeutralButton>Click me</NeutralButton>);
  expect(container).toMatchSnapshot();
  expect(container.textContent).toBe("Click me");
});

test("WarningButton snapshot test", () => {
  let { container } = render(<WarningButton>Click me</WarningButton>);
  expect(container).toMatchSnapshot();
  expect(container.textContent).toBe("Click me");
});

test("Crossbutton snapshot test", () => {
  let { container } = render(<CrossButton>Click me</CrossButton>);
  expect(container).toMatchSnapshot();
  expect(container.textContent).toBe("");
  const burger = within(container).getByTestId("svg-cross");
  expect(burger).toBeDefined();
  expect(burger).toBeVisible();
});
