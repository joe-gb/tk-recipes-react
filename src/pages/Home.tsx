import { Link } from "react-router-dom";
import React from "react";
import { Title, Text } from "../components/Text";

function Home() {
  return (
    <>
      <Title>Welcome to Travelperk recipes</Title>
      <Text>
        You can <Link to="/recipes/add">add a recipe</Link> or{" "}
        <Link to="/recipes">browse recipes</Link>
      </Text>
    </>
  );
}

export default Home;
