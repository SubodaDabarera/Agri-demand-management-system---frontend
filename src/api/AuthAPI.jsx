import axios from "axios";
import React from "react";
import { BACKEND_URL } from "../init/session";

//For login
export const SignIn = async(userName, password) => {

    const user = await axios.post(`${BACKEND_URL}/login/login`, { userName, password })
    console.log("user: ", user);
    
    if(user)
        return user
    return {}
};

//For register
export const SignUp = async (userObj) => {
  if (userObj.role != "farmer") {
    await axios.post(`${BACKEND_URL}/${userObj.role}`);
  }
  else{

    // fullName,NIC,gender, address,province, district,  email, contactNumber,   userName, password, categories, hectare,role

    await axios.post(`${BACKEND_URL}/farmers`);
  }
};


