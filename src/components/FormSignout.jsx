import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import PageController from './Modules/Pages';
import Auth from './Pages/Auth';
import '../css/auth.css';

const SignoutForm = (props) => {
    //입력 데이터 수발신 처리
    const [formData, setFormData] = useState({ requestId: '', password: '' });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSingout = async () => {
        try {
            const response = await axios.post('http://localhost:8080/signout', {
                requestId: formData.requestId,
                password: formData.password
            });
            console.log(response.data); // 서버로부터 받은 응답 확인
            alert('회원탈퇴에 성공했습니다.');
            props.index('0');
        } catch (error) {
            console.error('Error:', error);
            alert('회원탈퇴에 실패했습니다. 다시 시도해주세요.');
        }
    };
    //렌더링 처리
    return (
        <AnimatePresence>
            <motion.div
                className='auth'
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2>회원탈퇴</h2>
                <div className="tempbox"></div>
                <form>
                    <div id='auth'>
                        <label>
                            <p>아이디:</p>
                            <input
                                type="text"
                                name="requestId"
                                value={formData.requestId}
                                onChange={handleChange} />
                        </label>
                        <label>
                            <p>비밀번호:</p>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange} />
                        </label>
                        <div className='col2'>
                            <button className='red' type="button" onClick={() => props.index('0')}>뒤로가기</button>
                            <button type="button" onClick={handleSingout}>회원탈퇴</button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </AnimatePresence>
    );
};

export default SignoutForm;