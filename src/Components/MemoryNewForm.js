import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API = process.env.REACT_APP_API_URL;

const MemoryNewForm = () => {
  let navigate = useNavigate();

  const addMemory = (newMemory) => {
    axios
      .post(`${API}/memories`, newMemory)
      .then(
        () => {
          navigate(`/memories`);
        },
        (error) => console.error(error)
      )
      .catch((error) => console.warn("catch", error));
  };

  const [memory, setMemory] = useState({
    name: "",
    image: "",
    description: "",
    year: 0,
    is_favorite: false,
  });

  const handleTextChange = (event) => {
    setMemory({ ...memory, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setMemory({ ...memory, is_favorite: !memory.is_favorite });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addMemory(memory);
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            value={memory.name}
            type="text"
            onChange={handleTextChange}
            placeholder="Your Name"
            required
            className="form-input"
          />
        </div>
        <div className="form-row">
          <label htmlFor="image">Image URL:</label>
          <input
            id="image"
            value={memory.image}
            type="text"
            onChange={handleTextChange}
            placeholder="https://live.staticflickr.com/65535/52943856942_a4b45a1751_n.jpg"
            required
            className="form-input"
          />
        </div>
        <div className="form-row">
          <label htmlFor="description">Image Description:</label>
          <input
            id="description"
            value={memory.description}
            type="text"
            onChange={handleTextChange}
            placeholder="Tell us about the picture"
            required
            className="form-input"
          />
        </div>
        <div className="form-row">
          <label htmlFor="year">Year taken:</label>
          <input
            id="year"
            value={memory.year}
            type="number"
            onChange={handleTextChange}
            placeholder="2023"
            required
            className="form-input"
          />
        </div>
        <div className="form-row">
          <label htmlFor="is_favorite">Favorite?</label>
          <input
            id="is_favorite"
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={memory.is_favorite}
            className="form-checkbox"
          />
        </div>

        <br />
        <input type="submit" className="form-submit-button" value="Submit" />
      </form>
    </div>
  );
};

export default MemoryNewForm;
