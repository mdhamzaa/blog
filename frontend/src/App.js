import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Land from "./components/landing.js";
import { Login } from "./pages/login.js";
import { Register } from "./pages/register.js";
import { CreateBlog } from "./pages/createBlog.js";

// import About from './components/About';
// import Contact from './components/Contact';

function App() {
  return (
    <>
      <div className="leading-normal tracking-normal ">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Land />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-blog" element={<CreateBlog />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
