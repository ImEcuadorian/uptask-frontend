import {isAxiosError} from "axios";
import {Project, Task, TaskFormData, TaskSchema} from "../types";
import api from "../lib/axios.ts";

type TaskAPICreateTaskResponse = {
    formData: TaskFormData,
    projectId: Project["_id"],
    taskId: Task["_id"],
    status: Task["status"]
}
export const createTask = async ({formData, projectId}: Pick<TaskAPICreateTaskResponse, "formData" | "projectId">) => {
    try {
        const url = `/projects/${projectId}/task`;
        const {data} = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.message);
        }
    }
}

export const getTaskById = async ({projectId, taskId}: Pick<TaskAPICreateTaskResponse, "projectId" | "taskId">) => {
    try {
        const url = `/projects/${projectId}/task/${taskId}`;
        const {data} = await api.get(url);
        const response = TaskSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.message);
        }
    }
}

export const updateTask = async ({formData, projectId, taskId}: Pick<TaskAPICreateTaskResponse, "formData" | "projectId" | "taskId">) => {
    try {
        const url = `/projects/${projectId}/task/${taskId}`;
        const {data} = await api.put(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.message);
        }
    }
}

export const deleteTask = async ({projectId, taskId}: Pick<TaskAPICreateTaskResponse, "projectId" | "taskId">) => {
    try {
        const url = `/projects/${projectId}/task/${taskId}`;
        const {data} = await api.delete(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.message);
        }
    }
}

export const updateTaskStatus = async ({projectId, taskId, status}: Pick<TaskAPICreateTaskResponse, "projectId" | "taskId" | "status">) => {
    try {
        const url = `/projects/${projectId}/task/${taskId}/status`;
        const {data} = await api.post(url, {status});
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.message);
        }
    }
}



