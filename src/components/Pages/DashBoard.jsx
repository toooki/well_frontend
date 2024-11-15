import React, { useRef, useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
// components
import ProgressBlock from "../Blocks/Chart";
import Clock from "../Blocks/Clock";
// context
import { AuthContext } from "../../context/AuthContext";
import { PageContext } from "../../context/PageContext";
// css
import "../../css/Menu/Menu.css";

const DashBoard = (props) => {
	const { currentPage } = useContext(PageContext);
	const { userData, profile, fetchProfile } = useContext(AuthContext);
	const [progressCount, setProgressCount] = useState(0);

	useEffect(() => {
		if (currentPage === "dashboard") {
			fetchProfile(userData.username);
		}
	}, [currentPage, userData.username]);

	useEffect(() => {
		if (currentPage === "dashboard") {
			setProgressCount(
				Object.values(profile).filter((value) => value === 1).length
			);
		}
	}, [profile, currentPage]);

	const handleClick = (index) => {
		props.handleItemClick(index);
	};

	const menuNames = [
		"건강체크",
		"사전의료의향서",
		"자성시간",
		"유언장",
		"자원봉사",
		"버킷리스트",
		"추억 사진",
		"마음의 빚 청산",
		"연락처 정리",
		"장례계획",
	];

	const menuItems = menuNames.map((name, i) => (
		<div className="menuItem" key={i} onClick={() => handleClick(i + 2)}>
			<button>{name}</button>
		</div>
	));

	return (
		<motion.div
			className="content"
			initial={{ opacity: 0, y: 60 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="header">
				<Clock />
			</div>
			<div className="progress-container">
				<div className="progress-text">
					전체 {menuNames.length}개 중 {progressCount}개 완료
				</div>
				<ProgressBlock per={progressCount} max={menuNames.length} />
			</div>
			<div className="dashWrapper">
				<div className="menuContainer">{menuItems}</div>
			</div>
		</motion.div>
	);
};

export default DashBoard;
