import axios, {isAxiosError} from "axios";
import {Project, TeamMember, TeamMemberForm, TeamMembersSchema} from "../types";

export const findUserByEmail = async ({projectId, formData}: {
    projectId: Project["_id"],
    formData: TeamMemberForm
}) => {
    try {
        const url = `/projects/${projectId}/team`;
        const {data} = await axios.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error);
        }
    }
}

export const addUserToProject = async ({projectId, id}: {
    projectId: Project["_id"],
    id: TeamMember["_id"]
}) => {
    try {
        const url = `/projects/${projectId}/team`;
        const {data} = await axios.post(url, {id});
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error);
        }
    }
}

export const getProjectTeam = async ({projectId}: {
    projectId: Project["_id"],
}) => {
    try {
        const url = `/projects/${projectId}/team`;
        const {data} = await axios.get(url);
        const response = TeamMembersSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error);
        }
    }
}

export const removeUserFromProject = async ({projectId, userId}: {
    projectId: Project["_id"],
    userId: TeamMember["_id"]
}) => {
    try {
        const url = `/projects/${projectId}/team/${userId}`;
        const {data} = await axios.delete(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error);
        }
    }
}
