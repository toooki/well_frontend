import React, { useContext } from "react";
import "../../css/Menu/Menu.css";

import DashBoard from "../Pages/DashBoard";
import HealthChecklist from "../Pages/InternalPage/HealthChecklist";
import Advance_directive from "../Pages/InternalPage/Advance_directive";
import Magnetization_time from "../Pages/InternalPage/Magnetization_time";
import Will_write from "../Pages/InternalPage/Will_write";
import Volunteer_work from "../Pages/InternalPage/Volunteer_work";
import Checklist from "../Pages/InternalPage/Checklist";
import Memory_locker from "../Pages/InternalPage/Memory_locker";
import MindChecklist from "../Pages/InternalPage/MindChecklist";
import Number_check from "../Pages/InternalPage/Number_check";
import Funeral_planning from "../Pages/InternalPage/Funeral_planning";
import UserComp from "../Pages/InternalPage/Profile";

import { PageContext } from "../../context/PageContext";
import { AuthContext } from "../../context/AuthContext";

const PageController = () => {
    const { userData } = useContext(AuthContext);
    const { currentPage, changePage } = useContext(PageContext);

    const list = [
        "dashboard",
        "mypage",
        "healthChecklist",
        "advance_directive",
        "magnetization_time",
        "will_write",
        "volunteer_work",
        "checklist",
        "memory_locker",
        "mindChecklist",
        "number_check",
        "funeral_planning",
    ];

    const handleItemClick = (index) => {
        for (let i = 0; i < list.length; i++) {
            if (index === i) {
                changePage(list[i]);
            }
        }
    };

    const goToMenu = () => {
        changePage("dashboard");
    };

    const commonProps = {
        username: userData.username,
        password: userData.password,
        goToMenu: goToMenu,
    };

    return (
        <div className="page">
            {currentPage === "dashboard" && (
                <DashBoard {...commonProps} handleItemClick={handleItemClick} />
            )}
            {currentPage === "mypage" && <UserComp {...commonProps} />}
            {currentPage === "healthChecklist" && (
                <HealthChecklist {...commonProps} />
            )}
            {currentPage === "advance_directive" && (
                <Advance_directive {...commonProps} />
            )}
            {currentPage === "magnetization_time" && (
                <Magnetization_time {...commonProps} />
            )}
            {currentPage === "will_write" && <Will_write {...commonProps} />}
            {currentPage === "volunteer_work" && (
                <Volunteer_work {...commonProps} />
            )}
            {currentPage === "checklist" && <Checklist {...commonProps} />}
            {currentPage === "memory_locker" && (
                <Memory_locker {...commonProps} />
            )}
            {currentPage === "mindChecklist" && (
                <MindChecklist {...commonProps} />
            )}
            {currentPage === "number_check" && (
                <Number_check {...commonProps} />
            )}
            {currentPage === "funeral_planning" && (
                <Funeral_planning {...commonProps} />
            )}
        </div>
    );
};

export default PageController;
