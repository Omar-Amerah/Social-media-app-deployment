//import Main from "../components/Main";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import "../assets/post.css";
//import Boards from "../components/Boards";
//import Footer from "../components/Footer";

export default function Home() {
    return (
        <>
            <Header />
            <Navbar />
            <div className="post-container">
                <Post /> 
                <Post /> 
                <Post /> 
                <Post /> 
                <Post /> 
                <Post /> 
                <Post /> 
                <Post /> 
                <Post /> 
                <Post /> 
                <Post /> 
                <Post /> 
            </div>
        </>
    );
}
