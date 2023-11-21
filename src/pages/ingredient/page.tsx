import { ShortIngredient } from "../../components/short-ingredient";
import styles from "./styles.module.css";
import { usePageIngredientsLoaderData } from "./loader";

export const PageIngredient = () => {
	const ingredients = usePageIngredientsLoaderData();

	return (
		<div className={styles.main}>
			<div className={styles.titleContainer}>
				<h1>Ingredients</h1>
			</div>
			<section className={styles.ingredientsContainer}>
				{ingredients?.map((ingredient) => (
					<ShortIngredient ingredient={ingredient} key={ingredient.id} />
				))}
			</section>
		</div>
	);
};
