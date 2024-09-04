import axios from "axios";
import { BACKEND_URL } from "../init/session";

export const createMessage = async ({ recipientId, subject, creatorId, messageBody, status }, setIsSuccess) => {
    try {
        await axios
            .post(`${BACKEND_URL}`, {
                recipientId,
                subject,
                creatorId,
                messageBody,
                status,
            })
            .then((res) => {
                setIsSuccess(res.data.success);
            });
    } catch (err) {
        console.log(err);
        setIsSuccess(false);
    }
};

export const getSuggestions = async (id, seSuggestions) => {
    try {
        await axios
            .get(`${BACKEND_URL}/` + id, {
            })
            .then((res) => {
                console.log(res.data);
                seSuggestions(res.data);
            });
    } catch (err) {
        console.log(err);
        seSuggestions([]);
    }
};

export const updateStatusMessage = async (id, { recipientId, subject, creatorId, messageBody, status }) => {
    try {
        console.log(recipientId, subject, creatorId, messageBody, status);
        await axios
            .put(`${BACKEND_URL}/` + id, {
                recipientId,
                subject,
                creatorId,
                messageBody,
                status,
            })
    } catch (err) {
        console.log(err);
    }
};

