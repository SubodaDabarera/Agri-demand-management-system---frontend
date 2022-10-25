import React, { useState, useEffect } from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import { createMessage } from '../../api/MessageAPI';
import {getFarmer} from "../../api/FarmerAPI";
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
import {AiOutlineClear} from "react-icons/ai";
import {AiOutlineEdit} from "react-icons/ai";
import { useForm } from "react-hook-form";


export default function SendMessage() {

    const { state } = useLocation();
    const { recipientId } = state || {};
    const [farmer, setFarmer] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [subject, setSubject] = useState('');
    const [creatorId, setCreatorId] = useState('631af5e2f2ba9b53e15e6218');
    // const [creatorId, setCreatorId] = useState(localStorage.getItem("user"));
    const [messageBody, setMessageBody] = useState('');
    // const [parentMessageId, setParentMessageId] = useState('');
    const [status, setStatus] = useState('unread');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const onSendMessage = async () => {
        if (window.confirm("Do you wish send message?")) {

            const message = {
                recipientId,
                subject,
                creatorId,
                messageBody,
                status
            };

            await createMessage(message, setIsSuccess)
                .then(() => {
                    toast.success("Suggestion Sent", {
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
        };
    };

    useEffect(() => {

        if(isSuccess){
            navigate('/admin/all-farmers');
        };

        async function getRecipient() {
            await getFarmer(recipientId, setFarmer)
                .then(() => {
                setIsLoading(false);
            });
        };

        getRecipient();

    }, [isSuccess, navigate]);


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
        <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
            <div className="relative max-w-xl mx-auto">
                <svg
                    className="absolute left-full transform translate-x-1/2"
                    width={404}
                    height={404}
                    fill="none"
                    viewBox="0 0 404 404"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="85737c0e-0916-41d7-917f-596dc7edfa27"
                            x={0}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                </svg>
                <svg
                    className="absolute right-full bottom-0 transform -translate-x-1/2"
                    width={404}
                    height={404}
                    fill="none"
                    viewBox="0 0 404 404"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="85737c0e-0916-41d7-917f-596dc7edfa27"
                            x={0}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                </svg>
                <div className="text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">Send Suggestion</h2>
                    <p className="mt-4 text-lg leading-6 text-gray-500">
                        Suggest a crop that has a lack of supply.
                    </p>
                </div>
                <div className="mt-12">
                    <form action="#" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                        <div className="sm:col-span-2">
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                                Receiver
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    value={farmer.fullName}
                                    disabled
                                    name="receiver"
                                    id="receiver"
                                    autoComplete="farmer"
                                    className="py-3 px-4 block w-full shadow-sm focus:ring-emerald-400 focus:border-emerald-400 bg-emerald-50 border-gray-300 rounded-md"

                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Subject
                            </label>
                            <div className="mt-1">
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    {...register("subject", {
                                        required: true,
                                    })}
                                    autoComplete="subject"
                                    onChange={(e)=>(setSubject(e.target.value))}
                                    className="py-3 px-4 block w-full shadow-sm focus:ring-emerald-400 focus:border-emerald-400 border-gray-300 rounded-md"
                                />
                                {errors.subject && <p className='text-red-600'>Please enter subject for suggestion!</p>}
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="message"
                                    name="message"
                                    {...register("messageBody", {
                                        required: true,
                                    })}
                                    rows={4}
                                    onChange={(e)=>(setMessageBody(e.target.value))}
                                    className="py-3 px-4 block w-full shadow-sm focus:ring-emerald-400 focus:border-emerald-400 border border-gray-300 rounded-md"
                                    defaultValue={''}
                                />
                                {errors.messageBody && <p className='text-red-600'>Please enter message for suggestion!</p>}
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <div className="grid grid-cols-5 ">
                                {/*Button for reject function*/}
                                <div className="col-start-4 col-span-1 justify-end flex">
                                    <button
                                        className="flex min-w-fit bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-colors"
                                        // onClick={() => onReject(request._id, request)}
                                    >
                                        <AiOutlineClear
                                            className="mt-0 mr-0 md:mt-1 md:mr-1"
                                            size={18}
                                        />
                                        <p className="hidden md:block">Clear</p>
                                    </button>
                                </div>
                                {/*Button for accept function*/}
                                <div className="col-span-1 justify-center flex">
                                    <button
                                        className="flex w-fit text-white bg-emerald-500 py-1 px-4 rounded-lg hover:bg-green-600 transition-colors"
                                        onClick={handleSubmit(onSendMessage)}
                                    >
                                        <AiOutlineEdit
                                            className="mt-0 mr-0 md:mt-1 md:mr-1"
                                            size={18}
                                        />
                                        <p className="hidden md:block">Send</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
