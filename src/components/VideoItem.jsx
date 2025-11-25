// src/components/VideoItem.jsx
import React from "react";
import "../styles/VideoItem.css";

function VideoItem({ video }) {
  return (
    <div className="video-item">
      <div className="thumbnail">
        <img src={video.thumbnailUrl} alt={video.title} />
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="channel-name">{video.uploader}</p>
        <p className="video-stats">{video.views.toLocaleString()} views</p>
      </div>
    </div>
  );
}

export default VideoItem;
