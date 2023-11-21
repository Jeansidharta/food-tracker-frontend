import styles from "./styles.module.css";
import { FC } from "react";

export const DishItem: FC<{
	mealComponent: {
		id: number;
		name?: string | undefined | null;
		weight: number;
	};
	meal_id: number;
}> = ({ mealComponent: dish }) => {
	return (
		<div className={styles.component_item}>
			<div>
				{dish.weight}g of {dish.name}
			</div>
		</div>
	);
};
