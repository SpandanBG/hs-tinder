import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../api/constants'

const defGenres = ['DRAMA', 'ACTION', 'COMEDY']

const GenrePage = ({ generes = defGenres }) => {

    const navigate = useNavigate()

    const onGenreSelect = (genre) => {
        /** send select genere action here */
        navigate(ROUTES.TILES)
    }

    return (
        <div className='page-container'>
            <div className='title'>
                {/** title coming here */}
            </div>
            <div className='genre-buttons'>
                {
                    generes.map(text => <button key={text} onClick={()=> onGenreSelect(text)}>{text}</button>)
                }
            </div>
        </div>
    )
}

export { GenrePage }