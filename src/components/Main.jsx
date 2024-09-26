import React, { useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Auth from "./Pages/Auth";
import PageController from "./Modules/Pages";
import Nav from "./Modules/Nav";
import { AuthContext } from "../context/AuthContext";
import { PageProvider } from "../context/PageContext";
import "../css/auth.css";

const Main = () => {
    const { isLogin, userData } = useContext(AuthContext);

    const animationSetting = {
        initial: {
            opacity: 0,
            y: -100,
        },
        animate: {
            opacity: 1,
            y: 0,
        },
        transition: {
            delay: 1,
            ease: "easeInOut",
            duration: 0.5,
        },
    };

    const loginProps = {
        username: userData.username,
        password: userData.password,
    };

    return (
        <AnimatePresence>
            <motion.div className="Main" {...animationSetting}>
                <PageProvider>
                    {!isLogin ? <Auth /> : <PageController {...loginProps} />}
                    {isLogin ? <Nav /> : null}
                </PageProvider>
            </motion.div>
        </AnimatePresence>
    );
};

export default Main;
