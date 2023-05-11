import React from "react";
import "../assets/navbar.css";

export default function Header() {
    return (
        <nav className='navbar'>
        <button className='abutton active'>Home</button>
        <button className='abutton'>Discover</button>
        <button className='abutton'>Profile</button>
        <button id='createpost' className='abutton'>Create Post</button>
        <button id='login' className='abutton'>Login</button>
      </nav>
    );
}