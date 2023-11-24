import { FC } from "react";
import { usePageGetMealLoaderData } from "./loader";
import { MealDetails } from "../../../components/meal-details";

export const PageGetMeal: FC<object> = () => {
	const { meal, dishes, ingredients } = usePageGetMealLoaderData();

	return (
		<div>
			<h1>{meal.description}</h1>
			<MealDetails meal={meal} dishes={dishes} ingredients={ingredients} />
		</div>
	);
};
