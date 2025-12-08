// src/components/VideoItem.jsx
import React from "react";
import "../styles/VideoItem.css";
import { useNavigate } from "react-router-dom";

function VideoItem({ video, isOwner = false, onEdit, onDelete }) {
  const navigate = useNavigate();

  // channel info may be nested as video.channel from aggregation or as channelName/channelBanner depending on backend
  const channel = video.channel || {
    channelName: video.channelName || "Unknown",
    channelBanner: video.channelBanner || "",
    channelAvatar: video.channelAvatar || ""
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(video);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(video);
  };

  return (
    <div
      className="video-item"
      onClick={() => navigate(`/video/${video.videoId}`)}
      role="button"
      tabIndex={0}
    >
      <div className="thumbnail">
        <img src={video.thumbnailUrl || video.thumbnail || ""} alt={video.title} />
      </div>

      <div className="video-info">
        <div className="video-meta">
          <img
            className="avatar-circle"
            src={channel.channelAvatar || channel.channelLogo || "/default-avatar.png"}
            alt={channel.channelName}
          />

          <div className="text-block">
            <p className="video-item-title">{video.title}</p>
            <p className="channel-name">{channel.channelName}</p>
            <p className="video-stats">{(video.views || 0).toLocaleString()} views</p>
          </div>
        </div>

        {isOwner && (
          <div className="owner-actions">
            <button className="edit-btn" onClick={handleEdit}>Edit</button>
            <button className="del-btn" onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoItem;
