export default async function LoginUser(username, password) {
  try {
    // Clear the "user" cookie
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    const response = await fetch(`https://testhostserversocial.onrender.com/login`, {
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
      // Set the "user" cookie
      const userCookie = { id: data.id, name: data.name };
      const userCookieString = JSON.stringify(userCookie);
      document.cookie = `user=${encodeURIComponent(userCookieString)}; path=/;`;
      //alert("Logged in");
      return true;
    } else {
      if (data.errors !== undefined) {
        alert(data.errors[0].msg);
        return data.message.toString();
      }
      alert(data.message);
    }
  } catch (error) {
    alert(error.message);
  }
}