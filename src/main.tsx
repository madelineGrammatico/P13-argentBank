import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom'

import App from './App.tsx'
import './index.css'
import { RootLayout } from './layouts/RootLayout/RootLayout.tsx'
import { Accueil } from "./layouts/Accueil/Accueil.tsx"

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <Navigate to="accueil" replace/>,
      },
      {
        path: "/accueil",
        element: <Accueil/>
      },
      {
        path: "/transactions",
        element: <></>
      }
    ]
  },
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 <RouterProvider router={router}/>
)
