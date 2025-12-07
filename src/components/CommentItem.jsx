import { useState, useRef, useEffect } from "react";
import api from "../utils/axios";
import "../styles/CommentItem.css";

function CommentItem({ comment, currentUserId, onDelete, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const wrapperRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Handle Edit Save
  const handleEdit = async () => {
    try {
      await api.put(`/comments/${comment.commentId}`, {
        text: editText,
      });

      setEditing(false);
      onUpdate(); // refresh list
    } catch (err) {
      console.error("Error updating comment", err);
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    try {
      await api.delete(`/comments/${comment.commentId}`);
      setConfirmDelete(false);
      onDelete(); // refresh list
    } catch (err) {
      console.error("Error deleting comment", err);
    }
  };

  return (
    <div className="comment-item">
      <img src={comment.userAvatar} alt="avatar" className="comment-avatar" />

      <div className="comment-body">
        <div className="comment-header">
          <span className="comment-author">{comment.username}</span>
          <span className="comment-date">2 weeks ago</span>

          {/* Menu Wrapper */}
          <div className="menu-wrapper" ref={wrapperRef}>
            {currentUserId === comment.userId && (
              <>
                <button
                  className="menu-btn"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  ⋮
                </button>

                {open && (
                  <div className="menu-box">
                    <div
                      className="menu-item"
                      onClick={() => {
                        setEditing(true);
                        setOpen(false);
                      }}
                    >
                      Edit
                    </div>
                    <div
                      className="menu-item delete"
                      onClick={() => {
                        setConfirmDelete(true);
                        setOpen(false);
                      }}
                    >
                      Delete
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Edit Mode */}
        {editing ? (
          <div className="edit-container">
            <input
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />

            <div className="edit-actions">
              <button className="cancel-btn" onClick={() => setEditing(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleEdit}>
                Save
              </button>
            </div>
          </div>
        ) : (
          <p className="comment-text">{comment.text}</p>
        )}

        {/* Delete Confirmation */}
        {confirmDelete && (
          <div className="delete-popup">
            <p>Delete this comment?</p>
            <div className="popup-actions">
              <button onClick={() => setConfirmDelete(false)}>Cancel</button>
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentItem;
