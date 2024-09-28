import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import JoinPage from './Join.tsx';
import Lobby from './Lobby.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <JoinPage />
  },
  {
    path: "/lobby",
    element: <Lobby />
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
