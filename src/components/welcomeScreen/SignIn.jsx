import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BACKEND_URL } from "../../init/session";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isUsernameError, setIsUsernameError] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const onSignUp = () => {
    if (userName.length <= 0) {
      setIsUsernameError(true);
    } else {
      setIsUsernameError(false);
    }

    if (password.length <= 0) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }

    if (password.length > 0 && userName.length > 0) {
      const user = {
        userName,
        password,
      };
      axios
        .post(`${BACKEND_URL}/login/login`, { userName, password })
        .then((res) => {
          setIsSuccess(res.data[0]);

          if (res.data[0] === true) {
            setRole(res.data[1].role);

            toast.success("Login Successfully !", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          
          if (res.data[1].user.role == "Buyer") {
            localStorage.setItem("user", res.data[1].user._id);
            localStorage.setItem("userRole", res.data[1].user.role);
            // navigate('/buyer')
            window.location.href = "/buyer/view-demands";
          } else if (res.data[1].user.role == "Farmer") {
            localStorage.setItem("user", res.data[1].user._id);
            localStorage.setItem("userRole", res.data[1].user.role);
            // navigate('/farmer/home')
            window.location.href = "/farmer/home";
          }else if(res.data[1].user.role == 'Admin'){
            localStorage.setItem("user",res.data[1].user._id)
            localStorage.setItem("userRole", res.data[1].user.role)
            window.location.href = ('/admin/dash')
          }
          
        }else if(res.data[0] === false){
          toast.error("Please enter correct credintials!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        })
        .catch((err) => {
          toast.error("Please enter correct credintials!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  return (
    <div>
      <div className="px-4 py-8 sm:px-10">
      <ToastContainer />
        <div>
          
        </div>

        <div className="mt-6 relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
        </div>

        <div className="mt-6">
          <div className="">
            <div>
              <label htmlFor="email" className="sr-only">
                User Name
              </label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                placeholder="User name"
                required
                className="block w-full shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm border-gray-300 rounded-md"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            {isUsernameError && (
              <div className="text-red-500 mt-2 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
                Please enter the username
              </div>
            )}
            <div>
              <label htmlFor="password" className="sr-only ">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                required
                className="mt-6 block w-full shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm border-gray-300 rounded-md"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {isPasswordError && (
              <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
                Please enter the password
              </div>
            )}

            <div>
              <button
                type="submit"
                className="mt-10 md:mt-20 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                onClick={onSignUp}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
