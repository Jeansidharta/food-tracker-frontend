import { FC } from "react";
import styles from "./styles.module.css";
import { ROUTES } from "../../router/routes";
import { Link } from "react-router-dom";

export const IngredientItem: FC<{
	added_ingredient: {
		addition_date: number;
		ingredient_id: number;
		ingredient_name: string;
		weight: number;
		kcal_100g?: number | null;
	};
	dish_id: number;
}> = ({
	added_ingredient: { ingredient_name, weight, kcal_100g, ingredient_id },
}) => {
		return (
			<Link to={ROUTES.INGREDIENT.ID.buildPath({ ingredient_id })}>
				<div className={styles.ingredient_item}>
					<div>
						{weight}g of {ingredient_name} (
						{Math.round(((kcal_100g || 0) * weight) / 100)} kcal)
					</div>
				</div>
			</Link>
		);
	};
