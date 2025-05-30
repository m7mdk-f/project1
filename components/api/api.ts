import axios from "axios";

const baseurl="https://localhost:7063";
export const  login=async function (email:string,password:string){
    const response = await axios.post(`${baseurl}/Login`, {
        Email: email,
        Password: password,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem("authToken", token);
      }
}

export const Registerapi =async function (name:string,email:string,selectedCode:string,phone:string,password:string) {
    const formData = new FormData();
    formData.append("FullName", name);
    formData.append("Email", email);
    formData.append("PhoneNumber", `${selectedCode}${phone}`);
    formData.append("Password", password);
    formData.append("ConfirmPass", password);
    await axios.post(
        `${baseurl}/Create-account`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
        },
        }
      );
}
