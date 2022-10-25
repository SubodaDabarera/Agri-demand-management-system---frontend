import { CircularProgress } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineDownload, AiOutlineEdit } from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { viewFarmerSeedRequest } from "../../api/SeedRequestAPI";
import MyRequestsWrapper from "../../components/wrappers/farmer/MyRequestsWrapper";
import { getFarmer } from "../../api/FarmerAPI";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const EvaluatedRequests = () => {
  const [myRequests, setMyRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [evaluatedRequests, setEvaluatedRequests] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('user'));
  const [isSearchResultExists, setIsSearchResultExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [farmerName, setFarmerName] = useState("");
  const [farmer, setFarmer] = useState();

  useEffect(() => {
    async function getRequests() {
      await viewFarmerSeedRequest(
        userId,
        setMyRequests,
        setFilteredRequests,
        setIsSearchResultExists
      ).then(() => {
        console.log("Data retrieved success");
        setIsLoading(false);
      });
    }
    getRequests();
  }, []);

  // get farmer name from the ID
  useEffect(() => {
    async function getFarmerDetails() {
      await getFarmer(userId, setFarmer).then(() => {
        console.log("Farmer details retrieved");
      });
    }
    getFarmerDetails();
  }, []);

  useEffect(() => {
    const filteredResult = myRequests.filter((request) => {
      if (searchQuery === "" || searchQuery == null) {
        return request;
      } else if (
        request.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return request;
      } else if (
        request.type.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return request;
      }
    });

    setFilteredRequests(filteredResult);
    if (filteredResult.length > 0) {
      setIsSearchResultExists(true);
    } else {
      setIsSearchResultExists(false);
    }
  }, [searchQuery]);

  const onDownload = (requestdata) => {
    const printableObject = [
      { title: "ID", data: requestdata._id },
      { title: "Category", data: requestdata.category },
      { title: "Type", data: requestdata.type },
      { title: "Location", data: requestdata.location },
      { title: "Size of the land in Hectares", data: requestdata.sizeOfLand },
      { title: "Quantity in Kilograms", data: requestdata.weight },
      { title: "Farmer ID", data: requestdata.farmerId },
      { title: "Farmer NIC", data: farmer.NIC },
      { title: "Farmer Name", data: farmer.fullName },
      {
        title: "Added date",
        data: moment(requestdata.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      },
      {
        title: "Evaluated date",
        data: moment(requestdata.updatedAt).format("MMMM Do YYYY, h:mm:ss a"),
      },
      { title: "Evaluated Status", data: requestdata.status },
    ];

    // const doc = new jsPDF();
    var doc = new jsPDF("p", "px", "letter");
    const tableColumn = ["", ""];
    const tableRows = [];

    printableObject.map((request, idx) => {
      const ticketData = [request.title, request.data];
      tableRows.push(ticketData);
    });

    doc.autoTable(tableColumn, tableRows, {
      startY: 180,
      startX: 20,
      theme: "grid",
    });

    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    // add page border
    doc.rect(
      20,
      15,
      doc.internal.pageSize.width - 40,
      doc.internal.pageSize.height - 40,
      "S"
    );

    // header of the document
    doc.setFont("Courier-Bold");
    doc.setTextColor("#07912e");
    doc.setFontSize(22);
    doc.text("Agri Demand Management System", 112, 50);
    doc.setFontSize(12);
    doc.text("----- Evaluated Reuqest ----- ", 177, 64);
    doc.setTextColor("#6f7370");

    // add company address in left side
    doc.setTextColor("#5c5c5c");
    doc.setFont("Helvetica");
    doc.setFontSize(10);
    doc.text(
      "Management \nAgriculture Department \nNo 1 \nPeradeniya \nSri Lanka ",
      30,
      100
    );

    // add contact details in righ side
    doc.setTextColor("#5c5c5c");
    doc.setFont("Helvetica");
    doc.setFontSize(10);
    doc.text(
      "Phone : 1920 \nFax : +94 812 388 333\nEmail : info@doa.gov.lk \nWeb : service@agrimin.gov.lk ",
      320,
      100
    );

    // add horizontal line
    doc.setDrawColor(57, 173, 49);
    doc.line(20, 155, 440, 155);

    // add verified message
    doc.setFont("Times-Bold");
    doc.setTextColor("#19d13e");
    doc.setFillColor("#db1414");
    doc.setFontSize(20);
    doc.text("Approved!", 310, 528);

    doc.setFontSize(10);
    doc.setTextColor("#000000");
    doc.text("- - - - - - - - - - - - - - - - - - - - - - - - -", 290, 540);
    doc.text("Agri Demand Management System", 290, 550);

    doc.save(`Evaluated-Request_${dateStr}.pdf`);
  };

  return (
    <div>
      <MyRequestsWrapper>
        <div className="font-semibold text-2xl text-center my-16">
          {" "}
          Evaluated Requests{" "}
        </div>
        <ToastContainer />

        <div className="pb-4 pt-4">
          <input
            type="text"
            name="searchRequests"
            id="searchRequests"
            autoComplete="given-name"
            className="mt-2 pl-4 p-1 focus:ring-1 min-w-max w-full focus:ring-emerald-400 focus:border-emerald-400 block  shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-3xl"
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
            placeholder="Search . . ."
          />
        </div>

        {filteredRequests.map((request, index) => (
          <div
            key={request._id}
            className="bg-emerald-100 shadow overflow-hidden sm:rounded-md my-4 "
          >
            <div className="block">
              <div className="px-4 py-4 sm:px-6">
                {request.status == "accepted" && (
                  <>
                    <div className="mb-4 p-1 bg-green-200 rounded-lg border border-green-400">
                      <p className="justify-center flex text-green-600">
                        Accepted
                      </p>
                    </div>
                  </>
                )}

                {request.status == "rejected" && (
                  <>
                    <div className="mb-4 p-1 bg-red-200 rounded-lg border border-red-400">
                      <p className="justify-center flex text-red-600">
                        Rejected
                      </p>
                    </div>
                  </>
                )}

                {request.status == "pending" && (
                  <>
                    <div className="mb-4 p-1 bg-yellow-200 rounded-lg border border-yellow-400">
                      <p className="justify-center flex text-yellow-600">
                        Pending
                      </p>
                    </div>
                  </>
                )}

                <div className="md:text-base text-sm ml-1">
                  <div className="mt-2 grid grid-cols-3 md:grid-cols-5">
                    <p className="flex col-span-1 items-center text-emerald-700">
                      Request Status
                    </p>
                    <p className="mt-0 col-span-2 flex items-center text-gray-500">
                      {request.status ? <>: {request.status}</> : <>: None</>}
                    </p>
                  </div>
                  <div className="mt-2 grid grid-cols-3 md:grid-cols-5">
                    <p className="flex col-span-1 items-center  text-emerald-700">
                      Category
                    </p>
                    <p className="mt-0 col-span-2 flex items-center  text-gray-500">
                      : {request.category}
                    </p>
                  </div>
                  <div className="mt-2 grid grid-cols-3 md:grid-cols-5 ">
                    <p className="flex col-span-1 items-center  text-emerald-700 ">
                      Type
                    </p>
                    <p className="mt-0 col-span-2 flex items-center  text-gray-500">
                      : {request.type}
                    </p>
                  </div>
                  <div className="mt-2 grid grid-cols-3 md:grid-cols-5">
                    <p className="flex col-span-1 items-center  text-emerald-700">
                      Hectares
                    </p>
                    <p className="mt-0 col-span-2 flex items-center  text-gray-500">
                      : {request.sizeOfLand}
                    </p>
                  </div>
                  <div className="mt-2 grid grid-cols-3 md:grid-cols-5">
                    <p className="flex lg:whitespace-nowrap col-span-1 items-center  text-emerald-700">
                      Requested amount(Kg)
                    </p>
                    <p className="mt-0 col-span-2 flex items-center  text-gray-500">
                      : {request.weight}
                    </p>
                  </div>
                  <div className="mt-2 grid grid-cols-3 md:grid-cols-5">
                    <p className="flex col-span-1 items-center  text-emerald-700">
                      Location
                    </p>
                    <p className="mt-0 col-span-2 flex items-center  text-gray-500">
                      : {request.location}
                    </p>
                  </div>
                  <div className="mt-2 grid grid-cols-3 md:grid-cols-5">
                    <p className="flex col-span-1 items-center  text-emerald-700">
                      Evaluated date
                    </p>
                    <p className="md:mt-0 col-span-2 flex items-center  text-gray-500">
                      : {moment(request.updatedAt).format("MMMM Do YYYY")}{" "}
                      <br></br>
                      &nbsp; {moment(request.updatedAt).format("LTS")}
                    </p>
                  </div>
                  <div className="mt-3 md:mt-2 grid grid-cols-3 md:grid-cols-5">
                    <p className="flex col-span-1 items-center  text-emerald-700">
                      Added date
                    </p>
                    <p className="md:mt-0 col-span-2 flex items-center  text-gray-500">
                      : {moment(request.createdAt).format("MMMM Do YYYY")}{" "}
                      <br></br>
                      &nbsp; {moment(request.createdAt).format("LTS")}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-5 ">
                  <div className="col-span-1 col-start-5 justify-center flex">
                    <button
                      className="flex w-fit text-white bg-green-500 py-1 px-4 rounded-lg hover:bg-green-600 transition-colors"
                      onClick={() => onDownload(request)}
                    >
                      <AiOutlineDownload
                        className="mt-0 mr-0 md:mt-1 md:mr-1"
                        size={20}
                      />
                      <p className="hidden md:block"> Download</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading === true ? (
          <>
            <div>
              <div className="flex justify-center mt-24">
                <CircularProgress color="success" />
              </div>
            </div>
          </>
        ) : (
          <>
            {isSearchResultExists === false && (
              <>
                <div className="grid justify-center mt-16">
                  <div className="flex justify-center">
                    <FiAlertCircle size={80} color="#63736b" />
                  </div>
                  <div className="font-semibold text-gray-500 text-xl mt-4">
                    No results found
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </MyRequestsWrapper>
    </div>
  );
};

export default EvaluatedRequests;
