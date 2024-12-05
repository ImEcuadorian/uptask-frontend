import {Note} from "../../types";
import {useAuth} from "../../hooks/useAuth.ts";
import {useMemo} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {deleteNote} from "../../services/NoteAPI.ts";
import {useLocation, useParams} from "react-router-dom";

type NoteDetailsProps = {
    note: Note;
}

const NoteDetails = ({note}: NoteDetailsProps) => {

    const params = useParams();

    const projectId = params.projectId!;

    const location = useLocation();

    const queryParam = new URLSearchParams(location.search);

    const taskId = queryParam.get("viewTask")!;

    const {data, isLoading} = useAuth();

    const canDelete = useMemo(() => {
        return data?._id === note.createdBy._id;
    }, [data])

    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: deleteNote,
        retry: false,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            toast.success("Nota eliminada");
            queryClient.invalidateQueries({
                queryKey: ["task", taskId]
            });
        }
    })

    const handleDelete = () => {
        mutate({projectId, taskId, noteId: note._id});
    }


    if (isLoading) {
        return <p>Cargando...</p>
    }

    if (data) return (
        <div className="py-3 flex justify-between items-center">
            <div>

                <p>
                    {note.content} por: <span className="font-bold">{note.createdBy.name}</span>
                </p>
                <p className="text-xs text-slate-500">
                    {note.createdAt.toString()}
                </p>
            </div>

            {
                canDelete && (
                    <button
                        type="button"
                        className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors"
                        onClick={handleDelete}
                    >
                        Eliminar
                    </button>
                )
            }

        </div>
    )
};

export default NoteDetails;
