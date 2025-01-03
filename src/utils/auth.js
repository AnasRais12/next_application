import axios from "axios";
import { date } from "yup";

export const refreshAccesToken = async (refreshToken) => {
    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', null, {
            params: {
                client_id: process.env.GOOGLE_CLIENT,
                client_secret: process.env.GOOGLE_SECRET,
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            },

        });
        return response?.data?.access_token
    }
    catch (error) {
        console.log(error)
    }
}