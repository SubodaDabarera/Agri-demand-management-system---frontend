import React, {useEffect, useState} from "react";
import FormWrapper from "../components/wrappers/FormWrapper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {Link} from "react-router-dom";
import moment from "moment";
import {toast, ToastContainer} from "react-toastify";

export default function UpdateAnnouncement(){
    const [heading,setHeading] = useState("");
    const [message,setMessage] = useState("");
    const [postingDate,setPostingDate] = useState("");
    const [DeadLine,setDeadLine] = useState("");
    const [viewer,setViewer] = useState("");

    const [id,setId] = useState("");

    useEffect(()=>{
        setId(localStorage.getItem('id'))
        setHeading(localStorage.getItem('heading'))
        setMessage(localStorage.getItem('message'))
        setPostingDate(localStorage.getItem('postingDate'))
        setDeadLine(localStorage.getItem('DeadLine'))
        setViewer(localStorage.getItem('viewer'))
    },[])

    const updateAnnouncement = () => {
        const updateAnnouncement = {
            heading,
            message,
            postingDate,
            DeadLine,
            viewer
        }
        console.log("id",id)
        axios.put('http://localhost:8000/api/announcement/'+id, updateAnnouncement)
            .then(()=>{
                // alert('Announcement Updated')
                toast.success("Announcement Updated!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(()=>{
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
    return(
            <div>
                <FormWrapper>
                    <ToastContainer />
                    <div>
                        <div className="space-y-8 divide-y divide-gray-200">
                            <div className="space-y-8 divide-y divide-gray-200">
                                <div className="pt-8">
                                    <h1 className="text-lg leading-8 font-medium text-blue-900">Update Announcement</h1>
                                </div>
                                <div className="pt-8">
                                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Heading
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="heading"
                                                    id="heading"
                                                    placeholder="Heading of the announcement"
                                                    value={heading}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    onChange={(e)=>(setHeading(e.target.value))}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Message
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="message"
                                                    id="message"
                                                    placeholder="Message of the Announcement"
                                                    value={message}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    onChange={(e)=>(setMessage(e.target.value))}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Posting Date
                                            </label>
                                            <div className="mt-1">
                                                <div>{moment(postingDate).format('MMMM Do YYYY, h:mm:ss a')}</div>
                                                {/*<DatePicker*/}
                                                {/*    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"*/}
                                                {/*    placeholderText="Select Start Date"*/}
                                                {/*    showTimeSelect*/}
                                                {/*    dateFormat="MMMM d, yyyy h:mmaa"*/}
                                                {/*    selectsStart*/}
                                                {/*    startDate={postingDate}*/}
                                                {/*    endDate={DeadLine}*/}
                                                {/*    selected={postingDate}*/}
                                                {/*    value={postingDate}*/}
                                                {/*    onChange={(postingDate)=>setPostingDate(postingDate)} />*/}
                                                <DatePicker
                                                    className=" shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    placeholderText="Select End Date"

                                                    dateFormat="MMMM d, yyyy h:mmaa"
                                                    selectsStart
                                                    value = {postingDate}


                                                    // selected={DeadLine}
                                                    onChange={(date)=>setPostingDate(date)}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Dead Line
                                            </label>

                                            <div className="mt-1">
                                                <div>{moment(DeadLine).format('MMMM Do YYYY, h:mm:ss a')}</div>
                                                {/*<DatePicker*/}
                                                {/*    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"*/}
                                                {/*    placeholderText="Select End Date"*/}
                                                {/*    showTimeSelect*/}
                                                {/*    dateFormat="MMMM d, yyyy h:mmaa"*/}
                                                {/*    selectsStart*/}
                                                {/*    startDate={postingDate}*/}
                                                {/*    endDate={DeadLine}*/}
                                                {/*    minDate={postingDate}*/}
                                                {/*    selected={DeadLine}*/}
                                                {/*    value={DeadLine}*/}
                                                {/*    onChange={(date)=>setDeadLine(date)} />*/}
                                                <DatePicker
                                                    className=" shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    placeholderText="Select End Date"

                                                    dateFormat="MMMM d, yyyy h:mmaa"
                                                    selectsStart
                                                    value = {DeadLine}


                                                    // selected={DeadLine}
                                                    onChange={(date)=>setDeadLine(date)}
                                                />


                                            </div>
                                        </div>

                                        <fieldset className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Viewers
                                            </label>
                                            <div className="mt-4 space-y-4 ">
                                                <div className="flex items-center">

                                                    {viewer == 'Farmer' ?
                                                        <>
                                                            <input
                                                                id="push-farmer"
                                                                name="push-farmer"
                                                                type="radio"
                                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                                value="Farmer"
                                                                onChange={(e)=>(setViewer(e.target.value))}
                                                                checked={true}
                                                            />
                                                            <label className="ml-3 block text-sm font-medium text-gray-700">
                                                                Farmers
                                                            </label>
                                                        </>
                                                        : (
                                                            <>
                                                                <input
                                                                    id="push-farmer"
                                                                    name="push-farmer"
                                                                    type="radio"
                                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                                    value="Farmer"
                                                                    onChange={(e)=>(setViewer(e.target.value))}
                                                                />
                                                                <label className="ml-3 block text-sm font-medium text-gray-700">
                                                                    Farmers
                                                                </label>
                                                            </>
                                                        )
                                                    }




                                                </div>

                                                <div className="flex items-center">
                                                {viewer == 'Buyer' ?
                                                    <>
                                                    <input
                                                        id="push-buyer"
                                                        name="push-buyer"
                                                        type="radio"
                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                        value="Buyer"
                                                        onChange={(e)=>(setViewer(e.target.value))}
                                                        checked={true}
                                                    />
                                                    <label className="ml-3 block text-sm font-medium text-gray-700">
                                                    Buyers
                                                    </label>
                                                    </>
                                                : (
                                                    <>
                                                        <input
                                                            id="push-buyer"
                                                            name="push-buyer"
                                                            type="radio"
                                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                            value="Buyer"
                                                            onChange={(e)=>(setViewer(e.target.value))}
                                                        />
                                                        <label className="ml-3 block text-sm font-medium text-gray-700">
                                                            Buyers
                                                        </label>
                                                    </>
                                                    )
                                                }
                                                </div>


                                            </div>
                                        </fieldset>

                                    </div>
                                </div>
                            </div>
                            <div className="pt-5">
                                <div className="flex justify-end">
                                    <Link to="/admin/all-announcements">
                                        <button
                                            type="button"
                                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancel
                                        </button>
                                    </Link>
                                    <button
                                        type="submit"
                                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        onClick={updateAnnouncement}
                                    >
                                        Update Announcement
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </FormWrapper>
            </div>
    )
}