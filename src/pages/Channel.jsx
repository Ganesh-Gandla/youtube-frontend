// src/pages/Channel.jsx
import VideoGrid from "../components/VideoGrid";
import "../styles/Channel.css";

function Channel() {
  return (
    <div className="channel-page">

      {/* Banner */}
      <div className="channel-banner">
        <img
          src="https://i.ytimg.com/vi/2Vv-BfVoq4g/maxresdefault.jpg"
          alt="Channel Banner"
        />
      </div>

      {/* Channel Header */}
      <div className="channel-header">
        <img
          className="channel-avatar"
          src="https://yt3.googleusercontent.com/ytc/AL5GRJXm.png"
          alt="Channel Logo"
        />

        <div className="channel-info">
          <h2 className="channel-title">Channel Title</h2>

          <div className="channel-stats">
            <span>1.24M subscribers</span>
            <span> • </span>
            <span>350 videos</span>
          </div>

          <p className="channel-description">
            This is the channel description. High-quality tutorials, guides and learning content.
          </p>

          <button className="subscribe-btn">Subscribe</button>
        </div>
      </div>

      {/* Tabs */}
      <ul className="channel-tabs">
        <li className="active">Home</li>
        <li>Videos</li>
        <li>Shorts</li>
        <li>Live</li>
        <li>Playlists</li>
        <li>Community</li>
      </ul>

      {/* Sort Options */}
      <ul className="sort-options">
        <li className="active">Latest</li>
        <li>Popular</li>
        <li>Older</li>
      </ul>

      {/* Videos */}
      <VideoGrid />
    </div>
  );
}

export default Channel;
