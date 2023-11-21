import { Link, Outlet } from "react-router-dom";
import style from "./style.module.css";
import { FC } from "react";
import { ROUTES } from "../../router/routes";

export const LayoutActions: FC = () => {
	return (
		<>
			<Outlet />
			<div className={style.spacing} />
			<div className={style.actionsBar}>
				<Link to={ROUTES.MEAL.NEW.path}>I'm having a meal</Link>
				<Link to={ROUTES.DISH.NEW.path}>I'm cooking a meal</Link>
				<Link to={ROUTES.INGREDIENT.NEW.path}>I bought an ingredient</Link>
			</div>
		</>
	);
};
