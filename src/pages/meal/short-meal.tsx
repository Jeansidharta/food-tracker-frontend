import { FC } from "react";
import ago from "s-ago";
import { Meal, MealDetails } from "../../components/meal-details";
import { SingleAccordion } from "../../components/single-accordion";
import { Group } from "@mantine/core";
import { JustAteButton } from "../../components/just-ate";
import { Loading } from "../../components/loading";
import { useMealGet } from "../../api/meals";

function makeEatDateString(eat_date?: number | null) {
	return eat_date
		? eat_date < new Date().getTime()
			? `Eaten ${ago(new Date(eat_date))}`
			: `Should eat ${ago(new Date(eat_date))}`
		: "Not eaten yet";
}

const MealLoader: FC<{ meal_id: number }> = ({ meal_id }) => {
	const { data, isLoading } = useMealGet(meal_id);

	if (isLoading) {
		return <Loading />;
	}
	if (!data) {
		return <div>No data</div>;
	}

	const { ingredients, dishes, meal } = data;

	return <MealDetails meal={meal} dishes={dishes} ingredients={ingredients} />;
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
			content={<MealLoader meal_id={meal.id} />}
		/>
	);
};
