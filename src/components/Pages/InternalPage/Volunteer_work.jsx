import React from "react";
import "../../../css/InternalPage/VolunteerWork.css";

const VolunteerWork = ({ goToMenu }) => {
  return (
    <div className="volunteer-container">
      <div className="top-bar">
        <button className="volunteer-menu-button" onClick={() => goToMenu()}>메뉴</button>
      </div>
      <h1 className="volunteer-title">자원봉사</h1>
      <p className="volunteer-description">
        건강할 때 자원봉사클럽에 가입해서 이웃을 돕는다. <br />
        이웃을 위한 봉사가 결국 자신을 돌보는 일이다
      </p>
      <iframe
        src="/volunteer_work.html"
        title="Volunteer Work"
        className="volunteer-iframe"
      ></iframe>
    </div>
  );
};

export default VolunteerWork;
