import styles from "./styles.module.css";
import { FC } from "react";
import ago from "s-ago";

type Ingredient = {
	id: number;
	creation_date: number;
	name: string;
};

export const ShortIngredient: FC<{
	ingredient: Ingredient;
}> = ({ ingredient }) => {
	return (
		<div className={styles.main}>
			<div>{ingredient.name}</div>
			<div className={styles.creationDate}>
				{ago(new Date(ingredient.creation_date))}
			</div>
		</div>
	);
};
