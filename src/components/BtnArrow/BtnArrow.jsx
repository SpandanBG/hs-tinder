import React from 'react'
import ArrowSvg from '../../vid/arrow.svg'

const BtnArrow = ({onClick}) => {
    return (
        <button className='btn-back' onClick={onClick}>
            <img src={ArrowSvg} />
        </button>
    )
}

export {BtnArrow};