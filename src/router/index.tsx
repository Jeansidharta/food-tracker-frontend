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
import { PageGetMeal } from "../pages/meal/_id";
import { pageGetMealLoader } from "../pages/meal/_id/loader";
import { PageGetDish } from "../pages/dish/:dish-id";
import { pageGetDishLoader } from "../pages/dish/:dish-id/loader";
import { PageIngredientScan } from "../pages/ingredient/:ingredient-id/scan/page";
import { pageScanIngredientLoader } from "../pages/ingredient/:ingredient-id/scan/loader";
import { PageGetIngredient } from "../pages/ingredient/:ingredient-id/page";
import { pageGetIngredientLoader } from "../pages/ingredient/:ingredient-id/loader";
import { ErrorHandler } from "../components/error-handler";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LayoutHeader />,
		children: [
			// ---------- GET -------------
			{
				path: ROUTES.INGREDIENT.ID.path,
				element: <PageGetIngredient />,
				errorElement: <ErrorHandler />,
				loader: pageGetIngredientLoader,
			},
			{
				path: ROUTES.MEAL.ID.path,
				element: <PageGetMeal />,
				errorElement: <ErrorHandler />,
				loader: pageGetMealLoader,
			},
			{
				path: ROUTES.DISH.ID.path,
				element: <PageGetDish />,
				errorElement: <ErrorHandler />,
				loader: pageGetDishLoader,
			},
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
				errorElement: <ErrorHandler />,
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
				errorElement: <ErrorHandler />,
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
				errorElement: <ErrorHandler />,
			},
			{
				path: ROUTES.DISH.NEW.path,
				element: <PageNewDish />,
				loader: pageNewDishLoader,
				errorElement: <ErrorHandler />,
			},
			{
				path: ROUTES.MEAL.NEW.path,
				element: <PageNewMeal />,
				loader: pageNewMealLoader,
				errorElement: <ErrorHandler />,
			},

			// ---------- EDIT ------------
			{
				path: ROUTES.MEAL.ID.EDIT.path,
				element: <PageEditMeal />,
				loader: pageEditMealLoader,
				errorElement: <ErrorHandler />,
			},
			{
				path: ROUTES.DISH.ID.EDIT.path,
				element: <PageEditDish />,
				loader: pageEditDishLoader,
				errorElement: <ErrorHandler />,
			},
			{
				path: ROUTES.INGREDIENT.ID.SCAN.path,
				element: <PageIngredientScan />,
				loader: pageScanIngredientLoader,
				errorElement: <ErrorHandler />,
			},
		],
	},
]);

export const Router: FC<unknown> = () => {
	return <RouterProvider router={router} />;
};
