import { FC } from "react";
import styles from "./styles.module.css";

export const IngredientItem: FC<{
	added_ingredient: {
		addition_date: number;
		ingredient_id: number;
		ingredient_name: string;
		weight: number;
	};
	dish_id: number;
}> = ({ added_ingredient: { ingredient_name, weight } }) => {
	return (
		<div className={styles.ingredient_item}>
			<div>
				{weight}g of {ingredient_name}
			</div>
		</div>
	);
};
