export default async function FollowedPosts(id) {
    try {
        const response = await fetch(`https://testhostserversocial.onrender.com/posts/followed/${id}`);
        const data = await response.json();
        if (response.status === 200) {
            return data.posts;
        } else {
            if (data.errors !== undefined) {
                alert(data.errors[0].msg);
                return;
            }
            //alert(data.message);
        }
    } catch (error) {
        alert(error.message);
    }
}
 