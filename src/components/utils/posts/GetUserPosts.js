export default async function GetUserPosts(id) {
    try {
        const response = await fetch(`https://testhostserversocial.onrender.com/posts/user/${id}`);
        const data = await response.json();
        if (response.status === 200) {
            return data.result;
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
 