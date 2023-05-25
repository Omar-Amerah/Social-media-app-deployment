export default async function LikePost(userid, postid) {
    try {
      const response = await fetch(`http://localhost:5001/users/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: postid,
          userId: userid,
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