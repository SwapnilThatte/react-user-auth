const getToken = () => {
    const tokenString = localStorage.getItem("auth-token");
    const userToken = JSON.parse(tokenString);
    return userToken;
};

export default getToken;
