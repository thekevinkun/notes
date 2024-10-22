import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  console.log("token: ", token);
  if (!token) return true;
  
  try {
    const decodedToken = jwtDecode(token);
    console.log("decode token: ", decodedToken);
    const currentTime = Date.now() / 1000;
    console.log("current time: ", currentTime)
    return decodedToken.exp < currentTime; 
} catch (error) {
    console.error("Error decoding token: ", error);
    return true;
  }
};

export default isTokenExpired;