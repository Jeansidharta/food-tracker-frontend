import { FC, Fragment, useMemo } from "react";
import { Button, Divider, Group, Space } from "@mantine/core";
import styles from "./styles.module.css";
import { ShortMeal } from "../../components/short-meal";
import { usePageMealLoaderData } from "./loader";
import { format as formatAgo } from "timeago.js";
import {
	IconPlus,
	IconToolsKitchen2,
	IconArrowDown,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../router/routes";

export const PageMeal: FC = () => {
	const mealList = usePageMealLoaderData();

	const [uneatenMeals, eatenMeals] = useMemo(() => {
		const uneatenMeals = [];
		for (const meal of mealList || []) {
			if (meal.eat_date) break;
			uneatenMeals.push(meal);
		}
		const eatenMeals = mealList?.slice(uneatenMeals.length);
		return [uneatenMeals, eatenMeals];
	}, [mealList]);

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
			{uneatenMeals.length > 0 && (
				<>
					<h2>Not eaten yet</h2>
					{uneatenMeals.map((meal) => (
						<ShortMeal meal={meal} key={meal.id} />
					))}
					<Divider my="md" />
				</>
			)}
			<section className={styles.mealsContainer}>
				{eatenMeals?.map((meal, index) => {
					const prevMeal = eatenMeals[index - 1];
					const mealDate = meal.eat_date && new Date(meal.eat_date);
					const prevMealDate =
						prevMeal?.eat_date && new Date(prevMeal.eat_date);
					return (
						<Fragment key={meal.id}>
							{prevMealDate && mealDate && (
								<Group justify="end">
									{formatAgo(mealDate, undefined, {
										relativeDate: prevMealDate,
									}).replace("ago", "after")}
									<IconArrowDown color="var(--color-secondary)" />
								</Group>
							)}
							<ShortMeal meal={meal} />
						</Fragment>
					);
				})}
			</section>
		</div>
	);
};
