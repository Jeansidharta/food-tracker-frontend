import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { FC } from "react";
import { ROUTES } from "../../router/routes";

export const ComponentItem: FC<{
	mealComponent: {
		id: number;
		name?: string | undefined | null;
		weight: number;
		type: "dish" | "ingredient";
	};
}> = ({ mealComponent }) => {
	return (
		<Link
			to={
				mealComponent.type === "dish"
					? ROUTES.DISH.ID.buildPath({ dish_id: mealComponent.id })
					: ROUTES.INGREDIENT.ID.buildPath({ ingredient_id: mealComponent.id })
			}
		>
			<div className={styles.component_item}>
				<div>
					{mealComponent.weight}g of {mealComponent.name}
				</div>
			</div>
		</Link>
	);
};
