import { FC } from "react";
import { Button, Divider, Group, Space } from "@mantine/core";
import styles from "./styles.module.css";
import { ShortMeal } from "../../components/short-meal";
import { usePageMealLoaderData } from "./loader";
import { IconPlus, IconToolsKitchen2 } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../router/routes";

export const PageMeal: FC = () => {
	const mealList = usePageMealLoaderData();

	return (
		<div className={styles.main}>
			<div className={styles.titleContainer}>
				<h1>
					Meals
					<Group mr="sm" />
					<IconToolsKitchen2
						size={30}
						style={{ position: "relative", top: 3 }}
					/>
				</h1>
			</div>

			<Button size="compact-sm" component={Link} to={ROUTES.MEAL.NEW.path}>
				<IconPlus size={20} /> <Space w="xs" />
				New Meal
			</Button>
			<Divider my="md" />
			<section className={styles.mealsContainer}>
				{mealList?.map((meal) => <ShortMeal meal={meal} key={meal.id} />)}
			</section>
		</div>
	);
};
