import React, {useEffect, useRef, useState} from'react'
import TestVid from '../../vid/test-vid.mp4'
import './VideoComp.css'

const VideoCard = () =>{
    const [isVideoPlaying, setVideoPlaying] = useState(true)
    const [isVideoMuted, setVideoMuted] = useState(true)

    const videoRef = useRef(null)
    const muteButton = useRef(null)

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
        const muteVal = !videoRef.current.muted;
        videoRef.current.muted = muteVal
        setVideoMuted(muteVal)
    }

  useEffect(() => {}, []);

    return(
        <div className="video-card">
            <video
                ref={videoRef}
                onClick={onVideoPress}
                src={TestVid}
                loop
                alt=""
                autoPlay
                muted
                className='video-ele'
            />
            <button ref={muteButton} onClick={toggleMute} className='button-mute'>
                {
                    isVideoMuted?
                    <i class="fa fa-volume-off"></i>
                    :
                    <i class="fa fa-volume-up" aria-hidden="true"></i>

                }
            </button>
        </div>
    )
}

export { VideoCard };

