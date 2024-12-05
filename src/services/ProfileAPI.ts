import {ChangePasswordForm, UserProfileForm} from "../types";
import api from "../lib/axios.ts";
import {isAxiosError} from "axios";

export const updateProfile = async (formData: UserProfileForm) => {

    try {
        const {data} = await api.put('/profile', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error);
        }
    }

}

export const changePassword = async (formData: ChangePasswordForm) => {
    try {
        const {data} = await api.post('/update-password', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error);
        }
    }
}
