import React from 'react'
import VolumeUp from '../../vid/volume.svg'

const ButtonMute = ({ muteButtonRef, isVideoMuted }) => {
    return (
        <button ref={muteButtonRef} className={`button-mute ${isVideoMuted ? 'off' : ''}`}>
            {
                isVideoMuted ?
                    // <i class="fa fa-volume-off"></i>
                    <img src={VolumeUp} />
                    :
                    // <i class="fa fa-volume-up" aria-hidden="true"></i>
                    <img src={VolumeUp} />

            }
        </button>
    )
}

export { ButtonMute }