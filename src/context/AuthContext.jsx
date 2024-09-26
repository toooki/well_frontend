import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLogin, setIsLogin] = useState(false);
	const [userData, setUserData] = useState({});
	const [profile, setProfile] = useState({});

	useEffect(() => {
		const storedIsLogin = localStorage.getItem("isLogin") === "true";
		const storedUserData = JSON.parse(localStorage.getItem("userData"));

		if (storedIsLogin && storedUserData) {
			setIsLogin(true);
			setUserData(storedUserData);
		}
	}, []);

	const handleLoginSuccess = (userdata) => {
		setIsLogin(true);
		setUserData(userdata);
		localStorage.setItem("isLogin", true);
		localStorage.setItem("userData", JSON.stringify(userdata));
	};

	const fetchProfile = async (username) => {
		const response = await fetch(
			`https://well1.netlify.app/userinfo?username=${username}`
		);
		const user = await response.json();
		setProfile(user[0]);
	};

	const handleLogout = () => {
		setIsLogin(false);
		setUserData({});
		localStorage.removeItem("isLogin");
		localStorage.removeItem("userData");
	};

	const updateCompleted = async (username, work) => {
		try {
			await axios.post(
				`https://well1.netlify.app/complete?username=${username}&work=${work}`
			);
			fetchProfile(username);
		} catch (error) {
			console.error("Error updating completed:", error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isLogin,
				userData,
				profile,
				handleLoginSuccess,
				handleLogout,
				fetchProfile,
				updateCompleted,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
