import React, { useState, useEffect, useRef } from 'react';
import '../../../css/InternalPage/WillWrite.css';

const WillWrite = ({ username, goToMenu }) => {
  const [mode, setMode] = useState(''); // 'text' or 'audio'
  const [textWill, setTextWill] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [savedWill, setSavedWill] = useState(null);
  const [savedAt, setSavedAt] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    // 페이지 로드 시 기존 유언장 데이터 가져오기
    const fetchWillData = async () => {
      const response = await fetch(`http://localhost:8080/willwrite/${username}`);
      const data = await response.json();

      if (data.willwrite) {
        setSavedWill(data.willwrite);
        setSavedAt(data.created_at);
        setMode('text');
      } else if (data.willrecord) {
        setSavedWill(data.willrecord);
        setSavedAt(data.created_at);
        setMode('audio');
      }
    };
    fetchWillData();
  }, [username]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        mediaRecorder.ondataavailable = (e) => {
          setAudioBlob(e.data);
        };
        setIsRecording(true);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const saveTextWill = async () => {
    const willText = `유언장\n${textWill}`;

    const response = await fetch('http://localhost:8080/willwrite/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, willwrite: willText })
    });
    if (response.ok) {
      alert('유언장이 저장되었습니다.');
    } else {
      alert('유언장 저장에 실패했습니다.');
    }
  };

  const saveAudioWill = async () => {
    if (!audioBlob) return;

    // Blob을 base64로 변환하는 함수
    const blobToBase64 = (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]); // base64 문자열만 반환
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    try {
      const base64String = await blobToBase64(audioBlob);

      const response = await fetch('http://localhost:8080/willwrite/audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, willrecordBase64: base64String })
      });
      if (response.ok) {
        alert('유언장이 저장되었습니다.');
      } else {
        alert('유언장 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('음성 유언장 저장에 실패했습니다.');
    }
  };

  const resetMode = () => {
    setMode(''); // 모드를 초기화하여 선택 화면으로 돌아가도록 설정
    setSavedWill(null); // 저장된 유언장 초기화
  };

  const renderWillContent = () => {
    if (mode === 'text') {
      if (savedWill && savedWill.startsWith('유언장\n')) {
        return <p>{savedWill.substring(4)}</p>;
      } else {
        return <p>유언장이 없습니다.</p>;
      }
    } else if (mode === 'audio') {
      return (
        <audio controls>
          <source src={`data:audio/webm;base64,${savedWill}`} type="audio/webm" />
          Your browser does not support the audio element.
        </audio>
      );
    }
  };

  return (
    <div className="Will_Write_container">
      <div className="top-bar">
        <button className="Will_Write_main" onClick={goToMenu}>메뉴</button>
      </div>
      <h1>유언장</h1>
      {mode === '' ? (
        <div className="mode-buttons">
          <button className="mode-button" onClick={() => setMode('text')}>수기로 작성</button>
          <button className="mode-button" onClick={() => setMode('audio')}>음성으로 작성</button>
        </div>
      ) : (
        <>
          {mode === 'text' && (
            <div className="text-input">
              <textarea
                value={textWill}
                className="text-input1"
                onChange={(e) => setTextWill(e.target.value)}
                placeholder="유언장을 작성하세요."
              />
              <div className="action-buttons">
                <button className="action-button" onClick={saveTextWill}>유언장 저장</button>
                <button className="action-button" onClick={resetMode}>모드 변경</button>
              </div>
            </div>
          )}

          {mode === 'audio' && (
            <div className="audio-controls">
              {audioBlob && (
                <audio controls src={URL.createObjectURL(audioBlob)} />
              )}              <button className="audio-button" onClick={startRecording} disabled={isRecording}>녹음 시작</button>
              <button className="audio-button" onClick={stopRecording} disabled={!isRecording}>녹음 중지</button>
              {audioBlob && (
                <div>
                  <div className="action-buttons">
                    <button className="action-button" onClick={saveAudioWill}>유언장 저장</button>
                    <button className="action-button" onClick={resetMode}>모드 변경</button>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="content">
            {renderWillContent()}
            <p>작성일: {savedAt ? new Date(savedAt).toLocaleString() : ''}</p>
          </div>

        </>
      )}
    </div>
  );
};

export default WillWrite;
