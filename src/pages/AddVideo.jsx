import { useState } from "react";
import "../styles/AddVideo.css";
import api from "../utils/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddVideo() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const channelId = user?.channels?.[0] || null;

  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Education");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!channelId) {
      alert("You must have a channel to upload videos");
      return navigate("/channel");
    }

    try {
      const res = await api.post("/videos", {
        title,
        description,
        category,
        channelId,
        uploader: user.userId,
        videoUrl,
        thumbnailUrl,
      });

      alert("Video uploaded successfully!");
      navigate(`/video/${res.data.video.videoId}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error uploading video");
    }
  };

  return (
    <div className="add-video-page">
      <h2>Upload New Video</h2>

      <form className="video-form" onSubmit={handleSubmit}>

        {/* Video */}
        <label className="label">Video</label>
        <input
          type="text"
          className="input"
          placeholder="Enter video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />

        {/* thumbnail */}
        <label className="label">Thumbnail</label>
        <input
          type="text"
          className="input"
          placeholder="Enter thumbnail URL"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          required
        />

        {/* Title */}
        <label className="label">Title</label>
        <input
          type="text"
          className="input"
          placeholder="Enter video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Description */}
        <label className="label">Description</label>
        <textarea
          className="textarea"
          placeholder="Video description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Category */}
        <label className="label">Category</label>
        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option>Education</option>
          <option>Music</option>
          <option>Programming</option>
          <option>Gaming</option>
          <option>Blog</option>
          <option>Movie</option>
        </select>
        <button className="upload-btn">Upload Video</button>
      </form>
    </div>
  );
}

export default AddVideo;
