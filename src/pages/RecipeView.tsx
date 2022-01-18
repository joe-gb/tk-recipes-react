import RecipeService, {Ingredient, Recipe} from "../services/Recipe";
import {Link, useParams} from "react-router-dom";
import React from "react";
import {Card} from "../components/Card";
import {SmallSubtitle, Subtitle} from "../components/Text";
import {ListItem} from "../components/List";
import {Row} from "../components/Layout";
import {Button} from "../components/Button";
import Loader from "../components/Loader";

// Generate a list of ingredients
export const ListIngredients = (recipe: Recipe) => {
    if (recipe.ingredients) {
        const list = recipe.ingredients.map(
            (ingredient: Ingredient, index) =>
                <ListItem key={index.toString()}>{ingredient.name}</ListItem>
        )
        return <><SmallSubtitle>Ingredients</SmallSubtitle>{list}</>
    }
    return <></>;
}

function RecipeView() {
    let { id } = useParams();

    let [recipe, loading, error] = RecipeService.GetRecipe(id)

    if (error) {
        return <p>Unable to fetch recipe - {error.message}</p>
    }

    if (loading) {
        return <Loader />
    }

    return (
        <Card>
            <Subtitle>{recipe.name}</Subtitle>
            {ListIngredients(recipe)}
            <Row>
                <Link to={"/recipes/edit/"+id}><Button>Edit recipe</Button></Link>
                <Link to={"/recipes/delete/"+id}><Button>Delete recipe</Button></Link>
            </Row>
        </Card>
    )
}



export default RecipeView