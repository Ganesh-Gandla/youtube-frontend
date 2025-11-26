import { useState } from "react";
import CommentItem from "./CommentItem";
import "../styles/CommentSection.css";

function CommentSection() {

    const [comments, setComments] = useState([
        {
            id: 1,
            username: "User123",
            time: "1 day ago",
            text: "This is a comment!",
            userPic: ""
        },
        {
            id: 2,
            username: "Alex",
            time: "5 hours ago",
            text: "Nice video!",
            userPic: ""
        },
        {
            id: 3,
            username: "John",
            time: "2 hours ago",
            text: "Awesome content!",
            userPic: ""
        }
    ]);

    return (
        <div className="comments-section">
            <h3>Comments</h3>

            {/* Add Comment */}
            <div className="add-comment">
                <img src="" alt="User" className="user-pic" />
                <input type="text" placeholder="Add a comment..." />
            </div>

            {/* Render Comments */}
            {comments.map((c) => (
                <CommentItem
                    key={c.id}
                    username={c.username}
                    time={c.time}
                    text={c.text}
                    userPic={c.userPic}
                />
            ))}
        </div>
    );
}

export default CommentSection;
