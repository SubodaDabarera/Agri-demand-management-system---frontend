import axios from "axios";

// const BACKEND_URL = "http://localhost:8000/api";
const BACKEND_URL = "https://agri-demand-management-backend.cyclic.app/api";

export const createSeedRequest = async (
  { farmerId, category, type, sizeOfLand, weight, location },
  setIsCreationSuccess
) => {
  try {
    await axios
      .post(`${BACKEND_URL}/seed-request/create-seed-request`, {
        farmerId,
        category,
        type,
        sizeOfLand,
        weight,
        location,
      })
      .then((result) => {
        setIsCreationSuccess(result.data.success);
      });
  } catch (err) {
    console.log(err);
    setIsCreationSuccess(false);
  }
};

export const viewFarmerSeedRequest = async (
  farmerId,
  setMyRequests,
  setFilteredRequests,
  setIsSearchResultExists
) => {
  try {
    await axios
      .get(`${BACKEND_URL}/seed-request/view-seed-request`, {
        params: { farmerId },
      })
      .then((result) => {
        if (result.data.success === true) {
          setMyRequests(result.data.data);
          setFilteredRequests(result.data.data);
          setIsSearchResultExists(result.data.success);
        } else {
          setMyRequests([]);
          setFilteredRequests([]);
          setIsSearchResultExists(result.data.success);
        }
      });
  } catch (err) {
    console.log(err);
    setMyRequests([]);
  }
};

export const updateSeedRequest = async (
  {RequestId, farmerId, category, type, sizeOfLand, weight, location },
  setIsCreationSuccess
) => {
  try {
    await axios
      .put(`${BACKEND_URL}/seed-request/update-seed-request`, {
        RequestId,
        farmerId,
        category,
        type,
        sizeOfLand,
        weight,
        location,
      })
      .then((result) => {
        setIsCreationSuccess(result.data.success);
      });
  } catch (err) {
    console.log(err);
    setIsCreationSuccess(false);
  }

    try {
        await axios
            .post(`${BACKEND_URL}/crops/updateSupply`, {
                category,
                type,
                supply: weight
            })
            .then((result) => {
                console.log(result.data.data);
            });
    } catch (err) {
        console.log(err);
    }
};

export const deleteSeedRequest = async (requestId, setIsDeleteSuccess) => {
  try {
    await axios
      .delete(`${BACKEND_URL}/seed-request/delete-seed-request`, {
        params: { requestId },
      })
      .then((result) => {
        setIsDeleteSuccess(result.data.success);
      });
  } catch (err) {
    console.log(err);
    setIsDeleteSuccess(false);
  }
};

export const getSeedRequestsWithFarmer = async (setRequests) => {

  try {
    const requests = await axios
        .get(`${BACKEND_URL}/seed-request/all`, {
        });

    const allRequestData = [];

    for(const request of requests.data) {
        const farmerId = request.farmerId;
        const farmer = await axios
            .get(`${BACKEND_URL}/farmers/` + farmerId);
        request.farmerName = farmer.data.fullName;
        allRequestData.push(request);
    };

    setRequests(allRequestData);

  } catch (err) {
    console.log(err);
    setRequests([]);
  }
};

export const updateSeedRequestStatus = async (id, request, setIsSuccess) => {
    try {
        await axios
            .put(`${BACKEND_URL}/seed-request/update-status/` + id, request)
            .then((res) => {
                setIsSuccess(res.data.success);
            });
    } catch (err) {
        console.log(err);
        setIsSuccess(false);
    }
};