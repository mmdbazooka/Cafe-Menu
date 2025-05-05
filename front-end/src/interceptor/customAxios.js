import axios from "axios";

const customAxios = axios.create({
    baseURL : "https://localhost:3000/api"
})

export default customAxios