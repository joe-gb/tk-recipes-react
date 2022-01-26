import RecipeService, { Recipe } from "../services/Recipe";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Input } from "../components/Input";
import { Subtitle } from "../components/Text";
import { LinkList } from "../components/List";
import Loader from "../components/Loader";

function RecipeSearch() {
  const [search, setSearch] = useState("");
  let [recipes, loading, error] = RecipeService.GetRecipes(search);

  if (error) {
    return <p>Unable to fetch recipes - {error.message}</p>;
  }

  if (loading) {
    return <Loader />;
  }

  if (recipes.length === 0) {
    return (
      <p>
        No recipes match this criteria, why not{" "}
        <Link to="/recipes/add">create one?</Link>
      </p>
    );
  }
  return (
    <>
      <Subtitle>Recipe Search</Subtitle>
      <div>
        <Input
          placeholder="Search recipes"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div>
          {LinkList(
            recipes.map((recipe: Recipe) => {
              return {
                link: "/recipes/" + recipe.id,
                text: recipe.name,
              };
            })
          )}
        </div>
      </div>
    </>
  );
}

export default RecipeSearch;
