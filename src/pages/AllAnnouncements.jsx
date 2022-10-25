import React, {useEffect, useState} from "react";
import axios from "axios";
import {AiOutlineDownload, AiOutlineEdit} from "react-icons/ai";
import {RiDeleteBin6Line} from "react-icons/ri";
import {Link} from "react-router-dom";
import moment from "moment";

export default function AllAnnouncements(){
    const [announcements,setAnnouncements] = useState([]);

    const [search,setSearch] = useState("")

    useEffect(()=>{
        axios.get('http://localhost:8000/api/announcement/')
            .then((res)=>{
                setAnnouncements(res.data);
            })
    },[])
    return(
        <div>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto mb-3">
                        <h1 className="text-2xl font-semibold text-gray-900">All Announcements</h1>
                    </div>
                </div>
            <div className="mt-4 sm:mt-0 sm:flex-none">
            <Link to="/admin/all-announcements/add">
                <button type="button" className="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                    +Add new
                </button></Link>
                {/*<ToastContainer />*/}
            </div>
                <div className="pb-4">
                    <input
                        type="text"
                        name="searchRequests"
                        id="searchRequests"
                        autoComplete="given-name"
                        className="mt-2 pl-4 p-1 focus:ring-1 min-w-max w-full focus:ring-emerald-400 focus:border-emerald-400 block  shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-3xl"
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                        placeholder="Search . . ."
                    />
                </div>

                {announcements
                    .filter((announcement)=>{
                        if(search == ""){
                            return announcement
                        }else if (announcement.viewer.toLowerCase().includes(search.toLocaleString())){
                            return announcement
                        }
                    })
                    .map((announcement) => {

                        const setData = (announcement) => {
                            let {_id, heading, message,postingDate, DeadLine, viewer} = announcement;
                            localStorage.setItem('id', _id);
                            localStorage.setItem('heading', heading);
                            localStorage.setItem('message', message);
                            localStorage.setItem('postingDate',postingDate)
                            localStorage.setItem('DeadLine', DeadLine);
                            localStorage.setItem('viewer', viewer);
                        }
                        const getAnnouncements = () => {
                            axios.get("http://localhost:8000/api/announcement/")
                                .then((getAnnouncements) => {
                                    setAnnouncements(getAnnouncements.data);
                                })
                        }

                        const onDelete = (id) => {
                            if (window.confirm("Are you want to delete  - " + announcement.heading)) {
                                axios.delete("http://localhost:8000/api/announcement/" + id)
                                    .then(() => {
                                        getAnnouncements();
                                    })
                            }
                        }
                        return(
                        <div
                            key={announcement._id}
                            className="bg-emerald-100 shadow overflow-hidden sm:rounded-md my-4"
                        >
                            <div className="block">
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="mt-2 justify-end">
                                        <h1 >
                                            {announcement.heading}
                                        </h1>
                                    </div>

                                    <div className="mt-2">
                                        <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                            {announcement.message}
                                        </p>
                                    </div>

                                    <div className="mt-2 grid grid-cols-5 ">
                                        <p className="flex col-span-1 items-center text-sm text-emerald-700 ">
                                            Posting Date
                                        </p>
                                        <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                            : {moment(announcement.postingDate).format('MMMM Do YYYY, h:mm:ss a')}
                                        </p>
                                    </div>

                                    <div className="mt-2 grid grid-cols-5 ">
                                        <p className="flex col-span-1 items-center text-sm text-emerald-700 ">
                                            Dead Line
                                        </p>
                                        <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                            : {moment(announcement.DeadLine).format('MMMM Do YYYY, h:mm:ss a')}

                                        </p>
                                    </div>

                                    <div className="mt-2 grid grid-cols-5 ">
                                        <b className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                            {announcement.viewer}
                                        </b>
                                    </div>

                                    <div className="mt-3 grid grid-cols-5">
                                        <div className=" col-span-1 justify-end flex">
                                            <button
                                                className="flex min-w-fit bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-colors"
                                                onClick={() => onDelete(announcement._id)}
                                            >
                                                <RiDeleteBin6Line
                                                    className="mt-0 mr-0 md:mt-1 md:mr-1"
                                                    size={18}
                                                />
                                                <p className="hidden md:block">Delete</p>
                                            </button>
                                        </div>
                                        <div className="col-span-1 justify-center flex">
                                            <Link to={"/admin/update-announcement"}>
                                                <button className="flex w-fit text-white bg-green-500 py-1 px-4 rounded-lg hover:bg-green-600 transition-colors"
                                                        onClick={()=>setData(announcement)}>
                                                    <AiOutlineEdit
                                                        className="mt-0 mr-0 md:mt-1 md:mr-1"
                                                        size={18}
                                                    />
                                                    <p className="hidden md:block"> Update</p>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })}

                {/*{isLoading === true ? (*/}
                {/*    <>*/}
                {/*        <div>*/}
                {/*            <div className="flex justify-center mt-24">*/}
                {/*                <CircularProgress color="success" />*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </>*/}
                {/*) : (*/}
                {/*    <>*/}
                {/*        {isSearchResultExists === false && (*/}
                {/*            <>*/}
                {/*                <div className="grid justify-center mt-16">*/}
                {/*                    <div className="flex justify-center">*/}
                {/*                        <FiAlertCircle size={80} color="#63736b" />*/}
                {/*                    </div>*/}
                {/*                    <div className="font-semibold text-gray-500 text-xl mt-4">*/}
                {/*                        No results found*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </>*/}
                {/*        )}*/}
                {/*    </>*/}
                {/*)}*/}
        </div>
            </div>
    )
}