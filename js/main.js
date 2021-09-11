const GlobalStorage = () => {
    return {
        saveItem: (key, data) => {
            return localStorage.setItem(key, JSON.stringify(data))
        },
        getItem: (key, data) => {
            const jsonValue = localStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        },
        removeItem: (key) => {
            return localStorage.removeItem(key)
        }
    }
}
// const checkUserState = () =>{
//     const currentUser  = GlobalStorage().getItem("currentUser");
//     if(currentUser.isLoggedIn){
//         window.location.replace("/pages/home.html");
//     }
// }
// checkUserState()
