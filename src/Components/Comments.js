import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


import Comment from "./Comment";
import CommentsForm from "./CommentsForm";


const API = process.env.REACT_APP_API_URL;

const Comments = () => {
    const [comments, setComments]= useState([]);
    let { id } = useParams();

    useEffect(() => {
        axios.get(`${API}/memories/${id}/comments`)
        .then((response) => {
            setComments(response.data)
        });
    }, [id]);

    const handleAdd = (newComment) => {
        axios.post(`${API}/memories/${id}/comments`, newComment)
        .then((response) => {
            setComments([response.data, ...comments])
        },
        (error) => console.error(error)
        )
        .catch((error) => console.warn("catch", error));
    };

    const handleDelete = (commentId) => {
        axios.delete(`${API}/memories/${id}/comments/${commentId}`)
        .then((response) => {
            const copyCommentsArray = [...Comments];
            const indexOfDeletedComment = copyCommentsArray.findIndex((comment) => {
                return comment.id === id
            });
            copyCommentsArray.splice(indexOfDeletedComment, 1);
            setComments(copyCommentsArray)
        },
        (error) => console.error(error)
        )
        .catch((error) => console.warn("catch", error))
    };

    const handleEdit = (updatedComment) => {
        axios.put(`${API}/memories/${id}/comments/${updatedComment.id}`, updatedComment)
        .then((response) => {
            const copyCommentsArray = [...comments];
            const indexUpdatedComment = copyCommentsArray.findIndex((comment) => {
                return comment.id === updatedComment.id;
            });
            copyCommentsArray[indexUpdatedComment] = response.data;
            setComments(copyCommentsArray)
        })
        .catch((error) => console.warn("catch", error));
    };

    return (
        <section className="Comments">
            <h2>Comments</h2>
            <CommentsForm handleSubmit={handleAdd}>
                <h3>Add a new Comment</h3>
            </CommentsForm>
            {comments.map((comment) => (
                <Comment
                key={comment.id}
                comment={comment}
                handleSubmit={handleEdit}
                handleDelete={handleDelete}
                />
            ))}
        </section>
    );
};

export default Comments;