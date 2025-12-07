// src/components/VideoGrid.jsx
import React from "react";
import VideoItem from "./VideoItem";
import "../styles/VideoGrid.css";

function VideoGrid({ videos = [], isOwner = false, onEdit, onDelete }) {
  if (!videos || videos.length === 0) {
    return <p className="no-videos">No videos found.</p>;
  }

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoItem
          key={video.videoId}
          video={video}
          isOwner={isOwner}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default VideoGrid;
