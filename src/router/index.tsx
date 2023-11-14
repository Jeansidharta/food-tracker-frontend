import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

export const Router: FC<{}> = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LayoutHeader />}>
					{/* New Pages */}
					<Route path={ROUTES.MEAL.NEW.path} element={<PageNewMeal />} />
					<Route path={ROUTES.DISH.NEW.path} element={<PageNewDish />} />
					<Route
						path={ROUTES.INGREDIENT.NEW.path}
						element={<PageNewIngredient />}
					/>

					{/* Edit Pages */}
					<Route path={ROUTES.DISH.ID.EDIT.path} element={<PageEditDish />} />
					<Route path={ROUTES.MEAL.ID.EDIT.path} element={<PageEditDish />} />

					{/* List Pages */}
					<Route path={ROUTES.INGREDIENT.path} element={<LayoutActions />}>
						<Route path={ROUTES.INGREDIENT.path} element={<PageIngredient />} />
					</Route>
					<Route path={ROUTES.DISH.path} element={<LayoutActions />}>
						<Route path={ROUTES.DISH.path} element={<PageDish />} />
					</Route>
					<Route path={ROUTES.MEAL.path} element={<LayoutActions />}>
						<Route path={ROUTES.MEAL.path} element={<PageMeal />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
