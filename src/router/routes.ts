import { number, route } from "react-router-typesafe-routes/dom";

export const ROUTES = {
	INGREDIENT: route("ingredient", {}, { NEW: route("new") }),
	DISH: route(
		"dish",
		{},
		{
			NEW: route("new"),
			ID: route(
				":dish_id",
				{
					params: { dish_id: number().defined() },
				},
				{
					EDIT: route("edit"),
				},
			),
		},
	),
	MEAL: route(
		"meal",
		{},
		{
			NEW: route("new"),
			ID: route(
				":meal_id",
				{
					params: { meal_id: number().defined() },
				},
				{
					EDIT: route("edit"),
				},
			),
		},
	),
};
