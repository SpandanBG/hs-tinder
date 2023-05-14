
import React, {useEffect, useState} from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { GenrePage } from "./pages/GenrePage"
import { TilesPage } from "./pages/TilesPage"
import { MatchPage } from './pages/MatchPage'
import { ROUTES } from "./api/constants"
import { makeid, getUserId } from "./api/content/content"
import "./styles.css";



export default function App() {

  const [contents, setContents] = useState([]);

  const router = createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: <GenrePage setContents={setContents}/>,
    },
    {
      path: ROUTES.TILES,
      element: <TilesPage setContents={setContents} contents={contents}/>
    },
    {
      path: ROUTES.MATCH,
      element: <MatchPage />
    }
  ]);

  useEffect(()=>{
    try{
      const currentId = getUserId()
      if(!currentId){
        const userId = makeid(12);
        sessionStorage.setItem("userId", userId);
      }
    }catch(e){
      console.error(e)
    }
  },[])

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}