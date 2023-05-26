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
      <Route path="Social-media-app-deployment/" element={<Home />} />
      <Route path="Social-media-app-deployment/discover" element={<Discover />} />
      <Route path="Social-media-app-deployment/profile" element={<Profile />} />
      <Route path="Social-media-app-deployment/login" element={<Login />} />
      <Route path="Social-media-app-deployment/register" element={<Register />} />
    </Routes>
  );
}

export default App;
