import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {RiDeleteBin6Line} from "react-icons/ri";
import {AiOutlineEdit} from "react-icons/ai";
import {BiMessageDetail} from "react-icons/bi";
import {toast} from "react-toastify";

import { deleteSeedRequest, updateSeedRequestStatus } from '../../api/SeedRequestAPI'
import {getCropTypes} from "../../api/AddCropTypeAPI";
import CircularProgress from "@mui/material/CircularProgress";

const staticCategories = [
    {
        _id: "bc022097-96e1-475a-b3dd-09255580036e",
        category: "Rice",
        types: [
            {
                name: "Naadu",
                supply: 20,
                demand: 50,
                _id: "633fe8af557cda83f8574ae1"
            },
            {
                name: "Samba",
                supply: 10,
                demand: 30,
                _id: "633fef5a5be70cc623e8d593"
            },
            {
                name: "Basmati",
                supply: 20,
                demand: 20,
                _id: "633fefb2437df192068e69ae"
            },
        ],
    },
    {
        _id: "7c1a427f-6318-48f9-a256-91b2fd924aab",
        category: "Grains",
        types: [
            {
                name: "Green gram",
                supply: 30,
                demand: 20,
                _id: "633fe8af12345a83f8574ae1"
            },
            {
                name: "Black gram",
                supply: 5,
                demand: 40,
                _id: "633fef5a5be70cc623e8d593"
            },
            {
                name: "Corn",
                supply: 5,
                demand: 40,
                _id: "633fefb2437df192068e69ae"
            },
        ],
    },
    {
        _id: "7c1a412p-6318-48f9-a256-91b2fd924aab",
        category: "Vegetables(L)",
        types: [
            {
                name: "Pumpkin",
                supply: 10,
                demand: 30,
                _id: "633fe8af12345a83f8574ae1"
            },
            {
                name: "Bitter gourd",
                supply: 10,
                demand: 40,
                _id: "633fef5a5be70cc623e8d593"
            },
            {
                name: "Ladies fingers",
                supply: 20,
                demand: 30,
                _id: "633fefb2437df192068e69ae"
            },
        ],
    },
    {
        _id: "7c1a427f-6124-48f9-a256-91b2fd924aab",
        category: "Vegetables(H)",
        types: [
            {
                name: "Carrot",
                supply: 10,
                demand: 40,
                _id: "633fe8af12345a8123454ae1"
            },
            {
                name: "Cabbage",
                supply: 20,
                demand: 20,
                _id: "6976ef5a5be70cc623e8d593"
            },
            {
                name: "Cauliflower",
                supply: 30,
                demand: 40,
                _id: "633fefb2437df193654e69ae"
            },
        ],
    },
    {
        _id: "7c1a427f-6318-48f9-n678-91b2fd924aab",
        category: "Fruits",
        types: [
            {
                name: "Watermelon",
                supply: 10,
                demand: 40,
                _id: "633fe8af12345a987f574ae1"
            },
            {
                name: "Mango",
                supply: 30,
                demand: 50,
                _id: "633f89ty5be70cc623e8d593"
            },
            {
                name: "Papaya",
                supply: 40,
                demand: 10,
                _id: "633568r2437df192068e69ae"
            },
        ],
    },
];

