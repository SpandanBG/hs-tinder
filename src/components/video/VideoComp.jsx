import React, {useEffect, useRef, useState, memo} from'react'
import TestVid from '../../vid/test-vid.mp4'
import './VideoComp.css'

const VideoCard = memo((props) =>{
    const {autoplay, title} = props

    const [isVideoPlaying, setVideoPlaying] = useState(autoplay)
    const [isVideoMuted, setVideoMuted] = useState(autoplay)

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


    useEffect(() => {
        if(autoplay)
        {
            videoRef.current.play()
        }
    }, [autoplay]);


    return(
        <div className="video-card">
            <video
                ref={videoRef}
                onClick={onVideoPress}
                src={TestVid}
                loop
                alt=""
                autoPlay={autoplay}
                muted={autoplay}
                className='video-ele'
                key={title}
            />
            <button ref={muteButton} onClick={toggleMute} className='button-mute'>
                {
                    isVideoMuted?
                    <i className="fa fa-volume-off"></i>
                    :
                    <i className="fa fa-volume-up" aria-hidden="true"></i>

                }
            </button>
        </div>
    )
})

export { VideoCard };

