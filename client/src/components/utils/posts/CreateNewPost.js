export default async function CreatePost(title, content, id) {
    try {
      const response = await fetch(`http://localhost:5001/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          content: content,
          id: id,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        //alert("Post created");
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
  