import React from 'react'
import cx from 'classnames'

const ButtonWatchNow = ({className='', text, icon = '', onClick}) => {
    return (
        <button className={cx('btn-watch-now btn-pr', className)} onClick={onClick}>
            <i className={icon} aria-hidden="true"></i>
            <span>{text}</span>
        </button>
    )
}

export {ButtonWatchNow};