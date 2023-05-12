import { useState, useCallback, useEffect } from "react";
import { CardList } from "./features/card-list";
import { getInitialContent, getNextContent } from "./api/content";
import {VideoCard} from "./components/video"
import "./styles.css";

export default function App() {
  const [contents, setContents] = useState([]);

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
        ({ title }) => contentTitle !== title
      );
      if (updatedContents.length < 3) fetchNewContent();
      return updatedContents;
    });
  }, []);

  return <div>
    <VideoCard/>
    <CardList cards={contents} onCardSwipped={onContentSwipped} />;
    </div>
}
