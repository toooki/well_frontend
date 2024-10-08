import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { getResizeEventListener } from "./service/index";
import Main from "./components/Main";
import Page from "./components/Modules/Pages";
import formData from "./components/FormLogin";

const App = () => {
	useEffect(() => {
		const FixRatio = getResizeEventListener(1024, 1366);
		window.onresize = FixRatio;
		FixRatio();

		return () => {
			window.onresize = null;
		};
	}, []);

	return (
		<Routes>
			<Route path="/" element={<Main />} />
			<Route
				path="main/"
				element={
					<Page username={formData.username} password={formData.password} />
				}
			/>
		</Routes>
	);
};

const AppWrapper = () => {
	return (
		<Router>
			<App />
		</Router>
	);
};

export default AppWrapper;
