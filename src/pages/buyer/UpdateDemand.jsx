import React, { Fragment, useEffect, useState } from "react";
import { updateProductDemand } from "../../api/ProductDemandAPI";
import FormWrapper from "../../components/wrappers/FormWrapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useParams } from "react-router-dom";

const UpdateDemand = () => {
  // const {demoId} = useParams();
  const [sellings, setSellings] = useState(0.0);
  const [unitPrice, setUnitPrice] = useState(0.0);
  const [remarks, setRemarks] = useState("");
  const [isCreationSuccess, setIsCreationSuccess] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("user"));
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [demandID, setDemandId] = useState("");
  const [isWeightError, setIsWeightError] = useState(false)
  const [isPriceError, setIsPriceError] = useState(false)



  // get Data from backend and display it in here
  const Elocation = useLocation();
  const { DemandData } = Elocation.state;

  useEffect(() => {

    setDemandId(DemandData._id);
    setCategory(DemandData.category);
    setType(DemandData.type);
    setSellings(DemandData.sellings);
    setUnitPrice(DemandData.unitPrice);
    setRemarks(DemandData.remarks);
  }, []);

  const handleSubmit = async () => {

    if(sellings <=0){
      setIsWeightError(true)
    }
    else{
      setIsWeightError(false)
    }

    if(unitPrice <=0){
      setIsPriceError(true)
    }
    else {
      setIsPriceError(false)
    }

    if(unitPrice > 0 && sellings > 0) {
      await updateProductDemand(
          {
            buyerID: userId,
            demandID,
            category,
            type,
            sellings,
            unitPrice,
            remarks,
          },
          setIsCreationSuccess
      )
          .then(() => {
            toast.success("Demand updated successfully !", {
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
    }
    else {
      toast.error("Please give valid information to us", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <FormWrapper>
      <>
        <div className="my-16">
          <ToastContainer />
          <p className="font-semibold text-2xl text-center">
            Update demand for a product
          </p>

          <label
            htmlFor="category"
            className="block text-base font-medium text-gray-700 mt-6"
          >
            Category :
          </label>

          <input
            type="text"
            name="category"
            id="category"
            autoComplete="given-name"
            value={category}
            readOnly={true}
            className="mt-2 focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
          />

          <label
            htmlFor="type"
            className="block text-base font-medium text-gray-700 mt-6"
          >
            Type :
          </label>
          <input
            type="text"
            name="type"
            id="type"
            autoComplete="given-name"
            value={type}
            readOnly={true}
            className="mt-2 focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
          />

          <label
            htmlFor="sellings"
            className="block text-base font-medium text-gray-700 mt-6"
          >
            Selling in Kilograms (for 1 year) :
          </label>
          <input
            type="number"
            name="sellings"
            id="sellings"
            autoComplete="given-name"
            value={sellings}
            className="mt-2 focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
            onChange={(event) => {
              setSellings(event.target.value);
            }}
          />

          {isWeightError && (
              <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
                Kilograms must have positive value
              </div>
          )}

          <label
            htmlFor="price"
            className="block text-base font-medium text-gray-700 mt-6"
          >
            Unit price in Rupees (for 1Kg) :
          </label>
          <input
            type="number"
            name="price"
            id="price"
            autoComplete="given-name"
            value={unitPrice}
            className="mt-2 focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
            onChange={(event) => {
              setUnitPrice(event.target.value);
            }}

            required={true}
          />
          {isPriceError && (
              <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
                Price must have positive value
              </div>
          )}

          <label
            htmlFor="remarks"
            className="block text-base font-medium text-gray-700 mt-6"
          >
            Remarks :
          </label>
          <input
            type="text"
            name="remarks"
            id="remarks"
            autoComplete="given-name"
            value={remarks}
            className="mt-2 focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
            onChange={(event) => {
              setRemarks(event.target.value);
            }}
          />

          <div className="flex items-center justify-center mt-10">
            <div
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors cursor-pointer"
              onClick={handleSubmit}
            >
              Edit
            </div>
          </div>
        </div>
      </>
    </FormWrapper>
  );
};

export default UpdateDemand;
