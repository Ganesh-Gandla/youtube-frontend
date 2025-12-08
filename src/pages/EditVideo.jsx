// Import hooks and utilities
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import "../styles/AddVideo.css";

function EditVideo() {
  // Extract videoId from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // State for storing video and loading state
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form fields
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Education");

  // Load existing video details on page load
  useEffect(() => {
    const loadVideo = async () => {
      try {
        // Fetch video data
        const res = await api.get(`/videos/${id}`);
        setVideo(res.data.video);

        // Pre-fill form fields
        setTitle(res.data.video.title);
        setVideoUrl(res.data.video.videoUrl);
        setThumbnailUrl(res.data.video.thumbnailUrl);
        setDescription(res.data.video.description);
        setCategory(res.data.video.category);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [id]);

  // Handle update video request
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/videos/${id}`, {
        title,
        videoUrl,
        thumbnailUrl,
        description,
        category,
      });

      alert("Video updated successfully");

      // Redirect back to video page
      navigate(`/video/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  // Loading state
  if (loading) return <p className="loader">Loading...</p>;

  return (
    <div className="add-video-page">
      <h2>Edit Video</h2>

      {/* Update video form */}
      <form className="video-form" onSubmit={handleUpdate}>

        {/* Video URL */}
        <label className="label">Video URL</label>
        <input
          type="text"
          className="input"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />

        {/* Thumbnail URL */}
        <label className="label">Thumbnail URL</label>
        <input
          type="text"
          className="input"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          required
        />

        {/* Video Title */}
        <label className="label">Title</label>
        <input
          type="text"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Description */}
        <label className="label">Description</label>
        <textarea
          className="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Category selection */}
        <label className="label">Category</label>
        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Education</option>
          <option>Music</option>
          <option>Programming</option>
          <option>Gaming</option>
          <option>Blog</option>
        </select>

        {/* Submit button */}
        <button className="upload-btn">Update Video</button>
      </form>
    </div>
  );
}

export default EditVideo;
