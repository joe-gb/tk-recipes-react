import RecipeService, { Ingredient } from "../services/Recipe";
import { Link, useParams } from "react-router-dom";
import { SmallSubtitle, Subtitle } from "../components/Text";
import { List } from "../components/List";
import { Row } from "../components/Layout";
import { Button } from "../components/Button";
import Loader from "../components/Loader";

function RecipeView() {
  let { id } = useParams();

  let [recipe, loading, error] = RecipeService.GetRecipe(id);

  if (error) {
    return <p>Unable to fetch recipe - {error.message}</p>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Subtitle>{recipe.name}</Subtitle>
      {recipe.ingredients && (
        <>
          <SmallSubtitle>Ingredients</SmallSubtitle>
          {List(
            recipe.ingredients.map((ingredient: Ingredient) => ingredient.name)
          )}
        </>
      )}
      <Row>
        <Link to={"/recipes/edit/" + id}>
          <Button>Edit recipe</Button>
        </Link>
        <Link to={"/recipes/delete/" + id}>
          <Button>Delete recipe</Button>
        </Link>
      </Row>
    </>
  );
}

export default RecipeView;
