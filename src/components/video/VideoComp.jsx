import React, { useEffect, useRef, useState } from "react";
import TestVid from "../../vid/test-vid.mp4";

const VideoCard = () => {
  const [isVideoPlaying, setVideoPlaying] = useState(true);

  const videoRef = useRef(null);
  const muteButton = useRef(null);

  const onVideoPress = () => {
    if (isVideoPlaying) {
      videoRef.current.pause();
      setVideoPlaying(false);
    } else {
      videoRef.current.play();
      setVideoPlaying(true);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
  };

  useEffect(() => {}, []);

  return (
    <div className="video-card">
      <video
        ref={videoRef}
        onClick={onVideoPress}
        src={TestVid}
        loop
        alt=""
        autoPlay
        muted
      />
      <button ref={muteButton} onClick={toggleMute}>
        <i class="fa-light fa-volume"></i>
      </button>
    </div>
  );
};

export { VideoCard };

