import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";


const API = process.env.REACT_APP_API_URL;

const MemoryEditForm = () => {
    const {id} = useParams();
    let navigate = useNavigate();

    const [memory, setMemory] = useState({
        name: "",
        image: "",
        description: "",
        year: "",
        is_favorite: false,
      });
      

      const updateMemory = (updatedMemory) => {
        axios
          .put(`${API}/memories/${id}`, {
            name: updatedMemory.name,
            image: updatedMemory.image,
            description: updatedMemory.description,
            year: updatedMemory.year,
            is_favorite: updatedMemory.is_favorite,
          })
          .then(() => {
            navigate(`/memories/${id}`);
          })
          .catch((error) => {
            console.error(error);
          });
      };

    
    const handleTextChange = (event) => {
        setMemory({...memory, [event.target.id]: event.target.value})
    };

    const handleCheckboxChange = () => {
        setMemory({...memory, is_favorite: !memory.is_favorite })
    };

    useEffect(() => {
        axios.get(`${API}/memories/${id}`)
        .then((response) => setMemory(response.data))
        .catch(() => navigate(`/not-found`));
    }, [id, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        updateMemory(memory);
    };

    return (
        <div className="New">
            <form onSubmit={handleSubmit}>
             <label htmlFor="name">Name:</label>
             <input
             id="name"
             value={memory.name || ""}
             type="text"
             onChange={handleTextChange}
             placeholder="Your Name"
             required
             />
             <label htmlFor="image">Image URL:</label>
             <input
             id="image"
             value={memory.image || ""}
             type="text"
             onChange={handleTextChange}
             placeholder="https://live.staticflickr.com/65535/52943856942_a4b45a1751_n.jpg"
             required
             />
             <label htmlFor="description">Image Description:</label>
             <input
             id="description"
             value={memory.description || ""}
             type="text"
             onChange={handleTextChange}
             placeholder="Tell us about the picture"
             required
             />
             <label htmlFor="year">Year taken</label>
             <input
             id="year"
             value={memory.year || ""}
             type="number"
             onChange={handleTextChange}
             placeholder="2023"
             required
             />
             <label htmlFor="is_favorite">Favorite?</label>
             <input
             id="is_favorite"
             type="checkbox"
             onChange={handleCheckboxChange}
             checked={memory.is_favorite}
             />

             <br/>
             <input type="submit"/>
            </form>
            <Link to={`/memories/${id}`}>
                <button>Cancel</button>
            </Link>
        </div>
    );
};

export default MemoryEditForm;