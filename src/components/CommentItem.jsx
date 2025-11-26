import { useState } from "react";
import "../styles/CommentItem.css";

function CommentItem({ username, time, text, userPic }) {

    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="comment-item">

            <img src={userPic} alt="User" className="c-user-pic" />

            <div className="c-body">
                <p className="c-username">
                    {username} <span className="c-time">{time}</span>
                </p>

                <p className="c-text">{text}</p>

                <div className="c-actions">
                    <button className="c-btn">👍</button>
                    <button className="c-btn">👎</button>
                    <button className="c-reply">Reply</button>
                </div>
            </div>

            <div className="c-more-wrapper">
                <button className="c-more" onClick={() => setShowMenu(!showMenu)}>
                    ⋮
                </button>

                {showMenu && (
                    <div className="c-menu">
                        <p className="c-menu-item">Edit</p>
                        <p className="c-menu-item">Delete</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentItem;
