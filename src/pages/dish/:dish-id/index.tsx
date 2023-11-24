import { FC } from "react";
import { usePageGetDishLoaderData } from "./loader";
import { DishDetails } from "../../../components/dish-details";

export const PageGetDish: FC<object> = () => {
	const { dish, added_ingredients, used_at } = usePageGetDishLoaderData();

	return (
		<div>
			<h1>{dish.name}</h1>
			<DishDetails
				added_ingredients={added_ingredients}
				used_at={used_at}
				dish={dish}
			/>
		</div>
	);
};
