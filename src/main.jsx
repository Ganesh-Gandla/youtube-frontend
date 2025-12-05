import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { Provider } from 'react-redux'
// import store from './redux/store.js'
import { RouterProvider } from 'react-router-dom'

import { createBrowserRouter } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import Layout from './components/Layout.jsx'
import VideoPage from './pages/VideoPage.jsx'
import ChannelPage from './pages/ChannelPage.jsx'
import CreateChannelPage from "./pages/CreateChannelPage.jsx"
import Login from "./pages/Login.jsx"
import SignUp from "./pages/SignUp.jsx"
import AddVideo from './pages/AddVideo.jsx'

import ProtectedRoute from "./components/ProtectedRoute";


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
          {path: "/addvideo", element: <AddVideo/>},

          {
            path: "/channel",
            element: (
              <ProtectedRoute>
                <CreateChannelPage />
              </ProtectedRoute>
            ),},

          { path: "/login", element: <Login /> },
          { path: "/signup", element: <SignUp /> }
        ]
      },

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Provider stroe={store}> */}
    <RouterProvider router={router} />
    {/* </Provider> */}
    {/* <App /> */}
  </StrictMode>,
)
