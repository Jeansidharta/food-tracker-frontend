import styles from "./styles.module.css";
import { ShortDish } from "../../components/short-dish";
import { usePageDishLoaderData } from "./loader";
import { Divider, Group, Switch } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useTypedSearchParams } from "react-router-typesafe-routes/dom";
import { ROUTES } from "../../router/routes";

export default function PageDish() {
	const dishList = usePageDishLoaderData();
	const navigate = useNavigate();
	const [{ is_finished }] = useTypedSearchParams(ROUTES.DISH);

	function changeIsFinished(is_finished: boolean) {
		navigate(ROUTES.DISH.buildSearch({ is_finished }));
	}

	return (
		<div className={styles.main}>
			<div className={styles.titleContainer}>
				<h1>Dishes</h1>
			</div>
			<Group>
				<Switch
					label="Is finished"
					checked={Boolean(is_finished)}
					onChange={(v) => changeIsFinished(v.target.checked)}
				/>
			</Group>
			<Divider my="sm" />
			<section className={styles.dishesContainer}>
				{dishList?.map((dish) => <ShortDish dish={dish} key={dish.id} />)}
			</section>
		</div>
	);
}
