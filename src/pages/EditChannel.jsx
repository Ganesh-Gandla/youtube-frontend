import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import "../styles/CreateChannelPage.css";

function EditChannel() {
  // Get channelId from URL
  const { channelId } = useParams();
  const navigate = useNavigate();

  // ---------------- FORM STATES ----------------
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelLogo, setChannelLogo] = useState("");
  const [channelBanner, setChannelBanner] = useState("");

  // Loading state while fetching channel details
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH CHANNEL DETAILS ON LOAD ----------------
  useEffect(() => {
    const loadChannel = async () => {
      try {
        // GET channel info
        const res = await api.get(`/channel/${channelId}`);

        // Fill input fields with existing data
        setChannelName(res.data.channelName);
        setDescription(res.data.description);
        setChannelLogo(res.data.channelLogo);
        setChannelBanner(res.data.channelBanner);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // stop loader
      }
    };

    loadChannel();
  }, [channelId]);

  // ---------------- UPDATE CHANNEL ----------------
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // PUT request to update channel
      await api.put(`/channel/${channelId}`, {
        channelName,
        description,
        channelLogo,
        channelBanner,
      });

      alert("Channel updated!");

      // Redirect back to channel page
      navigate(`/channel/${channelId}`);

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  // Show loader while fetching data
  if (loading) return <p className="loader">Loading...</p>;

  return (
    <div className="create-channel-page">
      <h2>Edit Channel</h2>

      <form className="channel-form" onSubmit={handleUpdate}>
        
        {/* Banner Input */}
        <label className="label">Channel Banner</label>
        <input
          type="text"
          className="input"
          value={channelBanner}
          onChange={(e) => setChannelBanner(e.target.value)}
        />

        {/* Logo Input */}
        <label className="label">Channel Logo</label>
        <input
          type="text"
          className="input"
          value={channelLogo}
          onChange={(e) => setChannelLogo(e.target.value)}
        />

        {/* Name Input */}
        <label className="label">Channel Name</label>
        <input
          type="text"
          className="input"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          required
        />

        {/* Description Input */}
        <label className="label">Description</label>
        <textarea
          className="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Update Button */}
        <button className="create-btn">Update Channel</button>
      </form>
    </div>
  );
}

export default EditChannel;
