import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' }; // 초를 제외한 시각 옵션

    return (
        <div className="Clock">
            <div>{currentTime.toLocaleDateString('ko-KR', dateOptions)}</div>
            <div>{currentTime.toLocaleTimeString('ko-KR', timeOptions)}</div>
        </div>
    );
};

export default Clock;