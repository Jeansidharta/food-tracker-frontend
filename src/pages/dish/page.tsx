import { useDishesList } from "../../api/dishes";
import styles from "./styles.module.css";
import { requestResult } from "../../utils/request-result";
import { ShortDish } from "../../components/short-dish";
import { RefreshButton } from "../../components/refresh-button";

export default function PageDish() {
	let dishesListRequest = useDishesList();

	return (
		<div className={styles.main}>
			<div className={styles.titleContainer}>
				<h1>Dishes</h1>
				<RefreshButton
					onClick={() => dishesListRequest.refresh()}
					isLoading={dishesListRequest.isLoading}
				/>
			</div>
			<section className={styles.dishesContainer}>
				{requestResult(dishesListRequest, (dish) => {
					return dish.map((dish) => (
						<ShortDish
							ingredients_count={dish.ingredients_count}
							dish={dish}
							key={dish.id}
						/>
					));
				})}
			</section>
		</div>
	);
}
