import React, { useEffect, useState, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthContext } from '../../../context/AuthContext';

const UserComp = () => {
    const { userData, handleLogout, profile } = useContext(AuthContext);

    const animationSetting = {
        initial: {
            opacity: 0,
            y: 60
        },
        animate: {
            opacity: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            y: 60
        },
        transition: {
            duration: 0.5
        }
    };

    const renderKeyValuePairs = (data) => {
        return Object.entries(data).map(([key, value]) => (
            <div key={key}>
                {key}: {value}
            </div>
        ));
    };

    return (
        <AnimatePresence>
            <motion.div
                className='content'
                {...animationSetting}
            >
                <div>
                    <h1>유저 정보</h1>
                    {renderKeyValuePairs(profile)}
                    <br />
                    <button onClick={handleLogout}>로그아웃</button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default UserComp;