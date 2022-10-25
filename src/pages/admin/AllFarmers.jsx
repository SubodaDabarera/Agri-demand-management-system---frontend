import React, { useState, useEffect } from 'react';
import { AiOutlineEye } from "react-icons/ai";
import CircularProgress from "@mui/material/CircularProgress";

import { getFarmers } from "../../api/FarmerAPI";
import {BiMessageDetail} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";


export default function AllFarmers() {

    const [farmers, setFarmers] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const setFarmer = (farmer) => {
        localStorage.setItem('Farmer', JSON.stringify(farmer));
    };

    //navigates to send message page
    const onSendMessage = (farmerId) => {
        console.log('Send message to ' + farmerId);
        navigate('/admin/send-message', { state: {recipientId: farmerId} });
    };

    useEffect(() => {
        async function viewAllFarmers() {
            await getFarmers(setFarmers).then(() => {
                console.log('All Farmers retrieved successfully');
                setIsLoading(false);
            });
        }
        viewAllFarmers();

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

    return (
        <div className="px-4 sm:x-6 lg:px-8">
            <div className="sm:flex sm:items-center my-10">
                <div className="sm:flex-auto mb-3">
                    <h1 className="text-2xl font-semibold text-gray-900">All Farmers</h1>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <Link to="/admin/all-farmers/add">
                    <a
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        href="/admin/all-farmers/add"
                    >
                        + Add Farmer
                    </a></Link>
                </div>
            </div>

            {/*Search Bar*/}
            <div className="pb-4">
                <input
                    type="text"
                    name="searchFarmers"
                    id="searchFarmers"
                    autoComplete="given-name"
                    className="mt-2 pl-4 p-1 focus:ring-1 min-w-max w-full focus:ring-emerald-400 focus:border-emerald-400 block  shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-3xl"
                    onChange={(event) => {
                        setSearch(event.target.value);
                    }}
                    placeholder="Search . . ."
                />
            </div>
            {/*End of Search Bar*/}

            <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Name
                        </th>
                        <th
                            scope="col"
                            className="hidden px-3 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                        >
                            Email
                        </th>
                        <th scope="col" className="relative py-3.5 pl-4 pr-3 sm:pr-6">
                            <span className="sr-only">View Profile</span>
                        </th>
                        <th scope="col" className="relative py-3.5 pl-4 pr-3 sm:pr-6">
                            <span className="sr-only">Send Message</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {farmers
                        .filter((farmer) => {
                            if(search === "") {
                                return farmer;
                            }else if(farmer.fullName.toLowerCase().includes(search.toLowerCase())
                                || farmer.email.toLowerCase().includes(search.toLowerCase())
                            ) {
                                return farmer;
                            }
                        })
                        .map((farmer) => (
                            <tr key={farmer._id}>
                                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-gray-500 text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                                    {farmer.fullName}
                                    <dl className="font-normal lg:hidden">
                                        <dt className="sr-only">Email</dt>
                                        <dd className="mt-1 truncate text-gray-900">{farmer.email}</dd>
                                    </dl>
                                </td>
                                <td className="hidden pl-3 pr-16 py-4 text-sm text-gray-500 lg:table-cell">{farmer.email}</td>
                                <td className="py-4 px-3 text-right text-sm font-medium sm:pr-6">
                                    <a
                                        className="flex w-fit text-white bg-emerald-500 py-1 px-4 rounded-lg hover:bg-emerald-600 transition-colors"
                                        onClick={() => setFarmer(farmer)}
                                        href="/admin/farmer-profile"
                                    >
                                        <AiOutlineEye
                                            className="mt-0 mr-0 md:mt-1 md:mr-1"
                                            size={18}
                                        />
                                        <p className="hidden md:block">View Profile</p>
                                    </a>
                                </td>
                                <td className="py-4 px-3 text-right text-sm font-medium sm:pr-6">
                                    <button
                                        className="flex w-fit bg-sky-500 text-white py-1 px-4 rounded-lg hover:bg-sky-600 transition-colors"
                                        onClick={() => onSendMessage(farmer._id)}
                                    >
                                        <BiMessageDetail
                                            className="mt-0 mr-0 md:mt-1 md:mr-1"
                                            size={18}
                                        />
                                        <p className="hidden md:block">Send Suggestion</p>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
