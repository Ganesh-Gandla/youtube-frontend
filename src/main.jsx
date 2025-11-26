import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'

import { createBrowserRouter } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import Layout from './components/Layout.jsx'
import VideoPage from './pages/VideoPage.jsx'
import ChannelPage from './pages/ChannelPage.jsx'
import CreateChannelPage from "./pages/CreateChannelPage.jsx"
import Login from "./pages/Login.jsx"
import SignUp from "./pages/SignUp.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/video/:id", element: <VideoPage /> },
          { path: "/channel/:id", element: <ChannelPage /> },
          { path: "/channel/create", element: <CreateChannelPage /> },
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <SignUp /> }
        ]
      },

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>,
)
