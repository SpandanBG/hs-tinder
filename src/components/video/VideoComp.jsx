import React, {useEffect, useRef, useState, memo} from'react'
import './VideoComp.css'

const VideoCard = memo((props) =>{
    const {autoplay, title, muteButtonRef, setVideoMute, vidSrc} = props

    const [isVideoPlaying, setVideoPlaying] = useState(autoplay)

    const videoRef = useRef(null)

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
        setVideoMute(muteVal)
    }


    useEffect(() => {
        if(autoplay)
        {
            videoRef.current.play()
            muteButtonRef.current.onclick = toggleMute
        }
    }, [autoplay]);


    return(
        <div className="video-card">
            <video
                ref={videoRef}
                onClick={onVideoPress}
                src={vidSrc}
                loop
                alt=""
                autoPlay={autoplay}
                muted={autoplay}
                className='video-ele'
                key={title}
            />
        </div>
    )
})

export { VideoCard };

