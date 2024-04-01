import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Congrat from './pages/congrat.jsx'
import Count from './pages/count.jsx'
import NotFound from './pages/NotFound.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/congrat",
    element:<Congrat />
  },
  {
    path: "/count",
    element: <Count/>
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)