import React from "react";
import axios from "axios";
import Wrapper from "../assets/wrappers/CocktailPage";
import { Link, Navigate, useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const getCocktailbyId = (id) => {
  return {
    queryKey: ["cocktail", id], //will be cached, only need the info about the drink with corresponding ID = id hence no 'all' here
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(getCocktailbyId(id));
    return { id };
  };

const Cocktail = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(getCocktailbyId(id));

  if (!data) {
    return <Navigate to="/" />;
  }
  const drink = data.drinks[0];
  const {
    strDrink: name,
    strDrinkThumb: img,
    strCategory: category,
    strGlass: glass,
    strInstructions: instruction,
    strAlcoholic: type,
  } = drink;

  const Ingredients = Object.keys(drink)
    .filter((key) => key.startsWith("strIngredient") && drink[key] !== null)
    .map((key) => drink[key]);
  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={img} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name:</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category:</span>
            {category}
          </p>
          <p>
            <span className="drink-data">Type:</span>
            {type}
          </p>
          <p>
            <span className="drink-data">Ingredients:</span>
            {Ingredients.map((item, index) => {
              return (
                <span className="ing" key={item}>
                  {item}
                  {index < Ingredients.length - 1 ? "," : ""}
                </span>
              );
            })}
          </p>
          <p>
            <span className="drink-data">Instructions:</span>
            {instruction}
          </p>
          <p>
            <span className="drink-data">glass:</span>
            {glass}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cocktail;
