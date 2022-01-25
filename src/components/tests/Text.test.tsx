import React from "react";
import { render } from "@testing-library/react";
import { BigText, Subtitle, Text, Title } from "../Text";

test("Text snapshot test", () => {
  let { container } = render(<Text>This is text</Text>);
  expect(container).toMatchSnapshot();
  expect(container.textContent).toBe("This is text");
});

test("Bigtext snapshot test", () => {
  let { container } = render(<BigText>This is big text</BigText>);
  expect(container).toMatchSnapshot();
  expect(container.textContent).toBe("This is big text");
});

test("Title snapshot test", () => {
  let { container } = render(<Title>This is a title</Title>);
  expect(container).toMatchSnapshot();
  expect(container.textContent).toBe("This is a title");
});

test("Subtitle snapshot test", () => {
  let { container } = render(<Subtitle>This is a subtitle</Subtitle>);
  expect(container).toMatchSnapshot();
  expect(container.textContent).toBe("This is a subtitle");
});
