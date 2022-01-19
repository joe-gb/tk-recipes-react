import React from "react";
import useAxios from "axios-hooks";
import { AxiosError } from "axios";

export interface Ingredient {
  name: string;
}

export interface Recipe {
  id?: number;
  name: string | undefined;
  ingredients?: Array<Ingredient>;
}

const baseURL: string = "http://localhost:8000/recipes/";

const RecipeService: Function = () => {
  let update = Date.now();

  const GetRecipes: Function = (
    search: string
  ): [Array<Recipe>, boolean, AxiosError | null] => {
    const name = search ? "&name=" + search : "";
    let recipes: Array<Recipe> = [];
    const [{ data, loading, error }] = useAxios({
      url: "http://localhost:8000/recipes/" + "?" + update + name,
      method: "GET",
    });

    if (data) {
      recipes = data.map((recipe: Recipe) => recipe);
    }
    return [recipes, loading, error];
  };

  const GetRecipe: Function = (
    id: Number,
    manual: boolean
  ): [Recipe | undefined, boolean, AxiosError | null, Function] => {
    const [{ data, loading, error }, trigger] = useAxios(
      {
        url: "http://localhost:8000/recipes/" + id + "/?" + update,
        method: "GET",
      },
      { manual: manual }
    );

    let recipe = data as Recipe;
    return [recipe, loading, error, trigger];
  };

  const SaveRecipe: Function = (): [
    Recipe | undefined,
    boolean,
    AxiosError | null,
    Function
  ] => {
    const [{ data, loading, error }, triggerCreate] = useAxios(
      {},
      { manual: true }
    );

    const trigger: Function = (recipe: Recipe) => {
      update = Date.now();
      triggerCreate({
        url: recipe.id ? baseURL + recipe.id + "/" : baseURL,
        method: recipe.id ? "PUT" : "POST",
        data: recipe,
      });
    };

    return [data as Recipe, loading, error, trigger];
  };

  const DeleteRecipe: Function = (
    id: number
  ): [boolean, boolean, AxiosError | null, Function] => {
    let success = false;

    const [{ data, loading, error, response }, triggerDelete] = useAxios(
      {
        url: baseURL + id + "/",
        method: "DELETE",
      },
      { manual: true }
    );

    const trigger: Function = () => {
      update = Date.now();
      return triggerDelete();
    };

    if (response && response.status == 204) {
      success = true;
    }

    return [success, loading, error, trigger];
  };

  return {
    GetRecipes,
    GetRecipe,
    SaveRecipe,
    DeleteRecipe,
  };
};

export default RecipeService();
