import { FC } from "react";
import styles from "./styles.module.css";
import ago from "s-ago";
import { Divider, Group } from "@mantine/core";
import { ComponentItem } from "./dish-item";
import { EditMeal } from "./edit-meal";
import { ROUTES } from "../../router/routes";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/date-format";
import { JustAteButton } from "../just-ate";

export type Meal = {
	id: number;
	creation_date: number;
	eat_date?: number | null;
	duration?: number | null;
	description?: string | null;
};

export type MealComponent = {
	id: number;
	name?: string | null;
	weight: number;
	kcal?: number | null;
	fat?: number | null;
	carbohydrates?: number | null;
	proteins?: number | null;
};

function makeEatDateString(
	eat_date: number | null | undefined,
	mealId: number,
) {
	if (!eat_date) {
		return (
			<>
				Not eaten yet <JustAteButton meal_id={mealId} />
			</>
		);
	}
	const date = new Date(eat_date);
	const date_string = formatDate(date, "YYYY/MM/DD - hh:mm");
	return date.getTime() < new Date().getTime()
		? `Eaten ${date_string} (${ago(date)})`
		: `Should eat ${date_string} (${ago(date)})`;
}

export const MealDetails: FC<{
	meal: Meal;
	dishes: MealComponent[];
	ingredients: MealComponent[];
}> = ({ meal, ingredients, dishes }) => {
	const components = [
		...dishes.map((dish) => ({ ...dish, type: "dish" as const })),
		...ingredients.map((ingredient) => ({
			...ingredient,
			type: "ingredient" as const,
		})),
	];

	const creation_date = new Date(meal.creation_date);
	const total_calories = components.reduce(
		(acc, item) => acc + (item.kcal || 0),
		0,
	);
	const total_weight = components.reduce((acc, item) => acc + item.weight, 0);

	return (
		<div className={styles.details_container}>
			<p>
				id:{" "}
				<Link to={ROUTES.MEAL.ID.buildPath({ meal_id: meal.id })}>
					{meal.id}
				</Link>
			</p>
			<p>{makeEatDateString(meal.eat_date, meal.id)}</p>
			<p>
				Created {formatDate(creation_date, "YYYY/MM/DD - hh:mm")} (
				{ago(creation_date)})
			</p>
			<p>Duration: {meal.duration ?? 0} minutes</p>
			<Divider mt="xs" mb="xs" />
			<div className={styles.components_container}>
				{components.map((component) => (
					<ComponentItem key={component.id} mealComponent={component} />
				))}
			</div>
			<Group mt="xs">Total weight: {total_weight}g</Group>
			<Group mt="xs">Calories: {total_calories} kcal</Group>
			<div style={{ width: "100%", marginTop: 12 }}>
				<Group justify="space-between">
					<EditMeal meal_id={meal.id} />
				</Group>
			</div>
		</div>
	);
};
