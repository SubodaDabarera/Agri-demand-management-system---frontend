import React, {useState} from 'react';
// import validator from 'validator';
import {FormWithConstraints,
    FieldFeedbacks,
    FieldFeedback} from 'react-form-with-constraints'
import FormWrapper from "../components/wrappers/FormWrapper";
import { Link } from "react-router-dom";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

export default function AddBuyer() {

    const [fullName, setFullName] = useState("");
    const [nic , setNic] = useState("");
    const [shopName, setShopName] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [district, setDistrict] = useState("");
    const [province, setProvince] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState(0);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [isNICError, setIsNICError] = useState(false);
    const [isContactNumberError, setIsContactNumberError] = useState(false);
    const[isEmailError, setIsEmailError] = useState(false)
    const[isPasswordError, setIsPasswordError] = useState(false)


    const handleSubmit = (event) => {

        let emailValidation = false;
        // let mobileValidation = false;
        event.preventDefault();
        if(nic.length < 10 && nic.length > 12){
            setIsNICError(true);
        }else{
            setIsNICError(false)
        }

        // let mobileNoRegex = /^([0-9]{9,10})$/
        // if(!contactNumber.match(mobileNoRegex)){
        //     setIsContactNumberError(true);
        //     mobileValidation = true;
        // }
        // else {
        //     setIsContactNumberError(false)
        //     mobileValidation = false;
        // }

        // const phoneRegex = /^([0-9]{10})$/
        // if(contactNumber.match(phoneRegex)){
        //     setIsContactNumberError(false);
        //     console.log("Called ")
        // }else{
        //     setIsContactNumberError(true);
        // }
        // console.log(contactNumber)
        let validEmailRegrex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if(!email.match(validEmailRegrex)){
            setIsEmailError(true)
            emailValidation = false
        }else{
            setIsEmailError(false)
            emailValidation = true
        }

        if(password.length < 8){
            setIsPasswordError(true)
        }
        else{
            setIsPasswordError(false)
        }

        if(nic.length >= 10 && password.length >= 8 && emailValidation == true) {
            // if(nic.length > 10 && contactNumber.length < 11) {
            // console.log(isEmailError)

            const newBuyer = {
                fullName,
                NIC: nic,
                ShopName: shopName,
                gender,
                address,
                district,
                province,
                email,
                contactNumber,
                userName,
                password,
                role: "Buyer"
            }

            axios.post('http://localhost:8000/api/buyer/', newBuyer)
                .then(() => {
                    toast.success("New buyer added!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
                .catch(() => {
                    toast.error("Something went wrong!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
        }

        else{
            toast.error("Something went wrong!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

        return (
            <FormWithConstraints>
            <div>
                <FormWrapper>
                    <ToastContainer />
                    <div>
                        <div className="space-y-8 divide-y divide-gray-200">
                            <div className="space-y-8 divide-y divide-gray-200">
                                <div className="pt-8">
                                    <h1 className="text-lg leading-8 font-medium text-blue-900">Buyer Registration Form</h1>
                                </div>
                                <div className="pt-8">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                                        <p className="mt-1 text-sm text-gray-500">Use correct NIC </p>
                                    </div>
                                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Full Name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    id="fullName"
                                                    placeholder="Buyer's Full Name"
                                                    required minLength={3}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    onChange={(e)=>(setFullName(e.target.value))}
                                                />

                                                <FieldFeedbacks for={fullName}>
                                                    <FieldFeedback when="tooShort">
                                                        Too short
                                                    </FieldFeedback>
                                                    <FieldFeedback when="*"/>
                                                </FieldFeedbacks>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                NIC
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="nic"
                                                    id="nic"
                                                    placeholder="Buyer's NIC Number"
                                                    required={true}
                                                    required minLength={10}  maxLength={12}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    onChange={(e)=>(setNic(e.target.value))}
                                                />
                                            </div>
                                            {isNICError && (
                                                <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
                                                    NIC Should be more that 10 characters
                                                </div>
                                            )
                                            }
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Shop Name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="shopName"
                                                    id="shopName"
                                                    placeholder="Buyer's Shop Name"
                                                    required={true}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    onChange={(e)=>(setShopName(e.target.value))}
                                                />
                                            </div>
                                        </div>

                                        <fieldset className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Gender
                                            </label>
                                            <div className="mt-4 space-y-4 ">
                                                <div className="flex items-center">
                                                    <input
                                                        id="push-male"
                                                        name="push-gender"
                                                        type="radio"
                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                        value="Male"
                                                        onChange={(e)=>(setGender(e.target.value))}
                                                    />
                                                    <label className="ml-3 block text-sm font-medium text-gray-700">
                                                        Male
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="push-female"
                                                        name="push-gender"
                                                        type="radio"
                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                        value="Female"
                                                        onChange={(e)=>(setGender(e.target.value))}
                                                    />
                                                    <label className="ml-3 block text-sm font-medium text-gray-700">
                                                        Female
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>

                                    </div>
                                </div>

                                <div className="pt-8">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Location Details  of Shop</h3>
                                        <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
                                    </div>
                                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Address
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    placeholder="Buyer's Shop Address"
                                                    required={true}
                                                    required minLength={5} maxLength={200}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    onChange={(e)=>(setAddress(e.target.value))}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Districts
                                            </label>
                                            <div className="mt-1">
                                                <select
                                                    id="district"
                                                    name="district"
                                                    placeholder="Shop's District"
                                                    required={true}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    onChange={(e)=>(setDistrict(e.target.value))}
                                                >
                                                    <option>District of the Shop</option>
                                                    <option>Colombo</option>
                                                    <option>Gampaha</option>
                                                    <option>Kalutara</option>
                                                    <option>Kandy</option>
                                                    <option>Matale</option>
                                                    <option>Nuwara Eliya</option>
                                                    <option>Galle</option>
                                                    <option>Matara</option>
                                                    <option>Hambantota</option>
                                                    <option>Jaffna</option>
                                                    <option>Kilinochchi</option>
                                                    <option>Mannar</option>
                                                    <option>Vavuniya</option>
                                                    <option>Mullaitivu</option>
                                                    <option>Batticaloa</option>
                                                    <option>Ampara</option>
                                                    <option>Trincomalee</option>
                                                    <option>Kurunegala</option>
                                                    <option>Puttalam</option>
                                                    <option>Anuradhapura</option>
                                                    <option>Polonnaruwa</option>
                                                    <option>Moneragala</option>
                                                    <option>Ratnapura</option>
                                                    <option>Kegalle</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Province
                                            </label>
                                            <div className="mt-1">
                                                <select
                                                    id="province"
                                                    name="province"
                                                    placeholder="Shop's Province"
                                                    required={true}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    onChange={(e)=>(setProvince(e.target.value))}
                                                >
                                                    <option>Province of the Shop</option>
                                                    <option>Western</option>
                                                    <option>Central</option>
                                                    <option>Southern</option>
                                                    <option>Northern</option>
                                                    <option>Eastern</option>
                                                    <option>North Western</option>
                                                    <option>North Central</option>
                                                    <option>Uva</option>
                                                    <option>Sabaragamuwa</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="pt-8">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Details</h3>
                                        <p className="mt-1 text-sm text-gray-500">Use a valid email address where you can receive mail.</p>
                                    </div>
                                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Email Address
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    placeholder="Buyer's Email Address"
                                                    required={true}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    required onChange={(e)=>(setEmail(e.target.value))}
                                                />
                                                <FieldFeedbacks for="email">
                                                    <FieldFeedback when="*" />
                                                </FieldFeedbacks>
                                                {isEmailError && (
                                                    <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
                                                        Please insert a valid email address
                                                    </div>
                                                )
                                                }
                                            </div>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Contact Number
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="number"
                                                    name="number"
                                                    id="number"
                                                    placeholder="Buyer's Contact Number"
                                                    required={true}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    required onChange={(e)=>(setContactNumber(e.target.value))}
                                                />
                                                <FieldFeedbacks for="phone">
                                                    <FieldFeedback when="*" />
                                                </FieldFeedbacks>

                                                {/*{isContactNumberError && (*/}
                                                {/*    <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">*/}
                                                {/*        Contact Number Should be more than 10 numbers*/}
                                                {/*    </div>*/}
                                                {/*)*/}
                                                {/*}*/}
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="pt-8">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Login Details</h3>
                                        <p className="mt-1 text-sm text-gray-500">Use a NIC Number as buyer's password.</p>
                                    </div>
                                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                User Name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="userName"
                                                    id="userName"
                                                    placeholder="Buyer's User Name"
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    onChange={(e)=>(setUserName(e.target.value))}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    placeholder="Buyer's Password"
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    onChange={(e)=>(setPassword(e.target.value))}
                                                />
                                            </div>
                                            {isPasswordError && (
                                                <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
                                                    Password Should be more than 8 numbers
                                                </div>
                                            )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-5">
                                <div className="flex justify-end">
                                    <Link to="/admin/all-buyers">
                                    <button
                                        type="button"
                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </button>
                                    </Link>
                                    <Link to="/admin/all-buyers">
                                    <button
                                        type="submit"
                                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={handleSubmit}
                                    >
                                        Save
                                    </button>
                                        </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </FormWrapper>
            </div>
            </FormWithConstraints>
        );

}