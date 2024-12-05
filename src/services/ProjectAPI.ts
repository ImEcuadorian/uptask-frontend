import {DashBoardProjectSchema, EditProjectSchema, Project, ProjectFormData, ProjectSchema} from "../types";
import api from "../lib/axios.ts";
import {isAxiosError} from "axios";

export const createProject = async (project: ProjectFormData) => {

    try {
        const {data} = await api.post("/projects", project);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }

}

export const getProjects = async () => {
    try {
        const {data} = await api.get("/projects");
        const response = DashBoardProjectSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

export const getProjectById = async (projectId: Project['_id']) => {
    try {
        const {data} = await api.get(`/projects/${projectId}`);
        const response = EditProjectSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}
export const getFullProjectById = async (projectId: Project['_id']) => {
    try {
        const {data} = await api.get(`/projects/${projectId}`);
        const response = ProjectSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

type UpdateProjectAPI = {
    formData: ProjectFormData,
    projectId: Project['_id']
}

export const updateProject = async ({formData, projectId} : UpdateProjectAPI) => {
    try {
        const {data} = await api.put(`/projects/${projectId}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

export const deleteProject = async (projectId: Project['_id']) => {
    try {
        const {data} = await api.delete(`/projects/${projectId}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}
