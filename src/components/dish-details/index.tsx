import styles from "./styles.module.css";
import ago from "s-ago";
import { FC } from "react";
import { Divider, Group } from "@mantine/core";
import { IngredientItem } from "./ingredient-item";
import { EditDish } from "./edit-dish";
import { MealItem } from "./meal-item";
import { Link } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import { formatDate } from "../../utils/date-format";
import { CaloriesCount } from "./calories-count";

export type Dish = {
	id: number;
	creation_date: number;
	prep_date?: number | undefined | null;
	name?: string | undefined | null;
	total_weight?: number | undefined | null;
	is_finished?: number | undefined | null;
};

export type UsedAt = {
	meal_description?: string | null;
	meal_id: number;
	eat_date?: number | null;
	weight?: number | null;
};

export type AddedIngredient = {
	addition_date: number;
	weight: number;
	ingredient_name: string;
	ingredient_id: number;
	kcal_100g?: number | null;
};

export const DishDetails: FC<{
	dish: Dish;
	used_at: UsedAt[];
	added_ingredients: AddedIngredient[];
}> = ({ added_ingredients, used_at, dish }) => {
	const total_used =
		used_at.reduce((acc, item) => acc + (item.weight ?? 0), 0) || 0;
	const sum_weight_added_ingredients =
		added_ingredients.reduce((acc, item) => acc + item.weight, 0) || 0;
	const remaining = dish.total_weight
		? dish.total_weight - total_used
		: sum_weight_added_ingredients - total_used;

	const prep_date = new Date(dish.prep_date || dish.creation_date);
	return (
		<div className={styles.details_container}>
			<p>
				id:{" "}
				<Link to={ROUTES.DISH.ID.buildPath({ dish_id: dish.id })}>
					{dish.id}
				</Link>
			</p>
			<p>
				Prepared {formatDate(prep_date, "YYYY/MM/DD - hh:mm")} ({ago(prep_date)}
				)
			</p>
			<p>
				Initial weight: {dish.total_weight ? `${dish.total_weight}g` : "None"}
			</p>
			<Divider my="md" />
			<p>Ingredients:</p>
			<div className={styles.ingredients_container}>
				{added_ingredients.map((added_ingredient) => (
					<IngredientItem
						key={added_ingredient.ingredient_id}
						dish_id={dish.id}
						added_ingredient={added_ingredient}
					/>
				))}
			</div>
			<Group mt="xs">Added weights: {sum_weight_added_ingredients}g</Group>
			<CaloriesCount
				dishWeight={dish.total_weight || sum_weight_added_ingredients}
				addedIngredients={added_ingredients}
			/>
			<Divider my="md" />
			{used_at.length > 0 ? (
				<>
					<p>Used in meals:</p>
					<div className={styles.ingredients_container}>
						{used_at.map((usedAt) => (
							<MealItem
								key={usedAt.meal_id}
								meal_id={usedAt.meal_id}
								weight={usedAt.weight ?? 0}
								eat_date={usedAt.eat_date}
								meal_description={usedAt.meal_description ?? ""}
							/>
						))}
					</div>
					<div>
						<p>
							Total used: {total_used}g /{" "}
							{dish.total_weight || sum_weight_added_ingredients || "???"}g
						</p>
						<p>Remaining: {remaining}g</p>
					</div>
				</>
			) : (
				<p>Not used in any meals</p>
			)}
			<div style={{ width: "100%", marginTop: 12 }}>
				<Group justify="space-between">
					<EditDish dish_id={dish.id} />
				</Group>
			</div>
		</div>
	);
};
