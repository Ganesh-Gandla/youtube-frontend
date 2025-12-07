import Filterbar from "../components/Filterbar"
// src/pages/Home.jsx
import { useEffect, useState } from "react";
import api from "../utils/axios";
import VideoGrid from "../components/VideoGrid";
import Loader from "../components/Loader"
// import "../styles/Home.css";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadVideos = async () => {
    try {
      const res = await api.get("/videos");
      setVideos(res.data);
    } catch (err) {
      console.error("Error loading videos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  if (loading) return <Loader/>;

  return (
    <>
      <Filterbar />
      <VideoGrid videos={videos} /></>
  );
}

export default Home;
