import { FC } from "react";
import styles from "./styles.module.css";
import { useMealList } from "../../api/meals";
import { RefreshButton } from "../../components/refresh-button";
import { requestResult } from "../../utils/request-result";
import { ShortMeal } from "../../components/short-meal";

export const PageMeal: FC<{}> = ({ }) => {
	let mealListRequest = useMealList();

	return (
		<div className={styles.main}>
			<div className={styles.titleContainer}>
				<h1>Meals</h1>
				<RefreshButton
					onClick={() => mealListRequest.refresh()}
					isLoading={mealListRequest.isLoading}
				/>
			</div>
			<section className={styles.mealsContainer}>
				{requestResult(mealListRequest, (dish) => {
					return dish.map((meal) => <ShortMeal meal={meal} key={meal.id} />);
				})}
			</section>
		</div>
	);
};
