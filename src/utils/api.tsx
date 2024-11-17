import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
})

export default api;

export const getAllTransferences = async () => {
    const response = await axios.get(`${api}/product-transfer`);
    return response.data;
};
