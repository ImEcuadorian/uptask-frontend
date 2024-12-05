import React, {Fragment} from 'react';
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from '@headlessui/react';
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getTaskById, updateTaskStatus} from "../../services/TaskAPI.ts";
import {toast} from "react-toastify";
import {formatDateTime} from "../../utils/utils.ts";
import {statusTranslation} from "../../locales/es.ts";
import {TaskStatus} from "../../types";
import NotesPanel from "@/components/note/NotesPanel.tsx";


export default function TaskModalDetails() {

    const params = useParams();
    const projectId = params.projectId!;
    const navigate = useNavigate();
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const taskId = queryParam.get("taskDetails")!;

    const show = !!taskId;

    const {data, isError} = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        retry: false,
        enabled: !!taskId
    })

    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: updateTaskStatus,
        retry: false,
        onError: (error) => {
            toast.error(error.message, {
                toastId: "error"
            });
        },
        onSuccess: () => {
            toast.success("Estado de la tarea actualizado", {
                toastId: "success"
            });
            queryClient.invalidateQueries({
                queryKey: ["project", projectId]
            });
            queryClient.invalidateQueries({
                queryKey: ["task", taskId]
            });
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const data = {
            projectId,
            taskId,
            status: e.target.value as TaskStatus
        }
        mutate(data);
    }

    if (isError) {
        toast.error("Error al cargar la tarea", {
            toastId: "error"
        });
        return <Navigate to={`/projects/${projectId}`}/>
    }

    if (data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {
                    replace: true,
                })}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60"/>
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel
                                    className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada
                                        el: {formatDateTime(data.createdAt)}</p>
                                    <p className='text-sm text-slate-400'>Última
                                        actualización: {formatDateTime(data.updatedAt)} </p>
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}
                                    </DialogTitle>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description}</p>

                                    {
                                        data.completedBy.length > 0 && (
                                            <>
                                                <p className="text-lg text-slate-500 mb-2">Historial de cambios</p>
                                                {
                                                    data.completedBy.map((activity) => (
                                                        <p key={activity._id}
                                                           className='text-lg text-slate-500 mb-2'>
                                                            {activity.user.name}
                                                            : {statusTranslation[activity.status]}
                                                        </p>
                                                    ))
                                                }
                                            </>
                                        )
                                    }

                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual:</label>
                                        <select
                                            className="w-full p-3 bg-white border border-gray-300"
                                            defaultValue={data.status}
                                            onChange={handleChange}
                                        >
                                            {
                                                Object.entries(statusTranslation).map(([key, value]) => (
                                                    <option key={key} value={key}>{value}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <NotesPanel
                                        notes={data.notes}
                                    />

                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
