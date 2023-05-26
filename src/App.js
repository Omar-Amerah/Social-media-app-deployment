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
      <Route path="/home" element={<Home />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
