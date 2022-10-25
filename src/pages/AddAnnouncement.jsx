import React, {useState} from "react";
import {FormWithConstraints} from 'react-form-with-constraints'
import FormWrapper from "../components/wrappers/FormWrapper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {Link} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

export default function AddAnnouncement(){
    const [heading,setHeading] = useState("");
    const [message,setMessage] = useState("");
    const [postingDate,setPostingDate] = useState("");
    const [DeadLine,setDeadLine] = useState("");
    const [viewer,setViewer] = useState("");
    
    const handleSubmit = (event) => {
        event.preventDefault();
      const newAnnouncement = {
          heading,
          message,
          postingDate,
          DeadLine,
          viewer
      }

      axios.post('http://localhost:8000/api/announcement/', newAnnouncement)
          .then(()=>{
              toast.success("New Announcement Added", {
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
        <FormWithConstraints>
            <div>
                <FormWrapper>
                    <ToastContainer />
                    <div>
                <div className="space-y-8 divide-y divide-gray-200">
                    <div className="space-y-8 divide-y divide-gray-200">
                        <div className="pt-8">
                            <h1 className="text-lg leading-8 font-medium text-blue-900">Add Announcement</h1>
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
                                            required minLength={3}
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            onChange={(e)=>(setHeading(e.target.value))}
                                        />

                                        {/*<FieldFeedbacks >*/}
                                        {/*    <FieldFeedback when="tooShort">*/}
                                        {/*        Too short*/}
                                        {/*    </FieldFeedback>*/}
                                        {/*    <FieldFeedback when="*"/>*/}
                                        {/*</FieldFeedbacks>*/}
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
                                            required={true}
                                            required minLength={10}  maxLength={200}
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
                                        <DatePicker
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholderText="Select Start Date"
                                            showTimeSelect
                                            dateFormat="MMMM d, yyyy h:mmaa"
                                            selectsStart
                                            startDate={postingDate}
                                            endDate={DeadLine}
                                            selected={postingDate} onChange={(date)=>setPostingDate(date)} />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Dead Line
                                    </label>
                                    <div className="mt-1">
                                        <DatePicker
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholderText="Select End Date"
                                            showTimeSelect
                                            dateFormat="MMMM d, yyyy h:mmaa"
                                            selectsStart
                                            startDate={postingDate}
                                            endDate={DeadLine}
                                            minDate={postingDate}
                                            selected={DeadLine} onChange={(date)=>setDeadLine(date)} />
                                    </div>
                                </div>

                                <fieldset className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Viewers
                                    </label>
                                    <div className="mt-4 space-y-4 ">
                                        <div className="flex items-center">
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
                                        </div>
                                        <div className="flex items-center">
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
                            <Link to="/admin/all-announcements">
                            <button
                                type="submit"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                onClick={handleSubmit}
                            >
                                Post Announcement
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
                    </div>
                </FormWrapper>
            </div>
        </FormWithConstraints>
    )
}