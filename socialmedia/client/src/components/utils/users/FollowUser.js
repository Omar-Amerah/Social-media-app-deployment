export default async function FollowUser(id, followid) {
    try {
      const response = await fetch(`http://localhost:5001/users/follow`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          number: followid,
        })
      });
  
      const data = await response.json();
      if (response.ok) {
        //alert("Followed");
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
  