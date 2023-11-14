import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./style.module.css";
import logo from "../../assets/logo.svg";
import { ROUTES } from "../../router/routes";
import { FC } from "react";

const links: { href: (typeof ROUTES)[keyof typeof ROUTES]; text: string }[] = [
	{ href: ROUTES.MEAL, text: "Meals" },
	{ href: ROUTES.DISH, text: "Dishes" },
	{ href: ROUTES.INGREDIENT, text: "Ingredients" },
];

function Navbar() {
	let { pathname } = useLocation();
	return (
		<header className={styles.navbar}>
			<img src={logo} width={32} height={32} alt="logo" />
			<nav>
				<ul>
					{links.map(({ href: { path }, text }) => (
						<li key={path}>
							<Link
								to={path}
								className={path == pathname ? styles.selected : ""}
							>
								{text}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}

export const LayoutHeader: FC<{}> = () => {
	return (
		<>
			<Navbar />
			<main className={styles.main}>
				<div className={styles.maxWidth}>
					<Outlet />
				</div>
			</main>
		</>
	);
};
