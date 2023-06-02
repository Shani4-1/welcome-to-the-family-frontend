import { Link } from "react-router-dom";
import "../App.css"

const NavBar = () => {
  return (
    <nav>
      <div className="button-container">
        <button>
          <Link to={`/memories`}>All Memories</Link>
        </button>
        <div className="logo-container">
        <Link to={`/`}>
          <img
            src="https://live.staticflickr.com/65535/52944076512_c4cbd79857_n.jpg"
            alt="logo"
          />
        </Link>
      </div>
        <button>
          <Link to={`/memories/new`}>Add New Memory</Link>
        </button>
      </div>
      
    </nav>
  );
};

export default NavBar;
