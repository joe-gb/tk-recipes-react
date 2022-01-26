import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, waitFor, render, screen } from "@testing-library/react";
import RecipeView from "../RecipeView";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 5,
  }),
  useRouteMatch: () => ({ url: "/recipes/5" }),
}));

const mockAxios = new MockAdapter(axios);
mockAxios.onGet(/http:\/\/localhost:8000\/recipes\/5\/\?[0-9]+/).reply(200, {
  id: 5,
  name: "Paella",
  ingredients: [
    { name: "Rice" },
    { name: "Prawns" },
    { name: "Paprika" },
    { name: "Tomatoes" },
  ],
});

afterEach(cleanup);

test("Test recipe list", async () => {
  const { container } = render(
    <Router>
      <RecipeView />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText("Prawns")).toBeInTheDocument();
  });
  expect(screen.getByText("Rice")).toBeInTheDocument();
  expect(screen.getByText("Paprika")).toBeInTheDocument();
  expect(screen.getByText("Tomatoes")).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
