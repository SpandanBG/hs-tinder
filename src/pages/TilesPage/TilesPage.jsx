import React, {memo} from 'react'
import { useCallback } from "react";
import { CardList } from "../../features/card-list";
import { getNextContent, popClip, getClips } from "../../api/content";
import { ROUTES } from '../../api/constants'
import {useNavigate} from 'react-router-dom'


function getElapsedTime(time) {
    const endTime = new Date();
    let timeDiff = endTime - time;
    timeDiff /= 1000;
    const seconds = Math.round(timeDiff);
    return seconds
  }

const TilesPage = memo(({contents, setContents}) => {

    const navigate = useNavigate()

    let lastPoped;
    const fetchNewContent = useCallback(() => {
        getNextContent().then((nextContents) => {
            if(nextContents){
                setContents(nextContents);
            }else{
                navigate(ROUTES.MATCH)
            }
        });
    }, []);


    const onContentSwipped = useCallback((contentTitle) => {
        setContents((oldContents) => {
            const updatedContents = oldContents.filter(
                ({ id }) => contentTitle !== id
            );
            const currentClips = getClips()
            
            if(currentClips.length){
                /**big hack */
                if(!lastPoped){
                    popClip()
                    lastPoped = new Date()
                    if (currentClips.length < 3) fetchNewContent();
                }else{
                    const elapsedTime = getElapsedTime(lastPoped)
                    if(elapsedTime >= 1){
                        popClip()
                        lastPoped = new Date()
                        if (currentClips.length < 3) fetchNewContent();
                    }
                }
            }
            return updatedContents;
        });
    }, []);

    return contents.length ? <CardList cards={contents} onCardSwipped={onContentSwipped} /> : 'loading...';
})

export { TilesPage }