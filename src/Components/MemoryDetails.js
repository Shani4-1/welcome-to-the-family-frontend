import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Comments from "./Comments.js";

const API = process.env.REACT_APP_API_URL;

export const MemoryDetails = () => {
  const [memory, setMemory] = useState({});
  console.log("memory:", memory);

  const { id } = useParams();
  console.log("id:", id);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/memories/${id}`)
      .then((response) => {
        console.log("API response:", response.data);
        if (
          response.data &&
          typeof response.data === "object" &&
          Object.keys(response.data).length > 0
        ) {
          setMemory(response.data);
        } else {
          console.log("API response is empty or not an object:", response.data);
        }
      })
      .catch((error) => {
        console.log("API error:", error);
        console.warn("catch", error);
      });
  }, [id]);

  const handleDelete = () => {
    console.log("I clicked delete");
    deleteMemory();
  };

  const deleteMemory = () => {
    axios
      .delete(`${API}/memories/${id}`)
      .then(() => {
        navigate(`/memories`);
      })
      .catch((error) => {
        console.warn("catch:", error);
      });
  };

  // Check if memory object is undefined or null
  const isMemoryEmpty = !memory || Object.keys(memory).length === 0;
  console.log("isMemoryEmpty:", isMemoryEmpty);

  return (
    <article className="memory-details">
      {isMemoryEmpty ? (
        <p>Loading...</p>
      ) : (
        <>
          <img
            src={memory.image}
            alt={memory.name}
            className="memory-details_image larger-image" 
          />
          <div className="memory-details_details">
            <h2 className="memory-details_name">
              {memory.is_favorite && <span>❤️</span>}
              {memory.name}
            </h2>
            <h5 className="memory-details_description">{memory.description}</h5>
            <h5 className="memory-details_year">{memory.year}</h5>
          </div>
          <div className="memory-details_navigation center-buttons"> 
            <div className="button-container">
              <div>
                <Link to="/memories">
                  <button>Back</button>
                </Link>
              </div>
              <div>
                <Link to={`/memories/${id}/edit`}>
                  <button>Edit</button>
                </Link>
              </div>
              <div>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
          <br />
          <Comments />
        </>
      )}
    </article>
  );
};
