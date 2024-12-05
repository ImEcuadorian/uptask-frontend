import {useForm} from "react-hook-form";
import {NoteFormData} from "../../types";
import ErrorMessage from "@/components/ErrorMessage.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createNote} from "../../services/NoteAPI.ts";
import {toast} from "react-toastify";
import {useLocation, useParams} from "react-router-dom";

const AddNoteForm = () => {

    const params = useParams();

    const projectId = params.projectId!;

    const location = useLocation();

    const queryParam = new URLSearchParams(location.search);

    const taskId = queryParam.get("viewTask")!;

    const initialValues: NoteFormData = {
        content: ''
    };

    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues: initialValues});

    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: createNote,
        retry: false,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            toast.success("Nota agregada");
            queryClient.invalidateQueries({
                queryKey: ["task", taskId]
            });
        }
    })

    const handleAddNote = (noteFormData: NoteFormData) => {
        const data = {
            projectId,
            taskId,
            formData: noteFormData
        }

        mutate(data);
        reset();
    }

    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}
            className="space-y-3"
            noValidate
        >
            <div
                className="flex flex-col gap-2"
            >
                <label className="font-bold" htmlFor="content">Contenido</label>
                <input
                    id="content"
                    type="text"
                    placeholder="Escribe el contenido de la nota"
                    className="w-full p-3 bg-white border border-gray-300"
                    {
                        ...register("content", {
                            required: "Este campo es requerido",
                            minLength: {
                                value: 3,
                                message: "El contenido debe tener al menos 3 caracteres"
                            }
                        })
                    }
                />
                {
                    errors.content && (
                        <ErrorMessage>{errors.content.message}</ErrorMessage>
                    )
                }
            </div>
            <input
                type="submit"
                value="Agregar Nota"
                className="w-full p-3 bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-600"
            />
        </form>
    )
};

export default AddNoteForm;
