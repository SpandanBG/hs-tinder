import React from 'react'

const ButtonWatchlist = ({onClick}) => {
    return (
        <button className='btn-watch-list btn-pr' onClick={onClick}>
            <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
    )
}

export {ButtonWatchlist};