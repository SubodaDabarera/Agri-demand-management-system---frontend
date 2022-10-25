import React, { useState, useEffect } from 'react';
import { AiOutlineEye } from "react-icons/ai";
import CircularProgress from "@mui/material/CircularProgress";
import { getSeedRequestsWithFarmer } from "../../api/SeedRequestAPI";
import jsPDF from "jspdf";
import "jspdf-autotable";


export default function AllRequests() {

    const [requests, setRequests] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const setRequest = (request) => {
        localStorage.setItem('Request', JSON.stringify(request));
    };

    const printReport = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Seed Requests";
        const headers = [["Farmer", "Category", "Land Size (Hectare)", "Status"]];

        const data = requests.map(request=> [
            request.farmerName, request.category, request.sizeOfLand, request.status]);

        let content = {
            startY: 50,
            head: headers,
            body: data,
            headStyles :{fillColor : [37, 183, 76]}
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("All_Seed_Requests_Report.pdf")
    }

    useEffect(() => {
        async function viewAllRequests() {
            await getSeedRequestsWithFarmer(setRequests).then(() => {
                console.log('All Seed Requests retrieved successfully');
                setIsLoading(false);
            });
        }
        viewAllRequests();

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
                    <h1 className="text-2xl font-semibold text-gray-900">All Seed Requests</h1>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <p
                        className="inline-flex items-center justify-center text-sm font-style: italic text-red-500 sm:w-auto"
                    >
                        View Report of All Seasonal Requests:
                    </p>
                    <button
                        className="ml-4 inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        onClick={printReport}
                    >
                        All Requests
                    </button>
                </div>
            </div>

            {/*Search Bar*/}
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
            {/*End of Search Bar*/}

            <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Farmer
                        </th>
                        <th
                            scope="col"
                            className="hidden px-3 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                        >
                            Category
                        </th>
                        <th
                            scope="col"
                            className="hidden px-3 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                        >
                            Projected Supply (kg)
                        </th>
                        <th
                            scope="col"
                            className="hidden px-3 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                        >
                            Status
                        </th>
                        <th scope="col" className="relative py-3.5 pl-4 pr-3 sm:pr-6">
                            <span className="sr-only">View Request</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {requests
                        .filter((request) => {
                            if(search === "") {
                                return request;
                            }else if(request.farmerName.toLowerCase().includes(search.toLowerCase())
                                || request.category.toLowerCase().includes(search.toLowerCase())
                                || request.status.toLowerCase().includes(search.toLowerCase())
                            ) {
                                return request;
                            }
                        })
                        .map((request) => (
                            <tr key={request._id}>
                                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-gray-500 text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                                    {request.farmerName}
                                    <dl className="font-normal lg:hidden">
                                        <dt className="sr-only">Category</dt>
                                        <dd className="mt-1 truncate text-gray-900">{request.category}</dd>
                                    </dl>
                                    <dl className="font-normal lg:hidden">
                                        <dt className="sr-only">Projected Supply</dt>
                                        <dd className="mt-1 truncate text-gray-900">{request.weight}</dd>
                                    </dl>
                                    <dl className="font-normal lg:hidden">
                                        <dt className="sr-only">Status</dt>
                                        <dd className="mt-1 truncate text-gray-900">{request.status}</dd>
                                    </dl>
                                </td>
                                <td className="hidden pl-3 pr-16 py-4 text-sm text-gray-500 lg:table-cell">{request.category}</td>
                                <td className="hidden pl-3 pr-16 py-4 text-sm text-gray-500 lg:table-cell">{request.weight}</td>
                                <td className="hidden pl-3 pr-16 py-4 text-sm text-gray-500 lg:table-cell">{request.status}</td>
                                <td className="py-4 px-3 text-right text-sm font-medium sm:pr-6">
                                    <a
                                        className="flex w-fit text-white bg-emerald-500 py-1 px-4 rounded-lg hover:bg-emerald-600 transition-colors"
                                        onClick={() => setRequest(request)}
                                        href="/admin/view-seed-request"
                                    >
                                        <AiOutlineEye
                                            className="mt-0 mr-0 md:mt-1 md:mr-1"
                                            size={18}
                                        />
                                        <p className="hidden md:block"> View Request</p>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
