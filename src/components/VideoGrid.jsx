// src/components/VideoGrid.jsx
import React from "react";
import VideoItem from "./VideoItem";
import "../styles/VideoGrid.css";

const videos = [
  {
    videoId: "video01",
    title: "Learn React in 30 Minutes",
    thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    uploader: "freeCodeCamp",
    views: 15200,
  },
  {
    videoId: "video02",
    title: "CSS Flexbox Crash Course",
    thumbnailUrl: "https://i.ytimg.com/vi/JJSoEo8JSnc/maxresdefault.jpg",
    uploader: "Traversy Media",
    views: 9800,
  },
  {
    videoId: "video03",
    title: "JavaScript ES6 Tutorial",
    thumbnailUrl: "https://i.ytimg.com/vi/NCwa_xi0Uuc/maxresdefault.jpg",
    uploader: "Programming with Mosh",
    views: 45300,
  },
  {
    videoId: "video04",
    title: "Build a Node.js REST API",
    thumbnailUrl: "https://i.ytimg.com/vi/pKd0Rpw7O48/maxresdefault.jpg",
    uploader: "Academind",
    views: 32800,
  },
  {
    videoId: "video05",
    title: "Intro to MongoDB",
    thumbnailUrl: "https://i.ytimg.com/vi/Ofme2o29ngU/maxresdefault.jpg",
    uploader: "MongoDB University",
    views: 29000,
  },
  {
    videoId: "video06",
    title: "Understanding React Hooks",
    thumbnailUrl: "https://i.ytimg.com/vi/f687hBjwFcM/maxresdefault.jpg",
    uploader: "The Net Ninja",
    views: 52000,
  },
  {
    videoId: "video07",
    title: "HTML & CSS Crash Course – Build a Website",
    thumbnailUrl: "https://i.ytimg.com/vi/UB1O30fR-EE/maxresdefault.jpg",
    uploader: "Traversy Media",
    views: 64000,
  },
  {
    videoId: "video08",
    title: "Mastering Python for Web Development",
    thumbnailUrl: "https://i.ytimg.com/vi/_uQrJ0TkZlc/maxresdefault.jpg",
    uploader: "Corey Schafer",
    views: 41000,
  },
];


function VideoGrid() {
  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoItem key={video.videoId} video={video} />
      ))}
    </div>
  );
}

export default VideoGrid;
