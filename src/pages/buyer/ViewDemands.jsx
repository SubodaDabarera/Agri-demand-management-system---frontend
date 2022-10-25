import React, { useEffect, useState } from "react";
import axios from "axios";
import MyRequestsWrapper from "../../components/wrappers/farmer/MyRequestsWrapper";
import { toast, ToastContainer } from "react-toastify";
import { BsArrowRightCircle } from "react-icons/bs";
import moment from "moment/moment";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import CircularProgress from "@mui/material/CircularProgress";
import { FiAlertCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { viewDemandList } from "../../api/ProductDemandAPI";
import { AiOutlineDownload } from "react-icons/ai";
import jsPDF from "jspdf";

export default function ViewDemands() {
  const [demandList, setDemandList] = useState([]);
  const [userId, setuserID] = useState(localStorage.getItem("user"));
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchResultExists, setIsSearchResultExists] = useState(false);
  const [filteredDemands, setFilteredDemands] = useState([]);

  //Delete demand
  const onDelete = async (demandID) => {
    console.log("onDelete - ", demandID);
    const deleteDemandDetail = {
      userId,
      demandID,
    };

    await axios
      .delete("http://localhost:8000/api/seller", { data: deleteDemandDetail })
      .then(async () => {
        await viewDemandList(
          userId,
          setDemandList,
          setFilteredDemands,
          setIsSearchResultExists
        ).then(() => {
          console.log("Data retrieved success - on delete");
          setIsLoading(false);
        });
        toast.success("Demand deleted!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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

    await axios
      .get("http://localhost:8000/api/seller/" + userId)
      .then((res) => {
        setDemandList(res.data.demands);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //demand filter search
  useEffect(() => {
    const filteredDemands = demandList.filter((demand) => {
      if (searchQuery === "") {
        return demand;
      } else if (
        demand.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return demand;
      } else if (
        demand.type.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return demand;
      }
    });

    setFilteredDemands(filteredDemands);
    if (filteredDemands.length > 0) {
      setIsSearchResultExists(true);
    } else {
      setIsSearchResultExists(false);
    }
  }, [searchQuery]);

  //retrive demands
  useEffect(() => {
    async function getDemands() {
      await viewDemandList(
        userId,
        setDemandList,
        setFilteredDemands,
        setIsSearchResultExists
      ).then(() => {
        console.log("Data retrieved success");
        setIsLoading(false);
      });
    }
    getDemands();
  }, []);

  const onDownload = (demand) => {
    const printableObject = [
      { title: "ID", data: demand._id },
      { title: "Category", data: demand.category },
      { title: "Type", data: demand.type },

      { title: "Selling in Kilograms", data: demand.sellings },
      { title: "Unit Prise in Rupees (for 1kg)", data: demand.unitPrice },
      { title: "Remarks", data: demand.status },
    ];

    // const doc = new jsPDF();
    var doc = new jsPDF("p", "px", "letter");
    const tableColumn = ["", ""];
    const tableRows = [];

    // for each ticket pass all its data into an array

    printableObject.map((demand, idx) => {
      const ticketData = [demand.title, ":  " + demand.data];
      tableRows.push(ticketData);
    });

    doc.autoTable(tableColumn, tableRows, {
      startY: 130,
      startX: 20,
    });

    const date = Date();
    // const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.setFont("Courier-Bold");
    doc.setTextColor("#07912e");
    doc.setFontSize(22);
    doc.text("Agri Demand Management System", 112, 30);
    doc.setFontSize(12);
    doc.text("----- Requested Demand ----- ", 177, 44);
    doc.setTextColor("#6f7370");

    // add company address and phone
    doc.setTextColor("#5c5c5c");
    doc.setFont("Helvetica");
    doc.setFontSize(10);
    doc.text(
      "Management \nAgriculture Department \nHomagama \nSri Lanka \nPhone : 0112345678 ",
      30,
      70
    );

    // add verified message
    doc.setFont("Times-Bold");
    doc.setTextColor("#19d13e");
    doc.setFillColor("#db1414");
    doc.setFontSize(20);
    doc.text("Approved!", 310, 524);

    doc.setFontSize(10);
    doc.setTextColor("#000000");
    doc.text("- - - - - - - - - - - - - - - - - - - - - - - - -", 290, 540);
    doc.text("Agri Demand Management System", 290, 550);

    doc.save(`Demand_report_${demand.type}_${date}.pdf`);
  };

  return (
    <div>
      <MyRequestsWrapper>
        <div className="font-semibold text-2xl text-center my-16">
          {" "}
          View Demands{" "}
        </div>
        {/* added toast container here, because of my easyness */}
        <ToastContainer />

        {/*<div className="bg-red-100 shadow overflow-hidden sm:rounded-md my-4 text-sm text-red-900 p-4">*/}
        {/*  <div className="flex">*/}
        {/*    <BsArrowRightCircle color="black" size={18} />*/}
        {/*    <div className="ml-3">*/}
        {/*      Deadline for your requests is{" "}*/}
        {/*      <i className="text-red-600">*/}
        {/*        <u>2022-09-30</u>*/}
        {/*      </i>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="flex pt-1">*/}
        {/*    <BsArrowRightCircle color="black" size={18} />*/}
        {/*    <div className="ml-3">*/}
        {/*      Before the deadline is the only time you can modify or delete your*/}
        {/*      request.*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

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

        {filteredDemands &&
          filteredDemands.map((demand) => (
            <div
              key={demand._id}
              className="bg-emerald-100 shadow overflow-hidden sm:rounded-md my-4"
            >
              <div className="block">
                <div className="px-4 py-4 sm:px-6">
                  <div className="mt-2 grid grid-cols-5">
                    <p className="flex col-span-1 items-center text-sm text-emerald-700">
                      Category
                    </p>
                    <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      : {demand.category}
                    </p>
                  </div>

                  <div className="mt-2 grid grid-cols-5 ">
                    <p className="flex col-span-1 items-center text-sm text-emerald-700 ">
                      Type
                    </p>
                    <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      : {demand.type}
                    </p>
                  </div>

                  <div className="mt-2 grid grid-cols-5 ">
                    <p className="flex col-span-1 items-center text-sm text-emerald-700 ">
                      Usage for 1 year
                    </p>
                    <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      : {demand.sellings} Kg
                    </p>
                  </div>

                  <div className="mt-2 grid grid-cols-5 ">
                    <p className="flex col-span-1 items-center text-sm text-emerald-700 ">
                      Unit price
                    </p>
                    <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      : Rs.{demand.unitPrice}
                    </p>
                  </div>

                  <div className="mt-2 grid grid-cols-5 ">
                    <p className="flex col-span-1 items-center text-sm text-emerald-700 ">
                      Remarks
                    </p>
                    <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      : {demand.remarks}
                    </p>
                  </div>

                  <div className="grid grid-cols-5 ">
                    <div className="col-start-3 col-span-1 justify-end flex">
                      <button
                        className="flex w-fit text-white bg-blue-500 py-1 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                        onClick={() => onDownload(demand)}
                      >
                        <AiOutlineDownload
                          className="mt-0 mr-0 md:mt-1 md:mr-1"
                          size={20}
                        />
                        <p className="hidden md:block"> Download</p>
                      </button>
                    </div>
                    <div className=" col-span-1 justify-center flex">
                      <button
                        className="flex min-w-fit bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-colors"
                        onClick={() => onDelete(demand._id)}
                      >
                        <RiDeleteBin6Line
                          className="mt-0 mr-0 md:mt-1 md:mr-1"
                          size={18}
                        />
                        <p className="hidden md:block">Delete</p>
                      </button>
                    </div>
                    <div className="col-span-1 justify-start flex">
                      <Link
                        to={"/buyer/update-demand/" + userId}
                        state={{ id: userId, DemandData: demand }}
                      >
                        <button className="flex w-fit text-white bg-green-500 py-1 px-4 rounded-lg hover:bg-green-600 transition-colors">
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
}
