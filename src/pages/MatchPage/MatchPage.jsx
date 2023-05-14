import React, { useEffect, useState } from "react"
import { LoaderPage } from "../Loader"
import { getMatch } from '../../api/content/content'
import TitleLogo from '../../vid/Logo.png'
import { BtnArrow } from '../../components/BtnArrow'


const MatchPage = ({results = null, resetResults}) => {

    const [matches, setMatch] = useState(results)

    useEffect(() => {
        if(!results){
            getMatch().then(results => setMatch(results))
        }
    }, [])

    const getImg = (m) => {
        return m.thumbnail_image_url || m.content_image_url
    }

    const goToContent = (m) => {
        window.open(m.showUrl, '_blank').focus();
    }

    return matches ? <div className="page-container match">
        <BtnArrow onClick={resetResults}/>
        <div className='logo' style={{maxWidth: '200px', margin:'1vh 0'}}>
            {/** title coming here */}
            <img src={TitleLogo} />
        </div>
        <div className='title'>
            <p className='head'>Your Match is ready!</p>
            <p className='sub-head'>Click to watch now</p>
        </div>
        <div className="match-cards">
            {matches.map(m => <div className="match-card" onClick={() => goToContent(m)}>
                {/* <div className="title">{m.title}</div> */}
                <div className="image"><img src={getImg(m)} /></div>
            </div>)}
        </div>
    </div>
        : <LoaderPage />
}

export { MatchPage }