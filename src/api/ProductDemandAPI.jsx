import axios from "axios";
import { BACKEND_URL } from "../init/session";

export const createProductDemand = async (
  { buyerID, category, type, sellings, unitPrice, remarks },
  setIsCreationSuccess
) => {
  try {
    await axios
      .post(`${BACKEND_URL}/seller/addDemand/${buyerID}`, {
        category,
        type,
        sellings,
        unitPrice,
        remarks,
      })
      .then((result) => {
        setIsCreationSuccess(result.data.success);
      });
  } catch (err) {
    console.log(err);
    setIsCreationSuccess(false);
  }
};

export const updateProductDemand = async (
  { buyerID, demandID, category, type, sellings, unitPrice, remarks },
  setIsCreationSuccess
) => {
  try {
    await axios
      .put(`${BACKEND_URL}/seller/editDemand/${buyerID}`, {
        demandID,
        category,
        type,
        sellings,
        unitPrice,
        remarks,
      })
      .then((result) => {
        setIsCreationSuccess(result.data.success);
      });
  } catch (err) {
    console.log(err);
    setIsCreationSuccess(false);
  }
};

export const viewDemandList = async (
  userId,
  setDemandList,
  setFilteredDemands,
  setIsSearchResultExists
) => {
  try {
    await axios.get(`${BACKEND_URL}/seller/` + userId).then((result) => {
      if (result) {
        setDemandList(result.data.demands);
        setFilteredDemands(result.data.demands);
        setIsSearchResultExists(result.data.demands);
      } else {
        setDemandList([]);
        setFilteredDemands([]);
        setIsSearchResultExists(result.data.success);
      }
    });
  } catch (err) {
    console.log(err);
    setDemandList([]);
  }
};
