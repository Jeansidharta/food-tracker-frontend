import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PageIngredient } from "../pages/ingredient/page";
import { ROUTES } from "./routes";
import PageDish from "../pages/dish/page";
import { LayoutHeader } from "../layout/with-header";
import { LayoutActions } from "../layout/with-actions";
import { PageEditDish } from "../pages/dish/:dish-id/edit/page";
import { PageMeal } from "../pages/meal";
import { PageNewDish } from "../pages/dish/new/page";
import { PageNewMeal } from "../pages/meal/new/page";
import { PageNewIngredient } from "../pages/ingredient/new/page";
import { pageEditDishLoader } from "../pages/dish/:dish-id/edit/loader";
import { pageNewMealLoader } from "../pages/meal/new/loader";
import { pageIngredientsLoader } from "../pages/ingredient/loader";
import { pageNewDishLoader } from "../pages/dish/new/loader";
import { pageDishLoader } from "../pages/dish/loader";
import { pageMealLoader } from "../pages/meal/loader";
import { PageEditMeal } from "../pages/meal/_id/edit";
import { pageEditMealLoader } from "../pages/meal/_id/edit/loader";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LayoutHeader />,
		children: [
			// ---------- LIST ------------
			{
				path: ROUTES.MEAL.path,
				element: <LayoutActions />,
				children: [
					{
						path: ROUTES.MEAL.path,
						element: <PageMeal />,
						loader: pageMealLoader,
					},
				],
			},
			{
				path: ROUTES.DISH.path,
				element: <LayoutActions />,
				children: [
					{
						path: ROUTES.DISH.path,
						element: <PageDish />,
						loader: pageDishLoader,
					},
				],
			},
			{
				path: ROUTES.INGREDIENT.path,
				element: <LayoutActions />,
				children: [
					{
						path: ROUTES.INGREDIENT.path,
						element: <PageIngredient />,
						loader: pageIngredientsLoader,
					},
				],
			},

			// ---------- NEW -------------
			{
				path: ROUTES.INGREDIENT.NEW.path,
				element: <PageNewIngredient />,
			},
			{
				path: ROUTES.DISH.NEW.path,
				element: <PageNewDish />,
				loader: pageNewDishLoader,
			},
			{
				path: ROUTES.MEAL.NEW.path,
				element: <PageNewMeal />,
				loader: pageNewMealLoader,
			},

			// ---------- EDIT ------------
			{
				path: ROUTES.MEAL.ID.EDIT.path,
				element: <PageEditMeal />,
				loader: pageEditMealLoader,
			},
			{
				path: ROUTES.DISH.ID.EDIT.path,
				element: <PageEditDish />,
				loader: pageEditDishLoader,
			},
		],
	},
]);

export const Router: FC<unknown> = () => {
	return <RouterProvider router={router} />;
};
