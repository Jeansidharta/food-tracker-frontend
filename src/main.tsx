import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Theme } from "./theme.tsx";
import { Router } from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Theme>
			<Router />
		</Theme>
	</React.StrictMode>,
);
