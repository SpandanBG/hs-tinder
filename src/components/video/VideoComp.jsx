import React, {useEffect, useRef, useState, memo} from'react'
import './VideoComp.css'

const VideoCard = memo((props) =>{
    const {autoplay, id, muteButtonRef, setVideoMute, vidSrc, isFirstLoad, isVideoMuted} = props

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
        if(autoplay && videoRef)
        {
            const playPromise = videoRef.current.play()
            const videoSrc = videoRef.current.src
            if (playPromise !== undefined) {
              playPromise.then(_ => {
                console.log('video started playing', videoSrc)
                if(!isFirstLoad.current && !isVideoMuted){
                  toggleMute()
                }else{
                  isFirstLoad.current = false
                }
              })
              .catch(_e => {
                console.log('video play failed', videoSrc)
              });
            }
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
                key={id}
                preload='auto'
                playsInline
            />
        </div>
    )
})

export { VideoCard };

