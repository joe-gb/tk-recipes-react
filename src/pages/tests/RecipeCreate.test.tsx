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
} from "@testing-library/react";
import { RecipeCreate } from "../RecipeCreateEdit";

const mock = new MockAdapter(axios);

mock
  .onPost(/http:\/\/localhost:8000\/recipes\//)
  .reply(200, { id: 105, name: "Paella" });

afterEach(cleanup);

test("Test recipe creation", async () => {
  const { container } = render(
    <Router>
      <RecipeCreate />
    </Router>
  );

  // Enter recipe name
  const name_input = screen.getByPlaceholderText("Recipe name");
  fireEvent.change(name_input, { target: { value: "Pizza" } });
  fireEvent.click(screen.getByText("Submit"));
  expect(screen.getByText("Pizza")).toBeInTheDocument();

  // Add some ingredients
  const ingredient_input = screen.getByPlaceholderText("Enter ingredient");
  fireEvent.change(ingredient_input, { target: { value: "Cheese" } });
  fireEvent.click(screen.getByText("Add to recipe"));
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  fireEvent.change(ingredient_input, { target: { value: "Tomato" } });
  fireEvent.click(screen.getByText("Add to recipe"));
  expect(screen.getByText("Tomato")).toBeInTheDocument();

  // Submit
  fireEvent.click(screen.getByText("Done"));

  // Assert   screen matches previous input
  expect(screen.getByText("Pizza")).toBeInTheDocument();
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.getByText("Tomato")).toBeInTheDocument();

  // Submit to backend
  fireEvent.click(screen.getByText("Done"));

  // Wait for success response and assert success screen
  await waitFor(() => {
    expect(screen.getByText("Success")).toBeInTheDocument();
  });
  expect(container).toHaveTextContent(
    /Your recipe Paella is saved with reference 105/
  );
});
