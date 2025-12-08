import { useState, useEffect } from "react";
import {FaUserCircle} from 'react-icons/fa'
import { useSelector } from "react-redux";
import api from "../utils/axios";
import CommentItem from "./CommentItem";
import "../styles/CommentSection.css";

function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // Load logged-in user info
  const { user } = useSelector((state) => state.auth);


  // Load comments
  const loadComments = async () => {
    try {
      const res = await api.get(`/comments/${videoId}`);
      setComments(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error loading comments", err);
    }
  };

  // Add comment
  const addComment = async () => {
    if (!text.trim()) return;

    try {
      const res = await api.post("/comments", {
        videoId,
        text,
      });

      setComments((prev) => [res.data.comment, ...prev]);
      setText("");
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

  useEffect(() => {
    loadComments();
  }, [videoId]);

  return (
    <div className="comments-section">
      <h3>Comments</h3>

      {/* Add Comment */}
      <div className="add-comment">
        {user.avatar?(<img
          src={user.avatar}
          alt="User"
          className="user-pic"
        />):(<FaUserCircle className="user-pic"/>)}
        

        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={addComment}>Post</button>
      </div>

      {/* Render Comments */}
      {comments.map((c) => (
        <CommentItem
          key={c.commentId}
          comment={c}
          currentUserId={user?.userId}
          onDelete={loadComments}
          onUpdate={loadComments}
        />
      ))}
    </div>
  );
}

export default CommentSection;
