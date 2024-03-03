import { FC } from "react";
import { IngredientDetails } from "../../../components/ingredient-details";
import { usePageGetIngredientLoaderData } from "./loader";

export const PageGetIngredient: FC<object> = () => {
	const { ingredient, properties } = usePageGetIngredientLoaderData();

	return (
		<div>
			<h1>{ingredient.name}</h1>
			<IngredientDetails ingredient={ingredient} properties={properties} />
		</div>
	);
};
