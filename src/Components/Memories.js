import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Memory from "./Memory.js";
import "../App.css"

const API = process.env.REACT_APP_API_URL;

const Memories = () => {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/memories`)
      .then((response) => {
        console.log(response.data);
        setMemories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="Memories">
      <h1 className="memories-heading">All Memories</h1> 
      <section className="Memory-Grid card-container"> 
        {memories.map((memory) => {
          // Check if the image URL is valid
          const isValidImage = memory.image && memory.image.startsWith("https://");
          if (!isValidImage) {
            console.log("Invalid image URL:", memory.image);
            return null; // Skip rendering this memory
          }

          const imageURL = memory.image;
          console.log("Resolved image URL:", imageURL);

          return <Memory key={memory.id} memory={{ ...memory, image: imageURL }} />;
        })}
      </section>
    </div>
  );
};

export default Memories;
