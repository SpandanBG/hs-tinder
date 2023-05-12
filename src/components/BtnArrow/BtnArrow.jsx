import React from 'react'
import ArrowSvg from '../../vid/arrow.svg'

const BtnArrow = () => {
    return (
        <button className='btn-back'>
            <img src={ArrowSvg} />
        </button>
    )
}

export {BtnArrow};