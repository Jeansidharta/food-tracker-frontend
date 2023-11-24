import { FC } from "react";
import styles from "./styles.module.css";
import ago from "s-ago";
import { SingleAccordion } from "../single-accordion";
import { Divider, Group } from "@mantine/core";
import { useMealGet } from "../../api/meals";
import { Loading } from "../loading";
import { DishItem } from "./dish-item";
import { JustAteButton } from "./just-ate-button";
import { EditMeal } from "./edit-meal";

export type Meal = {
	id: number;
	creation_date: number;
	eat_date?: number | null;
	duration?: number | null;
	description?: string | null;
};

function makeEatDateString(eat_date?: number | null) {
	return eat_date
		? eat_date < new Date().getTime()
			? `Eaten ${ago(new Date(eat_date))}`
			: `Should eat ${ago(new Date(eat_date))}`
		: "Not eaten yet";
}

const ShortMealContent: FC<{ meal: Meal }> = ({ meal }) => {
	const { data, isLoading } = useMealGet(meal.id);

	if (isLoading) {
		return <Loading />;
	}
	if (!data) {
		return <div>No data</div>;
	}
	const { dishes, ingredients } = data;

	const components = [...dishes, ...ingredients];

	return (
		<div className={styles.details_container}>
			<p>id: {meal.id}</p>
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

export const ShortMeal: FC<{ meal: Meal }> = ({ meal }) => {
	return (
		<SingleAccordion
			headerLeftSide={<Group>{meal.description}</Group>}
			headerRightSide={
				<>
					{!meal.eat_date ? (
						<JustAteButton meal_id={meal.id} />
					) : (
						makeEatDateString(meal.eat_date)
					)}
				</>
			}
			content={<ShortMealContent meal={meal} />}
		/>
	);
};
