import styles from "./styles.module.css";
import { ShortDish } from "../../components/short-dish";
import cookingPot from "../../assets/cooking-pot-primary.svg";
import { usePageDishLoaderData } from "./loader";
import { Divider, Group, Switch, Image, Button, Space } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useTypedSearchParams } from "react-router-typesafe-routes/dom";
import { ROUTES } from "../../router/routes";
import { IconPlus } from "@tabler/icons-react";

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
				<h1>
					Dishes
					<Image
						ml="xs"
						radius="md"
						src={cookingPot}
						h={30}
						w={30}
						style={{ position: "relative", bottom: 0, display: "inline" }}
					/>
				</h1>
			</div>
			<Button size="compact-sm" component={Link} to={ROUTES.DISH.NEW.path}>
				<IconPlus size={20} /> <Space w="xs" />
				New Dish
			</Button>
			<Divider my="md" />
			<p>Filters:</p>
			<Group mb="md">
				<Switch
					label="Is finished"
					checked={Boolean(is_finished)}
					onChange={(v) => changeIsFinished(v.target.checked)}
				/>
			</Group>
			<Divider my="md" />
			<section className={styles.dishesContainer}>
				{dishList?.map((dish) => <ShortDish dish={dish} key={dish.id} />)}
			</section>
		</div>
	);
}
