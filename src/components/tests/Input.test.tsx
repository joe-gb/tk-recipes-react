import React from "react";
import { render, screen } from "@testing-library/react";
import { Input } from "../Input";

test("Snapshot test with label", () => {
  let { container } = render(<Input label="Enter your answer" />);
  expect(container).toMatchSnapshot();
  expect(container.textContent).toBe("Enter your answer");
  expect(screen.getByLabelText("Enter your answer")).toBeDefined();
});

test("Snapshot test plain label", () => {
  let { container } = render(<Input />);
  expect(container).toMatchSnapshot();
  expect(container.textContent).toBe("");
});

test("Snapshot test with placeholder", () => {
  let { container } = render(<Input placeholder="Type here" />);
  expect(container).toMatchSnapshot();
  expect(container.textContent).toBe("");
  expect(screen.getByPlaceholderText("Type here")).toBeDefined();
});