export default function ViewSeedRequest() {
    const [categories, setCategories] = useState(staticCategories);
    const [crops, setCrops] = useState(staticCategories);
    const [request, setRequest] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    //reject farmer request function
    const onReject = async (id, request) => {

        if (window.confirm("Do you wish to reject seed request?")) {

            request.status = 'rejected';

            await updateSeedRequestStatus(id, request, setIsSuccess)
                .then(() => {
                    toast.success("Seed Request Rejected!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    if(isSuccess){
                        localStorage.setItem('Request', JSON.stringify(request));
                        navigate('/admin/view-seed-request');
                    }
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

            console.log('Request rejected');

        }
        console.log('Request rejected');
    };

    //accepting seed request
    const onAccept = async (id, request) => {

        crops.map((crop) => {
            if (request.category === crop.category) {
                crop.types.map((type) => {
                    if(request.type === type.name) {
                        if(request.weight > type.demand) {
                            alert('Warning: Supply has exceeded demand!');
                        };
                    }
                });
            }
        });

        if (window.confirm("Do you wish to accept seed request?")) {

            request.status = 'accepted';

            console.log(request)

            await updateSeedRequestStatus(id, request, setIsSuccess)
                .then(() => {
                    toast.success("Seed Request Accepted!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    if(isSuccess){
                        localStorage.setItem('Request', JSON.stringify(request));
                        navigate('/admin/view-seed-request');
                    }
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

            console.log('Request accepted');

        }
        console.log('Request accepted');
    };

    //navigates to send message page
    const onSendMessage = (farmerId) => {
        // localStorage.setItem('ReceiverId', JSON.stringify(farmerId));
        console.log('Send message to ' + farmerId);
        navigate('/admin/send-message', { state: {recipientId: farmerId} });
    };

    useEffect(() => {

        setRequest(JSON.parse(localStorage.getItem('Request')));

        async function retrieveCrops() {
            await getCropTypes(setCategories, setCrops).then(() => {
                console.log('Crops retrieved successfully');
                setIsLoading(false);
            });

            console.log(crops);
        }
        retrieveCrops();
    }, []);

    if(isLoading) {
        return (
            <div>
                <div className="flex justify-center mt-24">
                    <CircularProgress color="success" />
                </div>
            </div>
        )
    }

    return(
        <div className="px-4 sm:x-6 lg:px-8">
            <div className="sm:flex sm:items-center my-10">
                <div className="sm:flex-auto mb-3">
                    <h1 className="text-2xl font-semibold text-gray-900">Seed Request</h1>
                </div>
            </div>

            <div className="-mx-4 mt-8 overflow-hidden bg-emerald-50 shadow ring-1 ring-emerald-500 ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                <div className="block">
                    <div className="px-4 py-4 sm:px-6">
                        <div className="mt-2 grid grid-cols-5">
                            <p className="flex col-span-1 items-center text-sm text-gray-500">
                                Farmer
                            </p>
                            <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                : {request.farmerName}
                            </p>
                        </div>
                        <div className="mt-2 grid grid-cols-5">
                            <p className="flex col-span-1 items-center text-sm text-gray-500">
                                Category
                            </p>
                            <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                : {request.category}
                            </p>
                        </div>
                        <div className="mt-2 grid grid-cols-5">
                            <p className="flex col-span-1 items-center text-sm text-gray-500">
                                Type
                            </p>
                            <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                : {request.type}
                            </p>
                        </div>
                        <div className="mt-2 grid grid-cols-5">
                            <p className="flex col-span-1 items-center text-sm text-gray-500">
                                Land Size (Hectare)
                            </p>
                            <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                : {request.sizeOfLand}
                            </p>
                        </div>
                        <div className="mt-2 grid grid-cols-5">
                            <p className="flex col-span-1 items-center text-sm text-gray-500">
                                Projected Quantity
                            </p>
                            <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                : {request.weight}
                            </p>
                        </div>
                        <div className="mt-2 grid grid-cols-5">
                            <p className="flex col-span-1 items-center text-sm text-gray-500">
                                Location
                            </p>
                            <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                : {request.location}
                            </p>
                        </div>
                        <div className="mt-2 grid grid-cols-5">
                            <p className="flex col-span-1 items-center text-sm text-gray-500">
                                Status
                            </p>
                            <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                : {request.status}
                            </p>
                        </div>
                        <div className="grid grid-cols-5 ">
                            {/*Button for reject function*/}
                            <div className="col-start-4 col-span-1 justify-end flex">
                                <button
                                    className="flex min-w-fit bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-colors"
                                    onClick={() => onReject(request._id, request)}
                                >
                                    <RiDeleteBin6Line
                                        className="mt-0 mr-0 md:mt-1 md:mr-1"
                                        size={18}
                                    />
                                    <p className="hidden md:block">Reject</p>
                                </button>
                            </div>
                            {/*Button for accept function*/}
                            <div className="col-span-1 justify-center flex">
                                <button
                                    className="flex w-fit text-white bg-emerald-500 py-1 px-4 rounded-lg hover:bg-green-600 transition-colors"
                                    onClick={() => onAccept(request._id, request)}
                                >
                                    <AiOutlineEdit
                                        className="mt-0 mr-0 md:mt-1 md:mr-1"
                                        size={18}
                                    />
                                    <p className="hidden md:block"> Accept</p>
                                </button>
                            </div>
                        </div>
                        {/*Button for navigating to send message page*/}
                        <div className="grid grid-cols-12 ">
                            <div className="col-start-1 col-span-2 mt-3 justify-end flex">
                                <button
                                    className="flex min-w-fit bg-sky-500 text-white py-1 px-4 rounded-lg hover:bg-sky-600 transition-colors"
                                    onClick={() => onSendMessage(request.farmerId)}
                                >
                                    <BiMessageDetail
                                        className="mt-0 mr-0 md:mt-1 md:mr-1"
                                        size={18}
                                    />
                                    <p className="hidden md:block">Send Message</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}