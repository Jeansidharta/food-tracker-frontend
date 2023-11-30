import { ShortIngredient } from "./short-ingredient";
import styles from "./styles.module.css";
import { usePageIngredientsLoaderData } from "./loader";
import { Button, Divider, Group, Space } from "@mantine/core";
import { IconPlus, IconSalt } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../router/routes";

export const PageIngredient = () => {
	const ingredients = usePageIngredientsLoaderData();

	return (
		<div className={styles.main}>
			<div className={styles.titleContainer}>
				<h1>
					Ingredients
					<Group mr="sm" />
					<IconSalt size={30} style={{ position: "relative", top: 3 }} />
				</h1>
			</div>
			<Button
				size="compact-sm"
				component={Link}
				to={ROUTES.INGREDIENT.NEW.path}
			>
				<IconPlus size={20} /> <Space w="xs" />
				New Ingredient
			</Button>
			<Divider my="md" />
			<section className={styles.ingredientsContainer}>
				{ingredients?.map((ingredient) => (
					<ShortIngredient ingredient={ingredient} key={ingredient.id} />
				))}
			</section>
		</div>
	);
};
