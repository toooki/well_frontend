import React, { useEffect } from "react";
import styled from "styled-components";

const ProgressBar = styled.div`
    width: 80%;
    height: 30px;
    background-color: #aaaaaa;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.8rem;
    overflow: hidden;
    display: flex;
    align-items: center;
`;
const Progress = styled.div`
    width: ${(props) => props.width}%;
    height: 30px;
    border-radius: 12px;
    padding: 0;
    text-align: center;
    background-color: #FCDAB9;
    color: #111;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.8rem;
    &::after {
        content: "${(props) => props.value}/${(props) => props.max}";
    }
`;

const ProgressBlock = (props) => {
    let value = props.per;
    let max = props.max;

    useEffect(() => {
        value = props.per;
    }, [props.per]);

    return (
        <ProgressBar>
            <Progress width={(value * 100) / max} value={value} max={max} />
        </ProgressBar>
    );
};

export default ProgressBlock;
