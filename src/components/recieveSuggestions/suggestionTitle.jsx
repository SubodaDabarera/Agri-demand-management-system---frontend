import React, {useState} from 'react'
import { updateStatusMessage } from '../../api/MessageAPI';
import { HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import {toast} from "react-toastify";

export default function SuggestionTitle(props) {

    const {suggestions, setSuggestion} = props;
    const [statusChange, setStatusChange] = useState({});

    //change status of message to read
    const onViewMessage = async (id, suggestion) => {

        await updateStatusMessage(id, suggestion)
            .then(() => {
                console.log('status changed!');
            })
            .catch(() => {
                console.log('Something went wrong!');
            });
        // };
    };

    return (
        <>
            {suggestions.map((suggestion) => (
                <div key={suggestion._id} className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 mb-3">
                    <div className="w-0 flex-1 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                {suggestion.status === 'unread' ? (
                                    <div className="absolute bg-red-500 rounded-md p-1">
                                        <HiOutlineMail className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                ) : (
                                    <div className="absolute bg-green-600 rounded-md p-1">
                                        <HiOutlineMailOpen className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                )}
                            </div>
                            <div className="ml-9 w-0 flex-1">
                                <p className="ml-3 mt-3 text-sm font-medium text-gray-900">{suggestion.subject}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                        <button
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onClick={() => {
                                suggestion.status = 'read';
                                setSuggestion(suggestion);
                                onViewMessage(suggestion._id, suggestion);
                            }}
                        >
                            View
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}
