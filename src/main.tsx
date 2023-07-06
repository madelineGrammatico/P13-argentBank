// import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom'

import {Provider} from 'react-redux'

import './index.css'
import { RootLayout } from './layouts/RootLayout/RootLayout.tsx'
import { Accueil } from "./layouts/Accueil/Accueil.tsx"
import { Profile } from "./layouts/Profile/Profile.tsx"
import { store } from './app/store.ts'
import { LogIn } from './layouts/LogIn/LogIn.tsx'
import { EditUser } from './layouts/EditUser/EditUser.tsx'
import { Greetings } from "./layouts/Greetings/Greetings.tsx"
// import { loginLoader } from './features/router/loaders/loginLoader.tsx'
import { profileLoader } from './features/router/loaders/profileLoader.tsx'

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
        path: "/profile",
        loader: profileLoader,
        element: <Profile/>,
        children: [
          {
            path: "/profile/user",
            element:<EditUser/>
          }
        ]
      },
      {
        path: "/login",
        element: <LogIn/>
      }

    ]
  },
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
 </Provider>
)
