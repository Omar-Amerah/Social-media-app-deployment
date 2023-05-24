export default async function LoginUser(username, password) {
    try {
      const response = await fetch(`http://localhost:5001/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        credentials: "include", // Include cookies in the request
      });
  
      const data = await response.json();
      if (response.ok) {
        //alert("Logged in");
        return true;
      } else {
        if (data.errors !== undefined) {
          alert(data.errors[0].msg);
          return (data.message).toString();
        }
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  }
  