import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom/extend-expect";
import {
  cleanup,
  waitFor,
  render,
  screen,
  fireEvent,
  within,
} from "@testing-library/react";
import { RecipeEdit } from "../RecipeCreateEdit";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 110,
  }),
  useRouteMatch: () => ({ url: "/recipes/edit/110" }),
}));

const mockAxios = new MockAdapter(axios);

mockAxios
  .onPut(/http:\/\/localhost:8000\/recipes\/110/)
  .reply(200, { id: 110, name: "Strong Sangria" })
  .onGet(/http:\/\/localhost:8000\/recipes\/110/)
  .reply(200, {
    id: 110,
    name: "Sangria",
    ingredients: [
      { name: "Red Wine" },
      { name: "Orange" },
      { name: "Sugar" },
      { name: "Peas" },
    ],
  });

afterEach(cleanup);

test("Test recipe edit", async () => {
  const { container } = render(
    <Router>
      <RecipeEdit />
    </Router>
  );

  // Verify our recipe loaded
  await waitFor(() => {
    expect(screen.getByDisplayValue("Sangria")).toBeInTheDocument();
  });

  const name_input = screen.getByPlaceholderText("Recipe name");

  // Edit recipe name
  fireEvent.change(name_input, { target: { value: "Strong Sangria" } });
  fireEvent.click(screen.getByText("Submit"));
  expect(screen.getByText("Strong Sangria")).toBeInTheDocument();

  // Add an ingredients
  const ingredient_input = screen.getByPlaceholderText("Enter ingredient");
  fireEvent.change(ingredient_input, { target: { value: "Brandy" } });
  fireEvent.click(screen.getByText("Add to recipe"));
  expect(screen.getByText("Brandy")).toBeInTheDocument();

  // Delete peas, as they don't belong in Sangria
  expect(screen.getByText("Peas")).toBeInTheDocument();
  const coconut = screen.getByText("Peas");
  fireEvent.click(within(coconut).getByTestId("svg-cross"));
  expect(screen.queryByText("Peas")).not.toBeInTheDocument();

  // Submit
  fireEvent.click(screen.getByText("Done"));

  // Assert screen matches expected ingredients
  expect(screen.getByText("Strong Sangria")).toBeInTheDocument();
  expect(screen.getByText("Red Wine")).toBeInTheDocument();
  expect(screen.getByText("Brandy")).toBeInTheDocument();
  expect(screen.getByText("Orange")).toBeInTheDocument();
  expect(screen.getByText("Sugar")).toBeInTheDocument();

  // Submit to backend
  fireEvent.click(screen.getByText("Done"));

  // Wait for success response and assert success screen
  await waitFor(() => {
    expect(screen.getByText("Success")).toBeInTheDocument();
  });
  expect(container).toHaveTextContent(
    /Your recipe Strong Sangria is saved with reference 110/
  );
});
