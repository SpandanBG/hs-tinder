import React from 'react'

const ButtonMute = ({ muteButtonRef, isVideoMuted }) => {
    return (
        <button ref={muteButtonRef} className={`button-mute ${isVideoMuted ? 'off' : ''}`}>
            {
                isVideoMuted ?
                    <i class="fa fa-volume-off"></i>
                    :
                    <i class="fa fa-volume-up" aria-hidden="true"></i>

            }
        </button>
    )
}

export { ButtonMute }