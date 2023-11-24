import { FC } from "react";
import styles from "./styles.module.css";
import ago from "s-ago";
import { Link } from "react-router-dom";
import { ROUTES } from "../../router/routes";

export const MealItem: FC<{
	meal_id: number;
	weight: number;
	eat_date: number;
	meal_description: string;
}> = ({ meal_id, weight, meal_description, eat_date }) => {
	return (
		<Link to={ROUTES.MEAL.ID.buildPath({ meal_id })}>
			<div className={styles.ingredient_item}>
				<div>
					{weight}g in {meal_description} ({ago(new Date(eat_date))})
				</div>
			</div>
		</Link>
	);
};
