import RecipeService, { Recipe } from "../services/Recipe";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Subtitle } from "../components/Text";
import { ListItem } from "../components/List";
import Loader from "../components/Loader";

function RecipeList(search: String) {
  let [recipes, loading, error] = RecipeService.GetRecipes(search);

  if (error) {
    return <p>Unable to fetch recipes - {error.message}</p>;
  }

  if (loading) {
    return <Loader />;
  }

  if (recipes.length == 0) {
    return (
      <p>
        No recipes match this criteria, why not{" "}
        <Link to="/recipes/add">create one?</Link>
      </p>
    );
  }

  return (
    <div>
      {recipes.map((recipe: Recipe) => (
        <Link key={recipe.id?.toString()} to={"/recipes/" + recipe.id}>
          <ListItem>{recipe.name}</ListItem>
        </Link>
      ))}
    </div>
  );
}

function RecipeSearch() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Card>
        <Subtitle>Recipe Search</Subtitle>
        <div>
          <Input
            placeholder="Search recipes"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {RecipeList(search)}
        </div>
      </Card>
    </>
  );
}

export default RecipeSearch;
