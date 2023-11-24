import { FC } from "react";
import styles from "./styles.module.css";
import ago from "s-ago";
import { Divider, Group } from "@mantine/core";
import { DishItem } from "./dish-item";
import { EditMeal } from "./edit-meal";
import { ROUTES } from "../../router/routes";
import { Link } from "react-router-dom";

export type Meal = {
	id: number;
	creation_date: number;
	eat_date?: number | null;
	duration?: number | null;
	description?: string | null;
};

export type MealComponent = {
	id: number;
	weight: number;
};

function makeEatDateString(eat_date?: number | null) {
	return eat_date
		? eat_date < new Date().getTime()
			? `Eaten ${ago(new Date(eat_date))}`
			: `Should eat ${ago(new Date(eat_date))}`
		: "Not eaten yet";
}

export const MealDetails: FC<{
	meal: Meal;
	dishes: MealComponent[];
	ingredients: MealComponent[];
}> = ({ meal, ingredients, dishes }) => {
	const components = [...dishes, ...ingredients];

	return (
		<div className={styles.details_container}>
			<p>
				id:{" "}
				<Link to={ROUTES.MEAL.ID.buildPath({ meal_id: meal.id })}>
					{meal.id}
				</Link>
			</p>
			<p>{makeEatDateString(meal.eat_date)}</p>
			<p>Created {ago(new Date(meal.creation_date))}</p>
			<p>Duration: {meal.duration ?? 0} minutes</p>
			<Divider mt="xs" mb="xs" />
			<div className={styles.components_container}>
				{components.map((dish) => (
					<DishItem key={dish.id} meal_id={meal.id} mealComponent={dish} />
				))}
			</div>
			<Group mt="xs">
				Total weight:{" "}
				{components.reduce((acc, item) => acc + item.weight, 0) || 0}g
			</Group>
			<div style={{ width: "100%", marginTop: 12 }}>
				<Group justify="space-between">
					<EditMeal meal_id={meal.id} />
				</Group>
			</div>
		</div>
	);
};
