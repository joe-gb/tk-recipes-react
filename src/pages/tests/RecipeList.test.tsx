import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, waitFor, render, screen } from "@testing-library/react";
import RecipeList from "../RecipeList";

const mock = new MockAdapter(axios);

mock.onGet(/http:\/\/localhost:8000\/recipes\/\?[0-9]+/).reply(200, [
  { id: 1, name: "Paella" },
  { id: 2, name: "Pizza" },
  { id: 3, name: "Sangria" },
]);

afterEach(cleanup);

test("Test recipe list", async () => {
  const { container } = render(
    <Router>
      <RecipeList />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText("Paella")).toBeInTheDocument();
  });
  expect(screen.getByText("Pizza")).toBeInTheDocument();
  expect(screen.getByText("Sangria")).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
