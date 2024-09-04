import axios from "axios";
import { BACKEND_URL } from "../init/session";

export const createCropType = async (
    { category, type, supply, demand },
    setIsCreationSuccess
) => {
    try {
        await axios
            .post(`${BACKEND_URL}/crops/`, {
                category,
                type,
                supply,
                demand
            })
            .then((result) => {
                setIsCreationSuccess(result.data.success);
            });
    } catch (err) {
        console.log(err);
        setIsCreationSuccess(false);
    }
};


export const getCropTypes = async (setCategories, setCrops) => {

    try {
        await axios
            .get(`${BACKEND_URL}/crops/`)
            .then((res) => {
                setCategories(res.data);
                setCrops(res.data);
            })
        // console.log(c.data);
    } catch (err) {
        console.log(err);
        setCrops([]);
    }
};