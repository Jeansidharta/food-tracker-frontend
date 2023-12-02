import { FC } from "react";
import styles from "./styles.module.css";
import { ActionIcon, Divider } from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../router/routes";

export const IngredientDetails: FC<{
	ingredient: {
		name?: string | null;
		id: number;
		creation_date: number;
		kcal_100g?: number | null;
		product_code?: string | null;
	};
}> = ({ ingredient }) => {
	return (
		<div className={styles.details_container}>
			<p>{ingredient.name}</p>
			<Divider my="md" />
			<Link
				to={ROUTES.INGREDIENT.ID.SCAN.buildPath({
					ingredient_id: ingredient.id,
				})}
			>
				<ActionIcon size="xs">
					<IconCamera style={{ width: "70%", height: "70%" }} stroke={1.5} />
				</ActionIcon>
			</Link>
			{ingredient.product_code && (
				<>
					<p>
						Product code:{" "}
						<a
							href={`https://world.openfoodfacts.org/product/${ingredient.product_code}`}
						>
							{ingredient.product_code}
						</a>
					</p>
					<p>
						Energy per 100g:{" "}
						{ingredient.kcal_100g || "Not found. Please update open food facts"}{" "}
						Kcal
					</p>
				</>
			)}
		</div>
	);
};
