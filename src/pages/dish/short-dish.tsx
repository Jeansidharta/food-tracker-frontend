import { FC } from "react";
import ago from "s-ago";
import { SingleAccordion } from "../../components/single-accordion";
import { Divider, Group } from "@mantine/core";
import { Dish, DishDetails } from "../../components/dish-details";
import { useDishGet } from "../../api/dishes";
import { Loading } from "../../components/loading";

const DishLoader: FC<{ dish_id: number }> = ({ dish_id }) => {
	const { data, isLoading } = useDishGet(dish_id);

	if (isLoading) {
		return <Loading />;
	}
	if (!data) {
		return <div>No data</div>;
	}

	const { dish, used_at, added_ingredients } = data;

	return (
		<DishDetails
			added_ingredients={added_ingredients}
			used_at={used_at}
			dish={dish}
		/>
	);
};
export const ShortDish: FC<{
	dish: Dish;
}> = ({ dish }) => {
	return (
		<SingleAccordion
			headerLeftSide={
				<Group>
					{dish.name} <Divider orientation="vertical" size="sm" />{" "}
					{dish.is_finished && "Finished"}
				</Group>
			}
			headerRightSide={`Prepped ${ago(new Date(dish.prep_date ?? 0))}`}
			content={<DishLoader dish_id={dish.id} />}
		/>
	);
};
