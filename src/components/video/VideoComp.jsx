import React, {useEffect, useRef, useState, memo} from'react'
import './VideoComp.css'
import {fireUserAction, USER_ACTIONS} from "../../api/content/content"


const VideoCard = memo((props) =>{
    const {autoplay, id, muteButtonRef, setVideoMute, vidSrc, isFirstLoad, isVideoMuted} = props
    const isSameVideo = useRef('')
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
        if(autoplay && videoRef && videoRef.current)
        {
            const playPromise = videoRef.current.play()
            const videoSrc = videoRef.current.src
            if (playPromise !== undefined) {
              playPromise.then(_ => {
                console.log('video started playing', videoSrc)
                if(!isSameVideo.current){
                  fireUserAction(USER_ACTIONS.CLIPWATCHED, id)
                  isSameVideo.current = id
                }
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

        /*loop with fire event*/
        if(videoRef && videoRef.current){
          videoRef.current.addEventListener('ended', function () {
            this.play()
            fireUserAction(USER_ACTIONS.LOOP, id)
          })
        }

    }, [autoplay]);


    return(
        <div className="video-card">
            <video
                ref={videoRef}
                onClick={onVideoPress}
                src={vidSrc}
                alt=""
                autoPlay={autoplay}
                muted={autoplay}
                className='video-ele'
                key={`${id}-video`}
                preload='auto'
                playsInline
            />
        </div>
    )
})

export { VideoCard };

