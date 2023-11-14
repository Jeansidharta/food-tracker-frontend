// import { useIngredientsList } from "@/api/ingredients";
import { useIngredientsList } from "../../api/ingredients";
import { RefreshButton } from "../../components/refresh-button";
import { ShortIngredient } from "../../components/short-ingredient";
import styles from "./styles.module.css";
import { requestResult } from "../../utils/request-result";
// import { ShortIngredient } from "@/components/shortIngredient/component";
// import { RefreshButton } from "@/components/refresh-button/component";

export const PageIngredient = () => {
	let ingredientsListRequest = useIngredientsList();

	return (
		<div className={styles.main}>
			<div className={styles.titleContainer}>
				<h1>Ingredients</h1>
				<RefreshButton
					onClick={() => ingredientsListRequest.refresh()}
					isLoading={ingredientsListRequest.isLoading}
				/>
			</div>
			<section className={styles.ingredientsContainer}>
				{requestResult(ingredientsListRequest, (ingredient) => {
					return ingredient.map((ingredient) => (
						<ShortIngredient ingredient={ingredient} key={ingredient.id} />
					));
				})}
			</section>
		</div>
	);
};
