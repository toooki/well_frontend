import React, { useEffect, useState } from 'react';
import {ReactComponent as Home} from '../../../assets/icons/home.svg';
import '../../../css/InternalPage/MagnetizationTime.css';

const Magnetization_time = ({ goToMenu }) => {
  const [player, setPlayer] = useState(null);
  const [volume, setVolume] = useState(50); // 볼륨
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    };

    const onYouTubeIframeAPIReady = () => {
      const ytPlayer = new window.YT.Player('player', {
        videoId: 'D8VNaLePeG4',
        playerVars: {
          controls: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(volume);
            setPlayer(ytPlayer);
          },
          onStateChange: (event) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          },
        },
      });
    };

    if (!window.YT) {
      loadYouTubeAPI();
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else {
      onYouTubeIframeAPIReady();
    }
  }, [volume]);

  const handleVolumeChange = (event) => {
    const newVolume = parseInt(event.target.value, 10);
    setVolume(newVolume);
    if (player) {
      player.setVolume(newVolume);
    }
  };

  const togglePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  const handleFullscreen = () => {
    if (player) {
      const iframe = player.getIframe();
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    }
  };

  const seekTo = (seconds) => {
    if (player) {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime + seconds, true);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
         <button className="Magnetization_time_main" onClick={() => goToMenu()}></button>
      </div>
      <h1 className="title">자성시간</h1>
      <b className="subtitle">지금까지 자신이 어떤 삶을 살아왔는지 다시 돌아보는 시간을 가져봅니다.</b>
      <p className="description">
        당신의 과거와 화해하세요.<br />
        그러면 당신의 과거가 현재를 망가뜨리지 않아요.<br />
      </p>
      <div id="player" className="video-player"></div>
      <div className="controls">
        <button className="control-button-play" onClick={togglePlayPause}>
          {isPlaying ? "일시 정지" : "재생"}
        </button>
        <button className="control-button-front" onClick={() => seekTo(10)}>10초 앞으로</button>
        <div className="volume-container">
          <div className="volume-control"></div>
          <input
            id="volume"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default Magnetization_time;
