import { NewDishRequest, useNewDish } from "../../../api/dishes";
import {
	ActionIcon,
	Button,
	Group,
	NumberInput,
	Select,
	Stepper,
	TextInput,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../router/routes";
import { usePageNewDishLoaderData } from "./loader";

type FormValues = {
	name: string;
	prepDate: Date;
	total_weight: string;
	dish_ingredients: { ingredient_id: string; weight: string }[];
};

function formValuesToRequest(values: FormValues): NewDishRequest {
	return {
		...values,
		prep_date: values.prepDate?.getTime(),
		total_weight: values.total_weight
			? Number.parseInt(values.total_weight)
			: null,
		dish_ingredients: values.dish_ingredients?.map((i) => ({
			...i,
			ingredient_id: Number.parseInt(i.ingredient_id),
			weight: Number.parseInt(i.weight),
		})),
	};
}

enum STEPS {
	"INFORMATION",
	"INGREDIENTS",
	"TOTAL_WEIGHT",
	length,
}

export const PageNewDish: FC = () => {
	const [active, setActive] = useState<STEPS>(0);
	const ingredientsList = usePageNewDishLoaderData();
	const { newDish, isMutating: isLoadingNewDish } = useNewDish();

	const form = useForm<FormValues>({
		initialValues: {
			name: "",
			prepDate: new Date(),
			total_weight: "",
			dish_ingredients: [
				{
					ingredient_id: "",
					weight: "",
				},
			],
		},

		validate: (values) => {
			if (active === STEPS.INFORMATION) {
				return { name: !values.name.trim() ? "You must provide a name" : null };
			}

			if (active === STEPS.INGREDIENTS) {
				const problems: Record<string, string> = {};
				values.dish_ingredients.forEach(({ ingredient_id, weight }, index) => {
					if (!ingredient_id) {
						problems[`dish_ingredients.${index}.ingredient_id`] =
							"You must provide an ingredient";
					}
					if (!weight) {
						problems[`dish_ingredients.${index}.weight`] =
							"Weight cannot be zero";
					}
				});

				return problems;
			}
			if (active === STEPS.TOTAL_WEIGHT) {
				if (!values.total_weight) return {};

				return {
					total_weight:
						(Number.parseInt(values.total_weight) ?? 0) < 0
							? "Total weight cannot be less than zero"
							: null,
				};
			}

			return {};
		},
	});

	const nextStep = async () => {
		if (form.validate().hasErrors) {
			return;
		}
		if (active === STEPS.length - 1) {
			await newDish(formValuesToRequest(form.values));
			setActive(STEPS.length);
			return;
		}
		setActive(active + 1);
	};

	const prevStep = () =>
		setActive((current) => (current > 0 ? current - 1 : current));
	return (
		<div>
			<h1>New Dish</h1>

			<Stepper active={active}>
				<Stepper.Step label="Dish information">
					<TextInput
						label="Dish Name"
						placeholder="ex: baked potatoes"
						{...form.getInputProps("name")}
					/>
					<DateTimePicker
						label="Prepped at"
						valueFormat="YYYY/MM/DD - HH[h] MM[m]"
						placeholder="Pick date"
						{...form.getInputProps("prepDate")}
					/>
				</Stepper.Step>

				<Stepper.Step label="Ingredients">
					{form.values.dish_ingredients.map((_ingredient, index) => (
						<Group key={index} mt="xs">
							<Select
								style={{ flex: '1' }}
								placeholder="Select an ingredient"
								data={(ingredientsList || []).map((ingredient) => ({
									value: ingredient.id.toString(),
									label: ingredient.name,
								}))}
								searchable
								{...form.getInputProps(
									`dish_ingredients.${index}.ingredient_id`,
								)}
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
					<Group justify="center" mt="md">
						<Button onClick={() => form.insertListItem("dish_ingredients", {})}>
							Add Ingredient
						</Button>
					</Group>
				</Stepper.Step>
				<Stepper.Step label="Total weight">
					<NumberInput
						placeholder="Grams"
						label="Total dish weight"
						style={{ width: 140 }}
						min={0}
						suffix="g"
						thousandSeparator="_"
						hideControls
						{...form.getInputProps("total_weight")}
					/>
				</Stepper.Step>

				<Stepper.Completed>
					<h2>Dish created successfuly!</h2>
				</Stepper.Completed>
			</Stepper>

			<Group justify="flex-end" mt="xl">
				{active !== 0 && active !== STEPS.length && (
					<Button variant="default" onClick={prevStep}>
						Back
					</Button>
				)}
				{active !== STEPS.length && (
					<Button onClick={nextStep} loading={isLoadingNewDish}>
						Next step
					</Button>
				)}
				{active === STEPS.length && (
					<Button component={Link} to={ROUTES.DISH.path}>
						Done!
					</Button>
				)}
			</Group>
		</div>
	);
};
