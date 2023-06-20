// import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom'

import {Provider} from 'react-redux'
import {ApiProvider} from '@reduxjs/toolkit'

import './index.css'
import { RootLayout } from './layouts/RootLayout/RootLayout.tsx'
import { Accueil } from "./layouts/Accueil/Accueil.tsx"
import { store } from './app/store.ts'
import { userApi } from './features/apiSlice.ts'

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
  <Provider store={store}>
    {/* <ApiProvider api={userApi}> */}
    <RouterProvider router={router}/>
    {/* </ApiProvider> */}
 </Provider>
)
