import { FC, useState } from "react";
import styles from "./styles.module.css";
import {
	ActionIcon,
	Alert,
	Button,
	Divider,
	Group,
	NumberInput,
	Select,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { usePageEditDishLoaderData } from "./loader";
import { DateTimePicker } from "@mantine/dates";
import { IconTrash } from "@tabler/icons-react";
import { fetcher } from "../../../../api/fetcher";

type FormValues = {
	name: string;
	id: number;
	prepDate?: Date;
	total_weight: string;
	dish_ingredients: { ingredient_id: string; weight: string }[];
};

const editDish = fetcher.path("/dish/{dish_id}/").method("post").create();

type EditDishParams = Parameters<typeof editDish>[0];

function formValuesToRequest(values: FormValues): EditDishParams {
	return {
		dish_id: values.id,
		name: values.name,
		prep_date: values.prepDate?.getTime(),
		total_weight: Number(values.total_weight),
		dish_ingredients: values.dish_ingredients.map((i) => ({
			ingredient_id: Number(i.ingredient_id),
			weight: Number(i.weight),
		})),
	};
}

export const PageEditDish: FC<object> = () => {
	const [{ dish, added_ingredients }, ingredientsList] =
		usePageEditDishLoaderData();
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const form = useForm<FormValues>({
		initialValues: {
			id: dish.id,
			name: dish.name ?? "",
			prepDate: dish.prep_date ? new Date(dish.prep_date) : undefined,
			total_weight: dish.total_weight.toString(),
			dish_ingredients: added_ingredients.map((i) => ({
				weight: i.weight.toString(),
				ingredient_id: i.ingredient_id.toString(),
			})),
		},
		validate: {},
	});
	async function handleSubmit(values: FormValues) {
		try {
			setIsLoading(true);
			await editDish(formValuesToRequest(values));
			setIsSuccess(true);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<TextInput label="name" {...form.getInputProps("name")} />
			<DateTimePicker
				label="Prepped at"
				valueFormat="YYYY/MM/DD - HH[h] MM[m]"
				placeholder="Pick date"
				{...form.getInputProps("prepDate")}
			/>
			<NumberInput
				label="Total Weight"
				placeholder="Grams"
				style={{ width: 140 }}
				min={0}
				suffix="g"
				thousandSeparator="_"
				hideControls
				{...form.getInputProps(`total_weight`)}
			/>
			<Divider mt="lg" />
			<div className={styles.ingredientsContainer}>
				<p>Ingredients</p>
				{form.values.dish_ingredients.map((_ingredient, index) => (
					<Group key={index} mt="xs">
						<Select
							style={{ flex: "1" }}
							placeholder="Select an ingredient"
							data={(ingredientsList || []).map((ingredient) => ({
								value: ingredient.id.toString(),
								label: ingredient.name,
							}))}
							searchable
							{...form.getInputProps(`dish_ingredients.${index}.ingredient_id`)}
						/>
						<NumberInput
							placeholder="Grams"
							style={{ width: 140 }}
							min={0}
							suffix="g"
							thousandSeparator="_"
							hideControls
							{...form.getInputProps(`dish_ingredients.${index}.weight`)}
						/>
						<ActionIcon
							color="red"
							onClick={() => form.removeListItem("dish_ingredients", index)}
						>
							<IconTrash size="1rem" />
						</ActionIcon>
					</Group>
				))}
				<Group justify="end" mt="md">
					<Button onClick={() => form.insertListItem("dish_ingredients", {})}>
						Add Ingredient
					</Button>
				</Group>
				<Divider mt="lg" />
				<Button type="submit" fullWidth loading={isLoading}>
					Submit
				</Button>
				{isSuccess && (
					<Alert variant="light" color="green" title="Success!" mt="md">
						Dish edited successfuly
					</Alert>
				)}
			</div>
		</form>
	);
};
