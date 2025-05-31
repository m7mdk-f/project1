import axios from "axios";
import { baseurl } from "./api";

export const CheckDomain = async function (Domin?:string ) {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No auth token found in localStorage");
        }

        const response = await axios.get(`${baseurl}/api/Market/CheckAndGenerateDomain?Domain=${Domin}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch store readiness:", error);
        throw error;
    }
};
export const parentCategoriesAll = async function ( ) {
    try {
        const response = await axios.get(`${baseurl}/api/ParentCategory`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch store readiness:", error);
        throw error;
    }
};

