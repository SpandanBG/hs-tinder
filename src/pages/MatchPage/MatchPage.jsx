import React, { useEffect, useState } from "react"
import { LoaderPage } from "../Loader"
import { getMatch } from '../../api/content/content'
import TitleLogo from '../../vid/Logo.png'
import { BtnArrow } from '../../components/BtnArrow'

const filterMatches = (positiveFeedback) => {
    const expectedRes = positiveFeedback.filter(s => s.count > 2)
    expectedRes.sort(function (a, b) {
        if (a.count < b.count) return -1;
        if (a.count > b.count) return 1;
        return 0;
    });
    return expectedRes
}


const MatchPage = ({ results = null, resetResults, positiveFeedback }) => {

    const [matches, setMatch] = useState(results)

    useEffect(() => {
        if (!results) {
            getMatch().then(results => {
                if (results && results.length) {
                    setMatch(results)
                } else if (positiveFeedback && positiveFeedback.length) {
                    const expectedRes = filterMatches(positiveFeedback)
                    setMatch(expectedRes)
                } else {
                    const sessonMatches = sessionStorage.getItem('matches')
                    if (sessonMatches) {
                        const m = JSON.parse(sessonMatches)
                        if (m && m.length) {
                            const r = filterMatches(m)
                            setMatch(r)
                        }
                    } else {
                        setMatch([])
                    }
                }
            })
        }
    }, [])

    const getImg = (m) => {
        return m.thumbnail_image_url || m.content_image_url
    }

    const goToContent = (m) => {
        window.open(m.showUrl, '_blank').focus();
    }

    return matches ? <div className="page-container match">
        <BtnArrow onClick={resetResults} />
        <div className='logo' style={{ maxWidth: '200px', margin: '1vh 0' }}>
            {/** title coming here */}
            <img src={TitleLogo} />
        </div>
        {matches.length ? <div className='title'>
            <p className='head'>Your Match is ready!</p>
            <p className='sub-head'>Click to watch now</p>
        </div> :
            <div className='title'>
                <p className='head'>{`We could not find a match for you today :(`}</p>
                <p className='sub-head'>Please come back later</p>
            </div>}
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