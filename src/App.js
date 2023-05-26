import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './pages/Homepage';
import Discover from "./pages/Discover";
import Profile from "./pages/Profile"
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="socialmedia/home" element={<Home />} />
      <Route path="socialmedia/discover" element={<Discover />} />
      <Route path="socialmedia/profile" element={<Profile />} />
      <Route path="socialmedia/login" element={<Login />} />
      <Route path="socialmedia/register" element={<Register />} />
    </Routes>
  );
}

export default App;
