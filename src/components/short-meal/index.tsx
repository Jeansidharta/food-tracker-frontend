import { FC } from "react";
import styles from "./styles.module.css";
import ago from "s-ago";
import { SingleAccordion } from "../single-accordion";
import { Divider, Group, Rating } from "@mantine/core";
import { useMealGet } from "../../api/meals";
import { Loading } from "../loading";
import { DishItem } from "./dish-item";
import { EditMeal } from "./edit-meal";

export type Meal = {
  id: number;
  creation_date: number;
  eat_date?: number | null;
  duration?: number | null;
  description?: string | null;
  hunger_level?: number | null;
  desire_to_eat?: number | null;
  fullness_afterwards?: number | null;
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
	const { dishes } = data;

	return (
		<div className={styles.details_container}>
			<p>{makeEatDateString(meal.eat_date)}</p>
			<p>Created {ago(new Date(meal.creation_date))}</p>
			<p>Duration: {meal.duration ?? 0} minutes</p>
			<Group>
				<p>Hunger Level:</p>
				<Rating value={meal.hunger_level ?? 0} count={10} />
			</Group>
			<Group>
				<p>Desire to Eat:</p>
				<Rating value={meal.desire_to_eat ?? 0} count={10} />
			</Group>
			<Group>
				<p>Fullness Afterwards:</p>
				<Rating value={meal.fullness_afterwards ?? 0} count={10} />
			</Group>
			<Divider mt="xs" mb="xs" />
			<p>Dishes:</p>
			<div className={styles.dishes_container}>
				{dishes.map((dish) => (
					<DishItem key={dish.dish_id} meal_id={meal.id} dish={dish} />
				))}
			</div>
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
      headerRightSide={makeEatDateString(meal.eat_date)}
      content={<ShortMealContent meal={meal} />}
    />
  );
};
