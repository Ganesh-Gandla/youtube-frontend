import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import "../styles/CreateChannelPage.css";

function EditChannel() {
  const { channelId } = useParams();
  const navigate = useNavigate();

  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelLogo, setChannelLogo] = useState("");
  const [channelBanner, setChannelBanner] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChannel = async () => {
      try {
        const res = await api.get(`/channel/${channelId}`);

        setChannelName(res.data.channelName);
        setDescription(res.data.description);
        setChannelLogo(res.data.channelLogo);
        setChannelBanner(res.data.channelBanner);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadChannel();
  }, [channelId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/channel/${channelId}`, {
        channelName,
        description,
        channelLogo,
        channelBanner,
      });

      alert("Channel updated!");
      navigate(`/channel/${channelId}`);

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) return <p className="loader">Loading...</p>;

  return (
    <div className="create-channel-page">
      <h2>Edit Channel</h2>

      <form className="channel-form" onSubmit={handleUpdate}>

        <label className="label">Channel Banner</label>
        <input
          type="text"
          className="input"
          value={channelBanner}
          onChange={(e) => setChannelBanner(e.target.value)}
        />

        <label className="label">Channel Logo</label>
        <input
          type="text"
          className="input"
          value={channelLogo}
          onChange={(e) => setChannelLogo(e.target.value)}
        />

        <label className="label">Channel Name</label>
        <input
          type="text"
          className="input"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          required
        />

        <label className="label">Description</label>
        <textarea
          className="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button className="create-btn">Update Channel</button>
      </form>
    </div>
  );
}

export default EditChannel;
