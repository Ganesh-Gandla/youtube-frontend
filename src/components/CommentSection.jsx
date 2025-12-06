import { useState, useEffect } from "react";
import api from "../utils/axios";
import CommentItem from "./CommentItem";
import "../styles/CommentSection.css";

function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // Load comments from backend
  const loadComments = async () => {
    try {
      const res = await api.get(`/comments/${videoId}`);
      setComments(res.data);
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

      setComments((prev) => [res.data.comment, ...prev]); // add new comment on top
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
        <img src="" alt="User" className="user-pic" />
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
          onDelete={() => loadComments()}
          onUpdate={() => loadComments()}
        />
      ))}
    </div>
  );
}

export default CommentSection;
