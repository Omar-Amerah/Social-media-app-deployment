export default async function LoginUser(username, password) {
    try {
        console.log(username)
        console.log(password)
        const response = await fetch(`http://localhost:5001/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        
        const data = await response.json();
        if (response.status === 200) {
            alert("logged in");
            return true;
        } else {
            if (data.errors !== undefined) {
                alert(data.errors[0].msg);
                return;
            }
            alert(data.message);
        }
    } catch (error) {
        alert(error.message);
    }
}
