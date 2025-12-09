// src/pages/ChannelPage.jsx
import {FaUserCircle} from 'react-icons/fa'
import VideoGrid from "../components/VideoGrid";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import "../styles/ChannelPage.css"
import { useSelector } from "react-redux";
import Loader from "../components/Loader"

function ChannelPage() {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth || {});

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadChannelVideos = async () => {
    try {
      const res = await api.get(`/videos/channel/${channelId}`);
      setChannel(res.data.channel);
      setVideos(res.data.videos);
    } catch (err) {
      console.error("Error loading channel videos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadChannelVideos();
  }, [channelId]);

  const isOwner = user && channel && user.userId === channel.owner;

  // owner actions (you can implement edit modal or redirect to edit page)
  const handleEdit = (video) => {
    navigate(`/edit-video/${video.videoId}`);
  };

  const handleDelete = async (video) => {
    if (!confirm("Delete this video? This action cannot be undone.")) return;
    try {
      await api.delete(`/videos/${video.videoId}`);
      // remove locally
      setVideos((prev) => prev.filter((v) => v.videoId !== video.videoId));
    } catch (err) {
      console.error("Error deleting video", err);
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  if (loading) return<Loader/>;

  return (
    <div className="channel-page">
      {/* Banner */}
      <div className="channel-banner">
        {channel.channelBanner?(<img src={channel.channelBanner} alt="Channel Banner" />):(null)}
      </div>

      {/* Header */}
      <div className="channel-header">
        {channel.channelLogo?(<img className="channel-avatar" src={channel.channelLogo} alt={channel.channelName} />):(<FaUserCircle className="channel-avatar"/>)}

        <div className="channel-info">
          <h2 className="channel-title">{channel.channelName}</h2>

          <div className="channel-stats">
            <span>{channel.subscribers?.toLocaleString() || 0} subscribers</span>
            <span> • </span>
            <span>{videos.length} videos</span>
          </div>

          <p className="channel-description">
            {channel.description || "This channel has no description yet."}
          </p>

          {/* If visitor, show subscribe; owner could see edit channel */}
          {isOwner ? (
            <button
              className="edit-channel-btn"
              onClick={() => navigate(`/channel/edit/${channel.channelId}`)}
            >
              Edit Channel
            </button>
          ) : (
            <button className="subscribe-btn">Subscribe</button>
          )}
        </div>
      </div>

      {/* Tabs / sorts omitted for brevity */}

      {/* Video Grid - pass isOwner and owner handlers */}
      <VideoGrid videos={videos} isOwner={isOwner} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default ChannelPage;
