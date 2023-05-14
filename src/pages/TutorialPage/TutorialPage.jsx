import React, { useEffect, useRef, useState } from "react";
import IngressVid from '../../vid/ingress.mov'
import TutorialVid from '../../vid/tutorial.mov'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from "../../api/constants";

const TutorialPage = () => {
    const vidRefIngress = useRef(null)
    const vidRefTutorial = useRef(null)

    const [showTut, hideTut] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        if (vidRefIngress && vidRefIngress.current) {
            vidRefIngress.current.addEventListener('ended', function () {
                hideTut(false)
            })
        }
    }, [])

    useEffect(() => {
        if (!showTut) {
            if (vidRefTutorial && vidRefTutorial.current) {
                vidRefTutorial.current.play()
                vidRefTutorial.current.addEventListener('ended', function () {
                    navigate(ROUTES.GENRE)
                })
            }
        }
    }, [showTut])

    return (
        <div className="tutorials">
            {showTut && <div className="ingress">
                <video ref={vidRefIngress} src={IngressVid} muted autoPlay playsInline/>
            </div>}
            <div className="tutorial">
                <video ref={vidRefTutorial} src={TutorialVid} muted playsInline/>
            </div>
        </div>
    )
}

export { TutorialPage }