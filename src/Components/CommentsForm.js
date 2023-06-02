import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CommentsForm = (props) => {
    let { id } = useParams();
    const { commentDetails } = props;

    const [comment, setComment] = useState({
        commenter: "",
        content: "",
        is_favorite: false,
        memory_id: id,
    });

    const handleTextChange = (event) => {
        const { id, value } = event.target;
        setComment((prevState) => ({ ...prevState, [id]: value }));
    };

    const handleCheckboxChange = () => {
        setComment({ ...comment, is_favorite: !comment.is_favorite });
    }

    useEffect(() => {
        if (commentDetails) {
            setComment(commentDetails);
        }
    }, [id, commentDetails, props]);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleSubmit(comment, id);
        if (commentDetails) {
            console.log("comment id", commentDetails.id);
            props.toggleView();
        }
        setComment({
            commenter: "",
            content: "",
            is_favorite: false,
            memory_id: id,
        });
    };

    return (
        <div className="Edit">
            {props.children}
            <form onSubmit={handleSubmit}>
                <label htmlFor="commenter">Name:</label>
                <input
                    id="commenter"
                    value={comment.commenter}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Name"
                    required
                />
                <label htmlFor="content">Content:</label>
                <input
                    id="content"
                    value={comment.content}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Comment Here"
                    required
                />
                <label htmlFor="is_favorite">Is it Your Favorite?</label>
                <input
                    id="is_favorite"
                    value={comment.is_favorite}
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={comment.is_favorite}
                />
                <br />

                <input type="submit" />
            </form>
        </div>
    )
};



export default CommentsForm;
