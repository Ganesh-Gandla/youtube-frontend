import { useState } from "react";
import api from "../utils/axios";
import "../styles/CommentItem.css";

function CommentItem({ comment, onDelete, onUpdate }) {
  const [showMenu, setShowMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(comment.text);

  // Update comment
  const handleUpdate = async () => {
    try {
      await api.put(`/comments/${comment.commentId}`, { text });
      setEditMode(false);
      onUpdate();
    } catch (err) {
      console.error("Error updating comment", err);
    }
  };

  // Delete comment
  const handleDelete = async () => {
    try {
      await api.delete(`/comments/${comment.commentId}`);
      onDelete();
    } catch (err) {
      console.error("Error deleting comment", err);
    }
  };

  return (
    <div className="comment-item">

      <img src="" alt="User" className="c-user-pic" />

      <div className="c-body">
        <p className="c-username">
          {comment.username}{" "}
          <span className="c-time">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
        </p>

        {/* EDIT MODE */}
        {editMode ? (
          <>
            <textarea
              className="edit-box"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="save-btn" onClick={handleUpdate}>Save</button>
            <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <p className="c-text">{comment.text}</p>
        )}

        <div className="c-actions">
          <button className="c-btn"><img src="/like-inactive.png" alt="" width={"18px"}/></button>
          <button className="c-btn"><img src="/dislike-inactive.png" alt="" width={"18px"}/></button>
          <button className="c-reply">Reply</button>
        </div>
      </div>

      <div className="c-more-wrapper">
        <button className="c-more" onClick={() => setShowMenu(!showMenu)}>
          ⋮
        </button>

        {showMenu && (
          <div className="c-menu">
            <p className="c-menu-item" onClick={() => setEditMode(true)}>Edit</p>
            <p className="c-menu-item" onClick={handleDelete}>Delete</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default CommentItem;
