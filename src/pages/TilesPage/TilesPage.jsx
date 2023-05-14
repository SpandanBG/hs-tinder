import React from 'react'
import { useState, useCallback, useEffect } from "react";
import { CardList } from "../../features/card-list";
import { ping, getInitialContent, getNextContent } from "../../api/content";


const TilesPage = () => {
    const [contents, setContents] = useState([]);

    useEffect(() => {
        ping()
    }, []);

    // Call content API to fill initial contents
    useEffect(() => {
        getInitialContent().then((contents) => setContents(contents));
    }, []);

    const fetchNewContent = useCallback(() => {
        getNextContent().then((nextContent) => {
            setContents((contents) => [nextContent, ...contents]);
        });
    }, []);

    const onContentSwipped = useCallback((contentTitle) => {
        setContents((oldContents) => {
            const updatedContents = oldContents.filter(
                ({ id }) => contentTitle !== id
            );
            if (updatedContents.length < 3) fetchNewContent();
            return updatedContents;
        });
    }, []);

    return <CardList cards={contents} onCardSwipped={onContentSwipped} />;
}

export { TilesPage }