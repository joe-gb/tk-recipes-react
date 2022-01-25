import React from "react";
import { render } from "@testing-library/react";
import Loader from "../Loader";

test("Loader snapshot test", () => {
  let { container } = render(<Loader />);
  expect(container).toMatchSnapshot();
});
