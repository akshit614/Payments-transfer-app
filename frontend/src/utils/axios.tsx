import axios from "axios";

export const AxiosClient = axios.create({
    baseURL : "https://payway-kdi5.onrender.com/"
})