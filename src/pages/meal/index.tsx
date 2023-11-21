import { FC } from "react";
import styles from "./styles.module.css";
import { ShortMeal } from "../../components/short-meal";
import { usePageMealLoaderData } from "./loader";

export const PageMeal: FC = () => {
	const mealList = usePageMealLoaderData();

	return (
		<div className={styles.main}>
			<div className={styles.titleContainer}>
				<h1>Meals</h1>
			</div>
			<section className={styles.mealsContainer}>
				{mealList?.map((meal) => <ShortMeal meal={meal} key={meal.id} />)}
			</section>
		</div>
	);
};
