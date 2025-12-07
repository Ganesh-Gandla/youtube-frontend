import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css"
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Pages & Components
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import VideoPage from "./pages/VideoPage.jsx";
import ChannelPage from "./pages/ChannelPage.jsx";
import CreateChannelPage from "./pages/CreateChannelPage.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import AddVideo from "./pages/AddVideo.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import EditVideo from "./pages/EditVideo.jsx";
import EditChannel from "./pages/EditChannel.jsx";

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

          // Video Pages
          { path: "/video/:id", element: <VideoPage /> },
          {
            path: "/edit-video/:id",
            element: (
              <ProtectedRoute>
                <EditVideo />
              </ProtectedRoute>
            ),
          },

          // Channel Pages
          { path: "/channel/:channelId", element: <ChannelPage /> },
          {
            path: "/channel",
            element: (
              <ProtectedRoute>
                <CreateChannelPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "/channel/edit/:channelId",
            element: (
              <ProtectedRoute>
                <EditChannel />
              </ProtectedRoute>
            ),
          },

          // Add Video
          {
            path: "/addvideo",
            element: (
              <ProtectedRoute>
                <AddVideo />
              </ProtectedRoute>
            ),
          },

          // Auth
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <SignUp /> },
        ],
      },

      // Error page
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Provider store={store}> */}
    <RouterProvider router={router} />
    {/* </Provider> */}
  </StrictMode>
);
