import axios from "axios";
import { baseurl } from "./api";

export const CheckDomain = async function (Domin?: string) {
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
export const parentCategoriesAll = async function () {
  try {
    const response = await axios.get(`${baseurl}/api/ParentCategory`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch store readiness:", error);
    throw error;
  }
};


export const pakegeAll = async function () {
  try {
    const response = await axios.get(`${baseurl}/api/Package`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch store readiness:", error);
    throw error;
  }
};

export const CreateMarket = async function (formData: FormData) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No auth token found in localStorage");
    }

    const response = await axios.post(
      `${baseurl}/api/Market`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to create market:", error);
    throw error;
  }
};

export const checkPageUrl = async (url:string ) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No auth token found in localStorage");
    }

    const response = await axios.get(
      `${baseurl}/api/CheckPages?url=${url}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to check page url:", error);
    throw error;
  }
};