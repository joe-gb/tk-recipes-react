import React from "react";
import { render, screen } from "@testing-library/react";
import { Card } from "../Card";

test("Snapshot test", () => {
  let { container } = render(<Card>This is a card</Card>);
  expect(container).toMatchSnapshot();
  expect(container.textContent).toBe("This is a card");
});
