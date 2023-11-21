import styles from "./styles.module.css";
import { ShortDish } from "../../components/short-dish";
import { usePageDishLoaderData } from "./loader";

export default function PageDish() {
	const dishList = usePageDishLoaderData();

	return (
		<div className={styles.main}>
			<div className={styles.titleContainer}>
				<h1>Dishes</h1>
			</div>
			<section className={styles.dishesContainer}>
				{dishList?.map((dish) => (
					<ShortDish
						ingredients_count={dish.ingredients_count}
						dish={dish}
						key={dish.id}
					/>
				))}
			</section>
		</div>
	);
}
