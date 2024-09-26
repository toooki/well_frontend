import React, { useContext, useState } from 'react';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';


import { AnimatePresence, motion } from 'framer-motion';
import '../../css/Modules/Nav.css';
import PageController from './Pages';
import { PageContext } from '../../context/PageContext';

const Nav = () => {
    const { currentPage, changePage } = useContext(PageContext);
    const [homebutton, setHomebutton] = useState(false);
    const [aboutbutton, setAboutbutton] = useState(false);
    const [servicesbutton, setServicesbutton] = useState(false);
    const [helpbutton, setHelpbutton] = useState(false);
    const [morebutton, setMorebutton] = useState(false);

    const handleHome = () => {
        changePage('dashboard');
    }

    const handleAbout = () => {
        setAboutbutton(true);
    }

    const handleServices = () => {
        setServicesbutton(true);
    }

    const handleHelp = () => {
        setHelpbutton(true);
    }

    const handleMore = () => {
        if (morebutton) {
            changePage('dashboard');
        } else {
            changePage('mypage');
        }
        setMorebutton(!morebutton);
        return;
    }
    return (
        <motion.div
            className='nav'
            initial={{
                y: 100
            }}
            animate={{
                y: 0
            }}
            transition={{
                ease: 'easeInOut',
                delay: 0.5,
                duration: 0.5
            }}>
            <button>-</button>
            <div id="line"></div>
            <button>-</button>
            <div id="line"></div>
            <button onClick={handleHome}>
                <HomeIcon />
            </button>
            <div id="line"></div>
            <button>-</button>
            <div id="line"></div>
            <button onClick={handleMore}>
                <UserIcon />
            </button>
        </motion.div>
    );
};

export default Nav;