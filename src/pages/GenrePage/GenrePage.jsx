import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../api/constants'
import TitleLogo from '../../vid/Logo.png'
import { ButtonWatchNow } from '../../components/ButtonWatchNow'
import BackButton from '../../vid/arrow.svg'
import Stars from '../../vid/Stars.png'
import { setUserGenre, getInitialContent } from '../../api/content/content'

const defGenres = ['DRAMA', 'ACTION', 'COMEDY', 'ALL']

const GenrePage = ({ generes = defGenres, setContents }) => {

    const [selectedGeneres, setGeneres] = useState([])

    const navigate = useNavigate()

    const onGenreSelect = (genre) => {
        let modArray = [...selectedGeneres]
        if (selectedGeneres.includes(genre)) {
            const i = generes.indexOf(genre)
            modArray.splice(i, 1)
        } else {
            modArray.push(genre)
        }
        setGeneres(modArray)
    }

    const goToTiles = () => {
        setUserGenre(selectedGeneres).then(()=>{
            navigate(ROUTES.TILES)
        }).catch(e =>{
            console.error(e)
        })
        getInitialContent().then((contents) => {
            console.log('fetched contents', contents)
            setContents(contents)
        });
    }

    return (
        <div className='page-container'>
            <div className='background-stars'>
                <img src={Stars} />
            </div>
            <div className='back-button'>
                <button>
                    <img src={BackButton} />
                </button>
            </div>
            <div className='logo'>
                {/** title coming here */}
                <img src={TitleLogo} />
            </div>
            <div className='title'>
                <p className='head'>Let’s match you with the best content for you!</p>
                <p className='sub-head'>Start off by selecting your preferences. You can select as many as you want.</p>
            </div>
            <div className='genre-buttons'>
                {
                    generes.map(text => {
                        const isSelected = !!selectedGeneres.includes(text)
                        console.log(selectedGeneres, text, isSelected)
                        return <button className={`${isSelected? 'selected' : ''}`} key={text} onClick={() => onGenreSelect(text)}>{text.toLowerCase()}</button>
                    })
                }
            </div>
            <ButtonWatchNow className={'btn-white'} onClick={goToTiles} text="Start exploring" />
        </div>
    )
}

export { GenrePage }