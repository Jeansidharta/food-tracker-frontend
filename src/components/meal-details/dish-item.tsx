import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { FC } from "react";
import { ROUTES } from "../../router/routes";
import { MealComponent } from ".";

export const ComponentItem: FC<{
	mealComponent: MealComponent & { type: "dish" | "ingredient" };
}> = ({ mealComponent: { kcal, type, id, name, weight } }) => {
	return (
		<Link
			to={
				type === "dish"
					? ROUTES.DISH.ID.buildPath({ dish_id: id })
					: ROUTES.INGREDIENT.ID.buildPath({ ingredient_id: id })
			}
		>
			<div className={styles.component_item}>
				<div>
					{weight}g of {name} {typeof kcal === "number" ? `(${kcal} kcal)` : ""}
				</div>
			</div>
		</Link>
	);
};
