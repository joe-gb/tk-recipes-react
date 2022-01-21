import React from "react";
import { render, screen } from "@testing-library/react";
import { Button, WarningButton, NeutralButton } from "./Button";

test("Renders button text", () => {
  let { container } = render(<Button>Click me</Button>);
  expect(container.textContent).toBe("Click me");
});
