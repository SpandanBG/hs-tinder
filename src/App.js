
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { GenrePage } from "./pages/GenrePage"
import { TilesPage } from "./pages/TilesPage"
import { ROUTES } from "./api/constants"
import "./styles.css";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <GenrePage />,
  },
  {
    path: ROUTES.TILES,
    element: <TilesPage />
  }
]);

export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}