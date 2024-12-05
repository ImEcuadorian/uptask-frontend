import {isAxiosError} from "axios";
import {Note, NoteFormData, Project, Task} from "../types";
import api from "../lib/axios.ts";

type NoteAPIType = {
    formData: NoteFormData;
    projectId: Project["_id"];
    taskId: Task["_id"],
    noteId: Note["_id"];
}

export const createNote = async ({projectId, taskId, formData} : Pick<NoteAPIType, "projectId"| "taskId"| "formData">) => {
    try {

        const url = `/projects/${projectId}/task/${taskId}/notes`;
        const {data} = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error.response?.data);
        }
    }
}

export const deleteNote = async ({projectId, taskId, noteId} : Pick<NoteAPIType, "projectId"| "taskId" | "noteId">) => {
    try {
        const url = `/projects/${projectId}/task/${taskId}/notes/${noteId}`;
        const {data} = await api.delete(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error.response?.data);
        }
    }
}
