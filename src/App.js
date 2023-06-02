
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';

import Edit from "./Pages/Edit.js";
import FourOFour from "./Pages/FourOFour.js";
import Home from "./Pages/Home.js";
import Index from "./Pages/Index.js";
import New from "./Pages/New.js";
import Show from "./Pages/Show.js";

import NavBar from "./Components/NavBar.js"

function App() {
  return (
    <div className="App">
      <Router>
       <NavBar/>
       <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/memories' element={<Index />} />
          <Route path='/memories/new' element={<New />} />
          <Route path='/memories/:id' element={<Show />} />
          <Route path='/memories/:id/edit' element={<Edit />} />
          <Route path='*' element={<FourOFour />} />
        </Routes>
        </main> 
      </Router>
    </div>
  );
}

export default App;
