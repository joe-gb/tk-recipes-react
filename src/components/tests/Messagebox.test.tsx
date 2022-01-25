import React from "react";
import { render } from "@testing-library/react";
import { Errorbox, Messagebox, Successbox } from "../Messagebox";

test("Messagebox snapshot test", () => {
  let { container } = render(<Messagebox>This is a message</Messagebox>);
  expect(container).toMatchSnapshot();
  expect(container.textContent).toBe("This is a message");
});

test("Successbox snapshot test", () => {
  let { container } = render(
    <Successbox>This is a success message</Successbox>
  );
  expect(container).toMatchSnapshot();
  expect(container.textContent).toBe("This is a success message");
});

test("Errorbox snapshot test", () => {
  let { container } = render(<Errorbox>This is an error message</Errorbox>);
  expect(container).toMatchSnapshot();
  expect(container.textContent).toBe("This is an error message");
});
