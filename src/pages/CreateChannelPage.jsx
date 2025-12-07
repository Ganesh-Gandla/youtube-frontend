import { useState } from "react";
import "../styles/CreateChannelPage.css";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

function CreateChannelPage() {

    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState("");

    const [channelLogo, setChannelLogo] = useState("");
    const [channelBanner, SetChannelBanner] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/channel", {
                channelName,
                description,
                channelBanner,
                channelLogo
            });

            alert("Channel created!");


            const channelId = res.data.channel.channelId;
            console.log(res.data.channel)
            navigate(`/channel/${channelId}`);

        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="create-channel-page">
            <h2>Create a New Channel</h2>

            <form className="channel-form" onSubmit={handleSubmit}>

                {/* Banner Upload */}
                <label className="label">Channel Banner</label>
                <input
                    type="text"
                    className="input"
                    placeholder="Enter channel Banner URL"
                    value={channelBanner}
                    onChange={(e) => SetChannelBanner(e.target.value)}
                />

                {/* Logo Upload */}
                <label className="label">Channel Logo</label>
                <input
                    type="text"
                    className="input"
                    placeholder="Enter channel Logo URL"
                    value={channelLogo}
                    onChange={(e) => setChannelLogo(e.target.value)}
                />

                {/* Channel Name */}
                <label className="label">Channel Name</label>
                <input
                    type="text"
                    className="input"
                    placeholder="Enter channel name"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    required
                />

                {/* Description */}
                <label className="label">Description</label>
                <textarea
                    className="textarea"
                    placeholder="Describe your channel..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button className="create-btn">Create Channel</button>
            </form>
        </div>
    );
}

export default CreateChannelPage;
