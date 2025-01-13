import axios from "axios";
export const GeneratedAccesToken = async (refreshToken) => {
    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', null, {
            params: {
                client_id: process.env.GOOGLE_CLIENT,
                client_secret: process.env.GOOGLE_SECRET,
                refresh_token: refreshToken,
                grant_type: "refresh_token",

            },

        });
        const {access_token,expires_in} = response.data
        return {
            accessToken: access_token,
            accesTokenExpires:Date.now() + expires_in * 1000,
            refreshToken,
        }
    }
    catch (error) {
        console.log("Error Resolved!",error)
    }
}