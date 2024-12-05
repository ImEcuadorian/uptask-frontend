import {isAxiosError} from "axios";
import api from "../lib/axios.ts";
import {
    CheckPassWordForm,
    ConfirmTokenForm,
    ForgotPasswordForm, NewPasswordForm,
    RequestConfirmationCodeForm, User,
    UserLoginForm,
    UserRegisterForm
} from "../types";

export const createAccount = async (formData: UserRegisterForm) => {
    try {
        const url = `/auth/create-account`;
        const {data} = await api.post(url, formData);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.message);
        }
    }
}

export const confirmAccount = async (token: ConfirmTokenForm) => {
    try {
        const url = `/auth/confirm-account`;
        const {data} = await api.post(url, {token});
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.message);
        }
    }
}

export const requestConfirmCode = async (formData: RequestConfirmationCodeForm) => {
    try {
        const url = `/auth/request-code`;
        const {data} = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.message);
        }
    }
}

export const authenticateUser = async (formData: UserLoginForm) => {
    try {
        const url = `/auth/login`;
        const {data} = await api.post(url, formData);
        localStorage.setItem('AUTH_TOKEN', data.token);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.message);
        }
    }
}

export const forgotPassword = async (formData: ForgotPasswordForm) => {
    try {
        const url = `/auth/forgot-password`;
        const {data} = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.message);
        }
    }
}

export const validateToken = async (formData: ConfirmTokenForm) => {
    try {
        const url = `/auth/validate-token`;
        const {data} = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.message);
        }
    }
}
export const updatePassword = async ({formData, token}: {
    formData: NewPasswordForm,
    token: ConfirmTokenForm["token"]
}) => {
    try {
        const url = `/auth/reset-password/${token}`;
        const {data} = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.message);
        }
    }
}

export const getUser = async () => {
    try {
        const {data} = await api.get<User>(`/auth/user`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.message);
        }
    }
}

export const checkPassword = async (formData: CheckPassWordForm) => {
    try {
        const url = `/auth/check-password`;
        const {data} = await api.post(url, formData);
        return data;
    }catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.message);
        }
    }
}
