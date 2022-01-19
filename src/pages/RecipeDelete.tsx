import RecipeService from "../services/Recipe";
import { useParams, useNavigate, Link } from "react-router-dom";
import React from "react";
import { Button, NeutralButton, WarningButton } from "../components/Button";
import { Card } from "../components/Card";
import { Row } from "../components/Layout";
import { Successbox } from "../components/Messagebox";
import { Subtitle, Title } from "../components/Text";
import Loader from "../components/Loader";

function RecipeDelete() {
  let { id } = useParams();
  const navigate = useNavigate();
  let [recipe, loading, error] = RecipeService.GetRecipe(id);
  let [deletedRecipe, deleteLoading, deleteError, triggerDelete] =
    RecipeService.DeleteRecipe(id);

  if (deleteLoading || loading) {
    return <Loader />;
  }

  if (deleteError) {
    return <p>Unable to delete recipe - {deleteError.message}</p>;
  }

  if (error) {
    return <p>Unable to find recipe - {error.message}</p>;
  }

  if (deletedRecipe) {
    return (
      <Card>
        <Subtitle>Done</Subtitle>
        <Successbox>
          <h3>Success</h3>
          <p>Recipe '{recipe.name}' deleted</p>
        </Successbox>
        <Link to={"/recipes"}>
          <Button>See more recipes</Button>
        </Link>
      </Card>
    );
  }

  return (
    <Card>
      <h3>Delete recipe: {recipe.name}</h3>
      <p>Are you sure you want to delete this recipe?</p>
      <Row>
        <NeutralButton onClick={() => navigate(-1)}>Go back</NeutralButton>
        <Button onClick={() => triggerDelete()}>Delete</Button>
      </Row>
    </Card>
  );
}

export default RecipeDelete;
