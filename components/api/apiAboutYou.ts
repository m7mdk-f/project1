import axios from "axios";
import { baseurl } from "./api";

interface AboutMePayload {
    hasBusinessExperience: boolean;
    hasProductOrService: boolean;
    isFirstOnlineStore: boolean;
    storeReadinessIds: number[];
}
export const GetAllStoreReadiness = async function () {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No auth token found in localStorage");
        }

        const response = await axios.get(`${baseurl}/api/StoreReadiness`, {
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


export const PostAboutme = async function (hasBusinessExperience: boolean,
    hasProductOrService: boolean,
    isFirstOnlineStore: boolean,
    storeReadinessIds: number[]) {
    const payload: AboutMePayload = {
        hasBusinessExperience,
        hasProductOrService,
        isFirstOnlineStore,
        storeReadinessIds,
    };
    const token = localStorage.getItem("token");
    try {

        await axios.post(`${baseurl}/api/AboutYou`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        throw error;

    }

}

export const CheckAboutme=async function () {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No auth token found in localStorage");
        }
        const response = await axios.get(`${baseurl}/api/AboutYou/1`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch store readiness:", error);
        throw error;
    }

}