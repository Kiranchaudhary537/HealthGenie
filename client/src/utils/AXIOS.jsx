import axios from "axios";

const AXIOS = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    "Content-Type": "application/json",
  },
});

export default AXIOS;
