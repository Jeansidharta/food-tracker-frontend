import { FC } from "react";
import styles from "./styles.module.css";
import { Button, Divider, Group, Space } from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import { RefreshProperties } from "./refresh-properties";

export const IngredientDetails: FC<{
	ingredient: {
		name: string | null;
		id: number;
		creation_date: number;
	};
	properties?: {
		kcal_100g?: number | null;
		product_name?: string | null;
		product_code: string;
		fat_100g?: number | null;
		carbohydrates_100g?: number | null;
		proteins_100g?: number | null;
	} | null;
}> = ({ ingredient, properties }) => {
	const productCode = properties?.product_code;
	return (
		<div className={styles.details_container}>
			<p>{ingredient.name}</p>
			<Divider my="md" />
			<Group mb="sm">
				<Link
					to={ROUTES.INGREDIENT.ID.SCAN.buildPath({
						ingredient_id: ingredient.id,
					})}
				>
					<Button color="teal" variant="outline" size="xs">
						Scan
						<Space w="xs" />
						<IconCamera style={{ width: "70%", height: "70%" }} stroke={1.5} />
					</Button>
				</Link>
				{productCode && (
					<RefreshProperties
						product_code={productCode}
						ingredient_id={ingredient.id}
					/>
				)}
			</Group>
			{productCode && (
				<>
					<p>
						Product Name:{" "}
						{properties.product_name ??
							"Not found. Please update open food facts"}{" "}
					</p>
					<p>
						Product code:{" "}
						<a href={`https://world.openfoodfacts.org/product/${productCode}`}>
							{productCode}
						</a>
					</p>
					<p>
						Energy per 100g:{" "}
						{properties.kcal_100g ?? "Not found. Please update open food facts"}{" "}
						Kcal
					</p>
					<p>
						Fats in 100g:{" "}
						{properties.fat_100g ?? "Not found. Please update open food facts"}{" "}
						g
					</p>
					<p>
						Carbohydrates in 100g:{" "}
						{properties.carbohydrates_100g ??
							"Not found. Please update open food facts"}{" "}
						g
					</p>
					<p>
						Protein in 100g:{" "}
						{properties.proteins_100g ??
							"Not found. Please update open food facts"}{" "}
						g
					</p>
				</>
			)}
		</div>
	);
};
