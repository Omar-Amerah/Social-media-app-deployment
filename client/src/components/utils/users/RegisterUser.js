export default async function RegisterUser(username, password, email) {
    try {
      const response = await fetch(`http://localhost:5001/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        //alert("Account created");
        return true;
      } else {
        if (data.errors !== undefined) {
          alert(data.errors[0].msg);
          return false;
        }
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  }
  