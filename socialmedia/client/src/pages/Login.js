import "../assets/login.css";

export default function Login() {
    return (
        <>
            <div className="loginBox">
                <h1 className="title">Social Media</h1>
                <input type="text" className="input" placeholder="Username"></input>
                <input type="text" className="input" placeholder="Password"></input>
                <button className="button">Login</button>
            </div>
        </>
    );
}
