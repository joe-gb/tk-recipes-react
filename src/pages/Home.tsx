import { Link } from "react-router-dom";
import React from "react";
import { Title, Text } from "../components/Text";
import { Card } from "../components/Card";

function Home() {
  return (
    <Card>
      <Title>Welcome to Travelperk recipes</Title>
      <Text>
        You can <Link to="/recipes/add">add a recipe</Link> or{" "}
        <Link to="/recipes">browse recipes</Link>
      </Text>
    </Card>
  );
}

export default Home;
