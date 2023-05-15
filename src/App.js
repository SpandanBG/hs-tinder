
import React, { useEffect, useState, useRef } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { GenrePage } from "./pages/GenrePage"
import { TilesPage } from "./pages/TilesPage"
import { MatchPage } from './pages/MatchPage'
import { TutorialPage } from './pages/TutorialPage'
import { ROUTES } from "./api/constants"
import { makeid, getUserId } from "./api/content/content"
import "./styles.css";



export default function App() {

  const [contents, setContents] = useState([]);
  const positiveFeedback = useRef([])

  const addToFeedback = (show) => {
    const { title } = show
    const recordIndex = positiveFeedback.current.findIndex(s => s.title === title)
    if(recordIndex >= 0){
      positiveFeedback.current[recordIndex].count += 1
    }else{
      positiveFeedback.current.push({...show, count: 1})
    }
    sessionStorage.setItem('matches', JSON.stringify(positiveFeedback.current))
  }

  const router = createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: <TutorialPage setContents={setContents} />,
    },
    {
      path: ROUTES.GENRE,
      element: <GenrePage setContents={setContents} />,
    },
    {
      path: ROUTES.TILES,
      element: <TilesPage setContents={setContents} contents={contents} positiveFeedback={positiveFeedback} addToFeedback={addToFeedback}/>
    },
    {
      path: ROUTES.MATCH,
      element: <MatchPage />
    }
  ]);

  useEffect(() => {
    try {
      const currentId = getUserId()
      if (!currentId) {
        const userId = makeid(12);
        sessionStorage.setItem("userId", userId);
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}