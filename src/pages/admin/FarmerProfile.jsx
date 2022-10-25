import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {RiDeleteBin6Line} from "react-icons/ri";
import {AiOutlineEdit} from "react-icons/ai";
import {BiMessageDetail} from "react-icons/bi";
import {toast} from "react-toastify";
import { deleteFarmer } from '../../api/FarmerAPI'


export default function FarmerProfile() {

    const [farmer, setFarmer] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    //delete farmer function
    const onDelete = async (farmerId) => {

        if (window.confirm("Do you wish to delete farmer?")) {

            await deleteFarmer(farmerId)
                .then(() => {
                    toast.success("Farmer deleted", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setIsSuccess(true);
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
                });

        }
    };

    //directing to update farmer page
    const onUpdate = (farmer) => {
        navigate('/admin/update-farmer')
    };

    //navigates to send message page
    const onSendMessage = (farmerId) => {
        console.log('Send suggestion to ' + farmerId);
        navigate('/admin/send-message', { state: {recipientId: farmerId} });
    };

    useEffect(() => {
        setFarmer(JSON.parse(localStorage.getItem('Farmer')));

        if(isSuccess){
            navigate('/admin/all-farmers')
        };

    }, [isSuccess, navigate]);


    return(
        <div className="px-4 sm:x-6 lg:px-8">
            <div className="sm:flex sm:items-center my-10">
                <div className="sm:flex-auto mb-3">
                    <h1 className="text-2xl font-semibold text-gray-900">Farmer Profile</h1>
                </div>
            </div>

            <div className="-mx-4 mt-8 overflow-hidden bg-emerald-50 shadow ring-1 ring-emerald-500 ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                <div className="block">
                    <div className="px-4 py-4 sm:px-6">
                        <div className="mt-2 grid grid-cols-5">
                            <p className="flex col-span-1 items-center text-sm text-gray-500">
                                Full Name
                            </p>
                            <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                : {farmer.fullName}
                            </p>
                        </div>
                        <div className="mt-2 grid grid-cols-5">
                            <p className="flex col-span-1 items-center text-sm text-gray-500">
                                NIC
                            </p>
                            <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                : {farmer.NIC}
                            </p>
                        </div>
                        <div className="mt-2 grid grid-cols-5">
                            <p className="flex col-span-1 items-center text-sm text-gray-500">
                                Address
                            </p>
                            <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                : {farmer.address}
                            </p>
                        </div>
                        <div className="mt-2 grid grid-cols-5">
                            <p className="flex col-span-1 items-center text-sm text-gray-500">
                                Province
                            </p>
                            <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                : {farmer.province}
                            </p>
                        </div>
                        <div className="mt-2 grid grid-cols-5">
                            <p className="flex col-span-1 items-center text-sm text-gray-500">
                                District
                            </p>
                            <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                : {farmer.district}
                            </p>
                        </div>
                        <div className="mt-2 grid grid-cols-5">
                            <p className="flex col-span-1 items-center text-sm text-gray-500">
                                Email
                            </p>
                            <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                : {farmer.email}
                            </p>
                        </div>
                        <div className="mt-2 grid grid-cols-5">
                            <p className="flex col-span-1 items-center text-sm text-gray-500">
                                Contact Number
                            </p>
                            <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                : {farmer.contactNumber}
                            </p>
                        </div>
                        <div className="mt-2 grid grid-cols-5">
                            <p className="flex col-span-1 items-center text-sm text-gray-500">
                                Land Size (Hectare)
                            </p>
                            <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                : {farmer.hectare}
                            </p>
                        </div>
                        <div className="mt-2 grid grid-cols-5">
                            <p className="flex col-span-1 items-center text-sm text-gray-500">
                                Categories
                            </p>
                            <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                : {farmer.categories?.join(", ")}
                            </p>
                        </div>
                        <div className="grid grid-cols-5 ">
                            {/*Button for delete function*/}
                            <div className="col-start-4 col-span-1 justify-end flex">
                                <button
                                    className="flex min-w-fit bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-colors"
                                    onClick={() => onDelete(farmer._id)}
                                >
                                    <RiDeleteBin6Line
                                        className="mt-0 mr-0 md:mt-1 md:mr-1"
                                        size={18}
                                    />
                                    <p className="hidden md:block">Delete</p>
                                </button>
                            </div>
                            {/*Button for navigating to update page*/}
                            <div className="col-span-1 justify-center flex">
                                <a
                                    className="flex w-fit text-white bg-emerald-500 py-1 px-4 rounded-lg hover:bg-green-600 transition-colors"
                                    onClick={() => onUpdate(farmer)}
                                    href="/admin/update-farmer"
                                >
                                    <AiOutlineEdit
                                        className="mt-0 mr-0 md:mt-1 md:mr-1"
                                        size={18}
                                    />
                                    <p className="hidden md:block"> Update</p>
                                </a>
                            </div>
                        </div>
                        {/*Button for navigating to send message page*/}
                        <div className="grid grid-cols-12">
                            <div className="col-start-1 col-span-2 mt-3 justify-end flex">
                                <button
                                    className="flex min-w-fit bg-sky-500 text-white py-1 px-4 rounded-lg hover:bg-sky-600 transition-colors"
                                    onClick={() => onSendMessage(farmer._id)}
                                >
                                    <BiMessageDetail
                                        className="mt-0 mr-0 md:mt-1 md:mr-1"
                                        size={18}
                                    />
                                    <p className="hidden md:block">Send Suggestion</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}