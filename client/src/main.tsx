import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import JoinPage from './Join.tsx';
import Lobby from './Lobby.tsx';
import AppStateProvider from './AppStateContext.tsx';
import Pitch from './Pitch.tsx';
import Prep from './Prep.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <JoinPage />
  },
  {
    path: "/lobby",
    element: <Lobby />
  },
  {
    path: "/pitch",
    element: <Pitch />
  },
  {
    path: "/prep",
    element: <Prep />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppStateProvider>
      <RouterProvider router={router} />
    </AppStateProvider>
  </StrictMode>,
)
