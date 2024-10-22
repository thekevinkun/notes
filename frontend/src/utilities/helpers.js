import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const decodedToken = jwtDecode(token);
    
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime; 
} catch (error) {
    return true;
  }
};

export default isTokenExpired;