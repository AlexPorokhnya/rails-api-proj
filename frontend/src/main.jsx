import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import Authentication, {PageType} from './pages/Authentication.jsx'
import AllPosts from './pages/AllPosts.jsx'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

const router  = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Authentication pageType ={PageType.LOGIN}/>
  },
  {
    path: "/register",
    element: <Authentication pageType={PageType.REGISTER} />
  },
  {
    path: "/newPost",
    element: <AllPosts />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
