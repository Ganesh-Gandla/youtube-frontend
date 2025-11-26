import "../styles/VideoPage.css";

function VideoPage() {
    return (
        <div className="video-page">

            {/* LEFT SECTION */}
            <div className="left-section">

                {/* VIDEO PLAYER */}
                <div className="video-player">
                    <video controls>
                        <source src="" type="video/mp4" />
                    </video>
                </div>

                {/* VIDEO TITLE */}
                <h2 className="video-title">Video Title Goes Here</h2>

                {/* INFO + ACTIONS */}
                <div className="video-info-row">
                    <p className="views">1,234,567 views • Jan 25, 2025</p>

                    <div className="actions">
                        <button>👍 Like</button>
                        <button>👎 Dislike</button>
                        <button>🔗 Share</button>
                        <button>⬇ Download</button>
                    </div>
                </div>

                {/* CHANNEL BOX */}
                <div className="channel-box">
                    <img src="" alt="Channel Logo" className="channel-logo" />

                    <div className="channel-text">
                        <h4 className="channel-name">Channel Name</h4>
                        <p className="subs">1.2M subscribers</p>
                    </div>

                    <button className="subscribe-btn">Subscribe</button>
                </div>

                {/* VIDEO DESCRIPTION */}
                <div className="description-box">
                    <p>
                        This is the video description area.  
                        Add more lines here...
                    </p>
                </div>

                {/* COMMENTS SECTION */}
                <div className="comments-section">
                    <h3>Comments</h3>

                    <div className="add-comment">
                        <img src="" alt="User" className="user-pic" />
                        <input type="text" placeholder="Add a comment..." />
                    </div>

                    {/* Single Comment */}
                    <div className="comment">
                        <img src="" alt="User" className="user-pic" />
                        <div>
                            <p className="user-name">User123 <span>1 day ago</span></p>
                            <p className="comment-text">This is a comment!</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* RIGHT SIDE SUGGESTED VIDEOS */}
            <div className="right-section">
                {[1,2,3,4,5,6].map((n) => (
                    <div className="suggested-video" key={n}>
                        <img src="" alt="thumbnail" className="thumb" />
                        <div>
                            <p className="s-title">Suggested Video Title</p>
                            <p className="s-channel">Channel Name</p>
                            <p className="s-views">123K views</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default VideoPage;
