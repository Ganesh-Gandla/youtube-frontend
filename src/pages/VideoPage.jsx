import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/axios";
import CommentSection from "../components/CommentSection";
import "../styles/VideoPage.css";
import Loader from "../components/Loader"

function VideoPage() {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [channel, setChannel] = useState(null);
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    if (video) {
      setLikes(video.likes);
      setDislikes(video.dislikes);
    }
  }, [video]);


  // Load video + channel in ONE API call
  const loadVideoAndChannel = async () => {
    try {
      const res = await api.get(`/videos/${id}`);

      setVideo(res.data.video);
      setChannel(res.data.channel);

    } catch (err) {
      console.error("Error loading video", err);
    }
  };

  // Load suggested videos
  const loadSuggested = async () => {
    try {
      const res = await api.get(`/videos`);
      setSuggested(res.data);
    } catch (err) {
      console.error("Error loading suggested", err);
    }
  };

  useEffect(() => {
    setLoading(true);

    (async () => {
      await loadVideoAndChannel();
      await loadSuggested();
      setLoading(false);
    })();
  }, [id]);

  const handleLike = async () => {
    try {
      const res = await api.post(`/videos/${video.videoId}/like`);
      setLikes(res.data.likes);
    } catch (err) {
      console.log("Like error", err);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await api.post(`/videos/${video.videoId}/dislike`);
      setDislikes(res.data.dislikes);
    } catch (err) {
      console.log("Dislike error", err);
    }
  };


  if (loading || !video) return <Loader />;

  return (
    <div className="video-page">

      {/* LEFT SECTION */}
      <div className="left-section">

        {/* VIDEO PLAYER */}
        <div className="video-player">
          <video controls autoPlay>
            <source src={video.videoUrl} type="video/mp4" />
          </video>
        </div>

        {/* TITLE */}
        <h2 className="video-title">{video.title}</h2>

        {/* INFO ROW */}
        <div className="video-info-row">
          <p className="views">
            {video.views.toLocaleString()} views •{" "}
            {new Date(video.createdAt).toLocaleDateString()}
          </p>

          <div className="actions">
            <div className="">
              <button onClick={handleLike}>
                <img src="/like-inactive.png" width="18px" /> ({likes})
              </button>

              <button onClick={handleDislike}>
                <img src="/dislike-inactive.png" width="18px" /> ({dislikes})
              </button>

            </div>
            <button className=""><img src="/share.png" alt="" width={"18px"} /></button>
            <button className=""><img src="/download.png" alt="" width={"18px"} /> Download</button>
          </div>
        </div>

        {/* CHANNEL BOX */}
        <div className="channel-box">
          <Link to={`/channel/${channel.channelId}`}><div className="channel-sign">
            <img
            src={channel.channelLogo || ""}
            alt="Channel Logo"
            className="channel-logo"
          />

          <div className="channel-text">
            <h4 className="channel-name">{channel.channelName}</h4>
            <p className="subs">{channel.subscribers} subscribers</p>
          </div>
          </div></Link>
          

          <button className="subscribe-btn">Subscribe</button>
        </div>

        {/* DESCRIPTION */}
        <div className="description-box">
          <p>{video.description}</p>
        </div>

        {/* COMMENTS */}
        <CommentSection videoId={video.videoId} />

      </div>

      {/* RIGHT SECTION (Suggested videos) */}
      <div className="right-section">
        {suggested.map((s) => (
          <div
            className="suggested-video"
            key={s.videoId}
            onClick={() => window.location.href = `/video/${s.videoId}`}
          >
            <img src={s.thumbnailUrl} alt="thumbnail" className="thumb" />

            <div>
              <p className="s-title">{s.title}</p>
              <p className="s-channel">{s.channel.channelName}</p>
              <p className="s-views">{s.views.toLocaleString()} views</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default VideoPage;
