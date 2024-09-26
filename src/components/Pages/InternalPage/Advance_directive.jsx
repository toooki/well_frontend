import React, { useState } from 'react';
import '../../../css/InternalPage/Advance_directive.css';

const AdvanceDirective = ({ goToMenu }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleImageClick = (e) => {
    if (!isZoomed) {
      // 확대
      const img = e.target;
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left; // 클릭한 위치의 X 좌표
      const y = e.clientY - rect.top;  // 클릭한 위치의 Y 좌표

      setClickPosition({ x, y });
      setOffset({ x: 0, y: 0 });
    } else {
      // 축소
      setClickPosition({ x: 0, y: 0 });
      setOffset({ x: 0, y: 0 });
    }
    setIsZoomed(!isZoomed);
  };

  const handleMouseDown = (e) => {
    if (isZoomed) {
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e) => {
    if (isZoomed && dragStart.x !== 0 && dragStart.y !== 0) {
      setOffset({
        x: offset.x + (e.clientX - dragStart.x),
        y: offset.y + (e.clientY - dragStart.y),
      });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setDragStart({ x: 0, y: 0 });
  };

  return (
    <div
      className='Advance_directive_container'
      style={{ position: 'relative', textAlign: 'center' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} 
    >
       <div className="top-bar">
        <button className='Advance_directive_main' onClick={() => goToMenu()} > 메뉴</button>
       </div>

      <div>
        <p>사전연명의료의향서를 작성하기 위하여 </p>
        <p>반드시 보건복지부의 지정을 받은 </p>
        <p>사전연명의료의향서 등록기관을 방문하여 작성해야합니다</p>
        <p>아래는 사전의료의향서 사진입니다</p>
        <p>사진을 터치하면 터치한부분이 확대됩니다</p>
      </div>

      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          cursor: isZoomed ? 'move' : 'zoom-in',
        }}
      >
        <img
          src="./사전의료의향서.png"
          style={{
            width: isZoomed ? '200%' : '100%',
            transform: isZoomed
              ? `translate(${offset.x - clickPosition.x}px, ${offset.y - clickPosition.y}px)`
              : 'translate(0, 0)',
            transition: isZoomed ? 'none' : 'transform 0.3s ease',
            display: 'block',
            margin: '0 auto',
          }}
          alt="사전의료의향서"
          onClick={handleImageClick}
          onMouseDown={handleMouseDown}
        />
      </div>

      <button className='Advance_directive_search' onClick={() => window.open('https://www.lst.go.kr/addt/composableorgan.do', '_blank')}
      style={{ marginTop: '10px' }}>
        주변 사전 의료의향서 작성기관 찾기
      </button>
      <br/>

    </div>
  );
};

export default AdvanceDirective;
