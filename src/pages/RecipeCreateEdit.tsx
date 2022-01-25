import React, { useState } from "react";

import RecipeService, { Recipe, Ingredient } from "../services/Recipe";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { Button, CrossButton, NeutralButton } from "../components/Button";
import { SmallSubtitle, Subtitle, Text } from "../components/Text";
import { Label, Input } from "../components/Input";
import { ListItem } from "../components/List";
import { Row } from "../components/Layout";
import { Errorbox, Successbox } from "../components/Messagebox";
import Loader from "../components/Loader";

const CreateEditForm = (editRecipe: Recipe) => {
  const form_errors = { name: "", ingredient: "" };

  const [recipe, setRecipe] = useState(editRecipe);
  const [validationerrors, setValidationerrors] = useState(form_errors);
  const [ingredient, setIngredient] = useState("");
  const [stage, setStage] = useState(0);
  const [createdRecipe, createLoading, createError, triggerSave] =
    RecipeService.SaveRecipe(recipe);

  if (createLoading) {
    return <Loader />;
  }

  // Start over, reset all context
  const startOver = () => {
    setStage(0);
    setRecipe(editRecipe);
    setIngredient("");
    setValidationerrors(form_errors);
  };

  // Name validator
  const validateName = (name: String | undefined) => {
    const isValid = name != "";
    const error = isValid ? "" : "Recipe name cannot be blank";
    setValidationerrors({ ...validationerrors, name: error });
    return isValid;
  };

  // Ingredient validator
  const validateIngredient = (ingredient: String | undefined) => {
    const isValid = ingredient != "";
    const error = isValid ? "" : "Ingredient name cannot be blank";
    setValidationerrors({ ...validationerrors, ingredient: error });
    return isValid;
  };

  // onChange for recipe name
  const onChangeRecipeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    validateName(event.target.value);
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };

  // onSubmit for recipe name
  const onSubmitRecipeName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateName(recipe.name)) {
      setStage(stage + 1);
    }
  };

  // onChange for ingredient
  const onChangeIngredient = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredient(event.target.value);
    const error =
      event.target.value == "" ? "Ingredient name cannot be blank" : "";
    setValidationerrors({ ...validationerrors, ingredient: error });
  };

  // onSubmit for ingredient
  const onSubmitIngredient = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateIngredient(ingredient)) {
      let new_recipe = Object.assign({}, recipe);
      let ingredient_obj: Ingredient = { name: ingredient };
      if (!new_recipe.ingredients) new_recipe.ingredients = [];
      new_recipe.ingredients.push(ingredient_obj);
      setRecipe(new_recipe);
      setIngredient("");
    }
  };

  // Submit the recipe via the API
  const onSubmitRecipe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    triggerSave(recipe);
    setStage(stage + 1); // or navigate to recipe view
  };

  // Step back
  const back = () => {
    setStage(stage - 1);
  };

  // Step forward
  const next = () => {
    setStage(stage + 1);
  };

  // Delete an ingredient from the current recipe
  const delete_ingredient = (index: number) => {
    let new_recipe = Object.assign({}, recipe);
    if (new_recipe.ingredients) {
      new_recipe.ingredients.splice(index, 1);
    }
    if (!new_recipe.ingredients) new_recipe.ingredients = [];
    setRecipe(new_recipe);
  };

  // Generate a list of ingredients, optionally with a delete button
  const ListIngredients = (showRemove = false) => {
    if (recipe.ingredients) {
      const list = recipe.ingredients.map((ingredient: Ingredient, index) => (
        <ListItem key={index.toString()}>
          {ingredient.name}
          {showRemove == true && (
            <CrossButton
              title="Delete ingredient"
              key={index + "button"}
              type="button"
              onClick={() => delete_ingredient(index)}
            >
              Remove
            </CrossButton>
          )}
        </ListItem>
      ));
      return list;
    }
    return <></>;
  };

  if (stage == 1) {
    return (
      <form onSubmit={onSubmitIngredient}>
        <Subtitle>Ingredients</Subtitle>
        <SmallSubtitle>{recipe.name}</SmallSubtitle>
        <Input
          label="What goes in your recipe?"
          placeholder={"Enter ingredient"}
          autoFocus
          name="ingredient"
          value={ingredient}
          error={validationerrors.ingredient}
          onChange={onChangeIngredient}
          type="text"
        />
        <Button type="submit">Add to recipe</Button>
        {ListIngredients(true)}
        <Row>
          <NeutralButton type="button" onClick={back}>
            Back
          </NeutralButton>
          <Button type="button" onClick={next}>
            Done
          </Button>
        </Row>
      </form>
    );
  }
  if (stage == 2) {
    return (
      <form onSubmit={onSubmitRecipe}>
        <Subtitle>Confirm your recipe</Subtitle>
        <Text>Check your recipe over before you submit</Text>
        <div>
          <SmallSubtitle>{recipe.name}</SmallSubtitle>

          {ListIngredients(false)}
          <Row>
            <NeutralButton type="button" onClick={back}>
              Back
            </NeutralButton>
            <Button type="submit">Done</Button>
          </Row>
        </div>
      </form>
    );
  }
  if (stage == 3) {
    return (
      <>
        {createError && (
          <>
            <Subtitle>Oh no ..</Subtitle>
            <Errorbox>
              <h3>There was a problem</h3>
              <p>We couldn't save your recipe</p>
            </Errorbox>
            <Text>
              There was an error creating this recipe: {createError.message}
            </Text>
            <Button onClick={startOver}>Start over</Button>
          </>
        )}
        {createdRecipe && !createError && (
          <>
            <Subtitle>Done</Subtitle>
            <Successbox>
              <h3>Success</h3>
              <p>
                Your recipe <strong>{createdRecipe.name}</strong> is saved with
                reference {createdRecipe.id}
              </p>
            </Successbox>
            <Button onClick={startOver}>Start over</Button>
          </>
        )}
      </>
    );
  } else {
    // Stage 0
    {
      return (
        <>
          <Subtitle>Build your recipe</Subtitle>
          <form onSubmit={onSubmitRecipeName}>
            <Label>
              What is your recipe called?
              <Input
                error={validationerrors.name}
                placeholder="Recipe name"
                autoFocus
                name="name"
                value={recipe.name}
                onChange={onChangeRecipeName}
                type="text"
              />
            </Label>
            <Button type="submit">Submit</Button>
          </form>
        </>
      );
    }
  }
};

export function RecipeCreate() {
  const initial_recipe: Recipe = { name: "" };
  return <>{CreateEditForm(initial_recipe)}</>;
}

export function RecipeEdit() {
  const { id } = useParams();

  const [getRecipe, getLoading, getError, TriggerGet]: [
    Recipe,
    boolean,
    AxiosError,
    Function
  ] = RecipeService.GetRecipe(id, true);

  // Get initial state of recipe by ID, for editing existing recipes
  if (!getLoading && !getRecipe && !getError) {
    TriggerGet();
  }

  if (getError) {
    return (
      <>
        <Subtitle>Oh no ..</Subtitle>
        <Errorbox>
          <h3>There was a problem</h3>
          <p>We couldn't load your recipe</p>
        </Errorbox>
        <Text>
          There was an error retrieving this recipe: {getError.message}
        </Text>
      </>
    );
  }
  return <CreateEditForm key={getRecipe?.id || 0} {...getRecipe} />;
}
