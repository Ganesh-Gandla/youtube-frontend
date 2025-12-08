import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/axios";
import CommentSection from "../components/CommentSection";
import "../styles/VideoPage.css";
import Loader from "../components/Loader";

function VideoPage() {
  const { id } = useParams(); // Get videoId from URL

  // Page states
  const [video, setVideo] = useState(null);      // Current video details
  const [channel, setChannel] = useState(null);  // Channel details
  const [suggested, setSuggested] = useState([]); // Suggested video list
  const [loading, setLoading] = useState(true);   // Page loading state

  // Like / dislike states
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  // Update like/dislike UI when video loads
  useEffect(() => {
    if (video) {
      setLikes(video.likes);
      setDislikes(video.dislikes);
    }
  }, [video]);

  // Load video + channel in a single API response
  const loadVideoAndChannel = async () => {
    try {
      const res = await api.get(`/videos/${id}`);
      setVideo(res.data.video);
      setChannel(res.data.channel);
    } catch (err) {
      console.error("Error loading video", err);
    }
  };

  // Get suggested videos
  const loadSuggested = async () => {
    try {
      const res = await api.get(`/videos`);
      setSuggested(res.data);
    } catch (err) {
      console.error("Error loading suggested", err);
    }
  };

  // Load data when component mounts or id changes
  useEffect(() => {
    setLoading(true);

    (async () => {
      await loadVideoAndChannel();
      await loadSuggested();
      setLoading(false);
    })();
  }, [id]);

  // Handle like button
  const handleLike = async () => {
    try {
      const res = await api.post(`/videos/${video.videoId}/like`);
      setLikes(res.data.likes);
    } catch (err) {
      console.log("Like error", err);
    }
  };

  // Handle dislike button
  const handleDislike = async () => {
    try {
      const res = await api.post(`/videos/${video.videoId}/dislike`);
      setDislikes(res.data.dislikes);
    } catch (err) {
      console.log("Dislike error", err);
    }
  };

  // Show loader until video details load
  if (loading || !video) return <Loader />;

  return (
    <div className="video-page">

      {/* LEFT VIDEO COLUMN */}
      <div className="left-section">

        {/* MAIN VIDEO PLAYER */}
        <div className="video-player">
          <video controls autoPlay>
            <source src={video.videoUrl} type="video/mp4" />
          </video>
        </div>

        {/* VIDEO TITLE */}
        <h2 className="video-title">{video.title}</h2>

        {/* VIEWS + ACTION BUTTONS */}
        <div className="video-info-row">
          <p className="views">
            {video.views.toLocaleString()} views •{" "}
            {new Date(video.createdAt).toLocaleDateString()}
          </p>

          {/* LIKE / DISLIKE / SHARE / DOWNLOAD */}
          <div className="actions">
            <div className="likes">
              <button onClick={handleLike}>
                <img src="/like-inactive.png" width="18px" /> ({likes})
              </button>

              <button onClick={handleDislike}>
                <img src="/dislike-inactive.png" width="18px" /> ({dislikes})
              </button>
            </div>

            <button><img src="/share.png" width="18px" /></button>
            <button>
              <img src="/download.png" width="18px" /> 
              <span className="download">Download</span>
            </button>
          </div>
        </div>

        {/* CHANNEL SECTION */}
        <div className="channel-box">
          <Link to={`/channel/${channel.channelId}`}>
            <div className="channel-sign">
              <img
                src={channel.channelLogo || ""}
                alt="Channel Logo"
                className="channel-logo"
              />

              <div className="channel-text">
                <h4 className="channel-name">{channel.channelName}</h4>
                <p className="subs">{channel.subscribers} subscribers</p>
              </div>
            </div>
          </Link>

          <button className="subscribe-btn">Subscribe</button>
        </div>

        {/* VIDEO DESCRIPTION */}
        <div className="description-box">
          <p>{video.description}</p>
        </div>

        {/* COMMENTS SECTION */}
        <CommentSection videoId={video.videoId} />

      </div>

      {/* RIGHT SUGGESTED VIDEOS LIST */}
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
