const DEFAULT_PROD_URL = "https://campusconnect-backend-skba.onrender.com";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? DEFAULT_PROD_URL
    : "http://localhost:5000");

export default API_URL;