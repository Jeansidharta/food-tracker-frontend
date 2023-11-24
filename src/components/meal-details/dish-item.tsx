import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { FC } from "react";
import { ROUTES } from "../../router/routes";

export const DishItem: FC<{
	mealComponent: {
		id: number;
		name?: string | undefined | null;
		weight: number;
	};
	meal_id: number;
}> = ({ mealComponent: dish }) => {
	return (
		<Link to={ROUTES.DISH.ID.buildPath({ dish_id: dish.id })}>
			<div className={styles.component_item}>
				<div>
					{dish.weight}g of {dish.name}
				</div>
			</div>
		</Link>
	);
};
