import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../utils/axios";
import VideoGrid from "../components/VideoGrid";
import Filterbar from "../components/Filterbar";
import Loader from "../components/Loader";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const category = searchParams.get("cat");

  const loadVideos = async () => {
    try {
      setLoading(true);

      let res;

      if (query) {
        // search by title
        res = await api.get(`/videos/search/title?title=${query}`);
      } 
      else if (category) {
        // filter by category
        res = await api.get(`/videos?category=${category}`);
      } 
      else {
        // load all
        res = await api.get("/videos");
      }

      setVideos(res.data);
    } catch (err) {
      console.error("Error loading videos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, [query, category]);

  if (loading) return <Loader />;

  return (
    <>
      <Filterbar />
      <VideoGrid videos={videos} />
    </>
  );
}

export default Home;
