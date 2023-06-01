export default async function GetOneUser(id) {
    try {
        const response = await fetch(`https://testhostserversocial.onrender.com/user/${id}`);
        const data = await response.json();
        if (response.status === 200) {
            return data.result;
        } else {
            if (data.errors !== undefined) {
                alert(data.errors[0].msg);
                return;
            }
        }
    } catch (error) {
        alert(error.message);
    }
}
