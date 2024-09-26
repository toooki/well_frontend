import React, { useRef, useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
//components
import ProgressBlock from "../Blocks/Chart";
import Clock from "../Blocks/Clock";
//context
import { AuthContext } from "../../context/AuthContext";
import { PageContext } from "../../context/PageContext";
//svg
import { ReactComponent as Left } from "../../assets/icons/Left.svg";
import { ReactComponent as Right } from "../../assets/icons/Right.svg";
//css
import "../../css/Menu/Menu.css";

const DashBoard = (props) => {
    const menuContainerRef = useRef(null);
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
            console.log("progress:", progressCount);
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

    const slideLeft = () => {
        if (menuContainerRef.current) {
            menuContainerRef.current.scrollTo({
                left: menuContainerRef.current.scrollLeft - 500,
                behavior: "smooth",
            });
        }
    };

    const slideRight = () => {
        if (menuContainerRef.current) {
            menuContainerRef.current.scrollTo({
                left: menuContainerRef.current.scrollLeft + 500,
                behavior: "smooth",
            });
        }
    };

    return (
        <motion.div
            className="content"
            initial={{
                opacity: 0,
                y: 60,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.5,
            }}
        >
            <Clock />
            <div className="dashWrapper">
                <button className="leftButton" onClick={slideLeft}>
                    <Left />
                </button>
                <div className="menuContainer" ref={menuContainerRef}>
                    {menuItems}
                </div>
                <button className="rightButton" onClick={slideRight}>
                    <Right />
                </button>
            </div>
            <ProgressBlock per={progressCount} max={10} />
            <div className="menuSelect">{menuItems}</div>
        </motion.div>
    );
};

export default DashBoard;