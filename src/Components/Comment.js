import CommentsForm from "./CommentsForm";
import { useState } from "react";

const Comment = ({comment, handleDelete, handleSubmit}) => {
    const [viewEditForm, toggleEditForm] = useState(false);
    const toggleView = () => {
        toggleEditForm(!viewEditForm);
    };

    return (
        <div className="Comment">
            <button onClick={toggleView}> Edit this Comment</button>
            {viewEditForm ? (
                <CommentsForm
                commentDetails={comment}
                toggleView={toggleView}
                handleSubmit={handleSubmit}
                />
            ) : (
                <div>
                    <h4>
                        {comment.commenter}
                    </h4>
                    <p>{comment.content}</p>
                </div>
            )}
            <button onClick={() => handleDelete(comment.id)}>Delete</button>
        </div>
    );
};

export default Comment;