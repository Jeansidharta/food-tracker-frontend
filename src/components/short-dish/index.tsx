import styles from "./styles.module.css";
import { FC } from "react";
import ago from "s-ago";
import { SingleAccordion } from "../single-accordion";
import { useDishGet } from "../../api/dishes";
import { Loading } from "../loading";
import { Divider, Group } from "@mantine/core";
import { IconSitemap } from "@tabler/icons-react";
import { IngredientItem } from "./ingredient-item";
import { EditDish } from "./edit-dish";

type Dish = {
	id: number;
	creation_date: number;
	prep_date?: number | undefined | null;
	name?: string | undefined | null;
	total_weight?: number | undefined | null;
};

const ShortDishContent: FC<{ dish: Dish }> = ({ dish }) => {
	const { data, isLoading } = useDishGet(dish.id);

	if (isLoading) {
		return <Loading />;
	}
	if (!data) {
		return <div>No data</div>;
	}
	const { added_ingredients } = data;

	return (
		<div className={styles.details_container}>
			<p>
				Initial weight:{" "}
				{data?.dish.total_weight ? `${data?.dish.total_weight}g` : ""}
			</p>
			<div className={styles.ingredients_container}>
				{added_ingredients.map((added_ingredient) => (
					<IngredientItem
						key={added_ingredient.ingredient_id}
						dish_id={dish.id}
						added_ingredient={added_ingredient}
					/>
				))}
			</div>
			<div style={{ width: "100%", marginTop: 12 }}>
				<Group justify="space-between">
					<EditDish dish_id={dish.id} />
				</Group>
			</div>
		</div>
	);
};

export const ShortDish: FC<{
	dish: Dish;
	ingredients_count?: number;
}> = ({ dish, ingredients_count }) => {
	return (
		<SingleAccordion
			headerLeftSide={
				<Group>
					{dish.name} <Divider orientation="vertical" size="sm" />{" "}
					<Group gap={2}>
						{ingredients_count}
						<IconSitemap
							style={{ width: "16px", height: "16px" }}
							stroke={1.5}
						/>
					</Group>
				</Group>
			}
			headerRightSide={`Prepped ${ago(new Date(dish.prep_date ?? 0))}`}
			content={<ShortDishContent dish={dish} />}
		/>
	);
};
