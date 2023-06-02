import { Link } from "react-router-dom";
import "../App.css"; // Import the existing App.css file

const Memory = ({ memory }) => {
  const imageUrl = memory.image; // Remove the leading forward slash

  console.log("Image URL:", imageUrl);

  return (
    <div className="Memory-Card card"> 
      <img className="memory-image" src={imageUrl} alt={memory.name} />

      <div className="Memory-Details card-details"> 
        <h3>{memory.name}</h3>
        <p>{memory.description}</p>
        <p>{memory.year}</p>
        <p>
          Is this one of your favorite memories?{" "}
          {memory.is_favorite ? <span>❤️</span> : <span>&nbsp; &nbsp; &nbsp;</span>}
        </p>
        <Link to={`/memories/${memory.id}`} className="card-link">📷 Memory Details 📷</Link> 
      </div>
    </div>
  );
};

export default Memory;
