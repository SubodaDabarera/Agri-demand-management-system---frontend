import axios from "axios";
import { BACKEND_URL } from "../init/session";

export const getFarmers = async (setFarmers) => {
    try {
        await axios
            .get(`${BACKEND_URL}/farmers`, {
            })
            .then((res) => {
                console.log(res.data);
                setFarmers(res.data);
            });
    } catch (err) {
        console.log(err);
        setFarmers([]);
    }
};


export const deleteFarmer = async (id) => {
    try {
        await axios
            .delete(`${BACKEND_URL}/farmers/` + id)
            .then((res) => {
            });
    } catch (err) {
        console.log(err);
    }
};

export const updateFarmer = async (id, farmer, setFarmer) => {
    try {
        await axios
            .put(`${BACKEND_URL}/farmers/` + id, farmer)
            .then((res) => {
                localStorage.setItem('Farmer', JSON.stringify(farmer));
                setFarmer(res.data);
            });
    } catch (err) {
        console.log(err);
    }
};

export const getFarmer = async (id, setFarmer) => {
    try {
        await axios
            .get(`${BACKEND_URL}/farmers/` + id)
            .then((res) => {
                console.log(res.data);
                setFarmer(res.data);
            });
    } catch (err) {
        console.log(err);
        setFarmer({});
    }
};
