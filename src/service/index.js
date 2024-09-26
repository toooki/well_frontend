import "./style.css";

export const getResizeEventListener = (standardWidth, standardHeight) => {
    return () => {
        const body = document.querySelector("body");
        const root = document.querySelector("#root");

        // 원하는 해상도로 width, height 고정
        if (body.clientWidth < 1024) {
            root.style.width = `${body.clientWidth}px`;
            root.style.height = `${body.clientHeight}px`;
        } else {
            root.style.width = `${standardWidth}px`;
            root.style.height = `${standardHeight}px`;
        }
    };
};
