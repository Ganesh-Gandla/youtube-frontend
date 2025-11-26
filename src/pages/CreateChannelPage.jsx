import { useState } from "react";
import "../styles/CreateChannelPage.css";

function CreateChannelPage() {

    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState("");

    const [logoPreview, setLogoPreview] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) setLogoPreview(URL.createObjectURL(file));
    };

    const handleBannerUpload = (e) => {
        const file = e.target.files[0];
        if (file) setBannerPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Channel Created!");
        // Here you will call API to POST channel data
    };

    return (
        <div className="create-channel-page">
            <h2>Create a New Channel</h2>

            <form className="channel-form" onSubmit={handleSubmit}>

                {/* Banner Upload */}
                <label className="label">Channel Banner</label>
                <div className="banner-upload-area">
                    {bannerPreview ? (
                        <img src={bannerPreview} alt="banner" className="banner-preview" />
                    ) : (
                        <p>Upload Banner Image</p>
                    )}
                    <input type="file" accept="image/*" onChange={handleBannerUpload} />
                </div>

                {/* Logo Upload */}
                <label className="label">Channel Logo</label>
                <div className="logo-upload-area">
                    {logoPreview ? (
                        <img src={logoPreview} alt="logo" className="logo-preview" />
                    ) : (
                        <p>Upload Logo</p>
                    )}
                    <input type="file" accept="image/*" onChange={handleLogoUpload} />
                </div>

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
                ></textarea>

                <button className="create-btn">Create Channel</button>
            </form>
        </div>
    );
}

export default CreateChannelPage;
