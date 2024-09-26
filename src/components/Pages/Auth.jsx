import React, { useState, useContext } from 'react';
import LoginForm from '../FormLogin';
import SignupForm from '../FormSignup';
import SignoutForm from '../FormSignout';
import { PageContext } from '../../context/PageContext';
import '../../css/auth.css';

const Auth = () => {
    const [pageindex, setPageindex] = useState('0');
    const { setCurrentPage } = useContext(PageContext);

    const handlePage = (index) => {
        if (index === '0') {
            setCurrentPage('login');
        } else if (index === '1') {
            setCurrentPage('signup');
        } else if (index === '2') {
            setCurrentPage('signout');
        }
        setPageindex(index);
    };

    return (
        <div className='content'>
            {pageindex === '0' && <LoginForm index={handlePage} />}
            {pageindex === '1' && <SignupForm index={handlePage} />}
            {pageindex === '2' && <SignoutForm index={handlePage} />}
        </div>
    );
};

export default Auth;