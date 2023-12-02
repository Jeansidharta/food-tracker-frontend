// import styles from "./styles.module.css";
import { FC } from "react";
import ago from "s-ago";
import { SingleAccordion } from "../../components/single-accordion";
import { Group } from "@mantine/core";
import { Loading } from "../../components/loading";
import { useIngredientGet } from "../../api/ingredients";
import { IngredientDetails } from "../../components/ingredient-details";

type Ingredient = {
	id: number;
	creation_date: number;
	name: string;
};

const IngredientLoader: FC<{ ingredient_id: number }> = ({ ingredient_id }) => {
	const { data: ingredient, isLoading } = useIngredientGet(ingredient_id);

	if (isLoading) {
		return <Loading />;
	}
	if (!ingredient) {
		return <div>No data</div>;
	}

	return <IngredientDetails ingredient={ingredient} />;
};

export const ShortIngredient: FC<{
	ingredient: Ingredient;
}> = ({ ingredient }) => {
	return (
		<SingleAccordion
			headerLeftSide={<Group>{ingredient.name}</Group>}
			headerRightSide={ago(new Date(ingredient.creation_date ?? 0))}
			content={<IngredientLoader ingredient_id={ingredient.id} />}
		/>
	);
};
