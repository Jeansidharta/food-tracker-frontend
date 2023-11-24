import { FC, useMemo, useState } from "react";
import ago from "s-ago";
import styles from "./styles.module.css";
import {
	ActionIcon,
	Alert,
	Autocomplete,
	Button,
	Divider,
	Group,
	NumberInput,
	Radio,
	Select,
	Switch,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { usePageEditMealLoaderData } from "./loader";
import { DateTimePicker } from "@mantine/dates";
import { IconTrash } from "@tabler/icons-react";
import { fetcher } from "../../../../api/fetcher";
import { ROUTES } from "../../../../router/routes";
import { useNavigate } from "react-router-dom";
import { useTypedSearchParams } from "react-router-typesafe-routes/dom";

type FormValues = {
	description: string;
	id: number;
	eat_date?: Date | null;
	duration?: number | null;
	components: {
		component_id: string;
		weight: string;
		component_type: "Ingredient" | "Dish";
	}[];
};

const editMeal = fetcher.path("/meal/{meal_id}/").method("post").create();

type EditMealParams = Parameters<typeof editMeal>[0];

function formValuesToRequest(values: FormValues): EditMealParams {
	return {
		meal_id: values.id,
		description: values.description,
		eat_date: values.eat_date?.getTime(),
		duration: values.duration,
		components: values.components.map((i) => ({
			dish_id:
				i.component_type == "Dish"
					? Number.parseInt(i.component_id)
					: undefined,
			ingredient_id:
				i.component_type == "Ingredient"
					? Number.parseInt(i.component_id)
					: undefined,
			weight: Number.parseInt(i.weight),
		})),
	};
}

export const PageEditMeal: FC<object> = () => {
	const [
		{ meal, dishes, ingredients },
		allIngredientsList,
		allDishesList,
		descriptions,
	] = usePageEditMealLoaderData();
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const navigate = useNavigate();
	const [{ is_finished: show_is_finished }] = useTypedSearchParams(
		ROUTES.MEAL.ID.EDIT,
	);

	const form = useForm<FormValues>({
		initialValues: {
			id: meal.id,
			description: meal.description ?? "",
			duration: meal.duration,
			eat_date:
				typeof meal.eat_date == "number" ? new Date(meal.eat_date) : null,
			components: useMemo(
				() => [
					...dishes.map((i) => ({
						weight: i.weight.toString(),
						component_id: i.id.toString(),
						component_type: "Dish" as const,
					})),
					...ingredients.map((i) => ({
						weight: i.weight.toString(),
						component_id: i.id.toString(),
						component_type: "Ingredient" as const,
					})),
				],
				[dishes, ingredients],
			),
		},
		validate: {},
	});
	async function handleSubmit(values: FormValues) {
		try {
			setIsLoading(true);
			await editMeal(formValuesToRequest(values));
			setIsSuccess(true);
		} finally {
			setIsLoading(false);
		}
	}

	function changeIsFinished(is_finished: boolean) {
		navigate(ROUTES.MEAL.ID.EDIT.buildSearch({ is_finished }));
	}

	const filteredDishList = useMemo(
		() =>
			show_is_finished
				? allDishesList
				: allDishesList?.filter((d) => !d.is_finished),
		[show_is_finished, allDishesList],
	);

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<h1>Edit meal</h1>
			<Group>
				<Switch
					label="Show finished dishes"
					checked={Boolean(show_is_finished)}
					onChange={(v) => changeIsFinished(v.target.checked)}
				/>
			</Group>
			<Divider my="md" />
			<Autocomplete
				label="Meal description"
				placeholder="Ex: lunch, dinner, etc..."
				data={descriptions ?? []}
				{...form.getInputProps(`description`)}
			/>
			<DateTimePicker
				label="Eat date"
				valueFormat="YYYY/MM/DD - HH[h] MM[m]"
				placeholder="Pick date"
				clearable
				{...form.getInputProps("eat_date")}
			/>
			<NumberInput
				label="Duration"
				placeholder="minutes"
				style={{ width: 140 }}
				min={0}
				suffix="min"
				thousandSeparator="_"
				hideControls
				{...form.getInputProps(`duration`)}
			/>
			<Divider mt="lg" />
			<div className={styles.componentsContainer}>
				<p>Components</p>
				{form.values.components.map((component, index) => (
					<Group key={index} mt="xs">
						<Radio.Group
							style={{ width: "100%" }}
							{...form.getInputProps(`components.${index}.component_type`)}
						>
							<Group mt="xs">
								<Radio value="Ingredient" label="Ingredient" />
								<Radio value="Dish" label="Dish" />
							</Group>
						</Radio.Group>
						{component.component_type == "Ingredient" && (
							<Select
								style={{ flex: "1" }}
								placeholder="Select an ingredient"
								data={(allIngredientsList || []).map((component) => ({
									value: component.id.toString(),
									label: component?.name || "",
								}))}
								searchable
								{...form.getInputProps(`components.${index}.component_id`)}
							/>
						)}
						{form.values.components[index].component_type == "Dish" && (
							<Select
								style={{ flex: "1" }}
								placeholder="Select a dish"
								data={(filteredDishList || []).map((component) => ({
									value: component.id.toString(),
									label: `${component?.name || ""} (${ago(
										new Date(component.creation_date),
									)})`,
								}))}
								searchable
								{...form.getInputProps(`components.${index}.component_id`)}
							/>
						)}
						<NumberInput
							placeholder="Grams"
							style={{ width: 140 }}
							min={0}
							suffix="g"
							thousandSeparator="_"
							hideControls
							{...form.getInputProps(`components.${index}.weight`)}
						/>
						<ActionIcon
							color="red"
							onClick={() => form.removeListItem("components", index)}
						>
							<IconTrash size="1rem" />
						</ActionIcon>
					</Group>
				))}
				<Group justify="end" mt="md">
					<Button
						onClick={() =>
							form.insertListItem("components", {
								component_type: "Ingredient",
							})
						}
					>
						Add component
					</Button>
				</Group>
				<Divider mt="lg" />
				<Button type="submit" fullWidth loading={isLoading}>
					Submit
				</Button>
				{isSuccess && (
					<Alert variant="light" color="green" title="Success!" mt="md">
						Meal edited successfuly
					</Alert>
				)}
			</div>
		</form>
	);
};
