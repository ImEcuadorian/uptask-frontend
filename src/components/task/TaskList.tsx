import {Project, TaskProject, TaskStatus} from "../../types";
import TaskCard from "@/components/task/TaskCard.tsx";
import {statusTranslation} from "../../locales/es.ts";
import DropTask from "@/components/task/DropTask.tsx";
import {DndContext, DragEndEvent} from "@dnd-kit/core";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateTaskStatus} from "../../services/TaskAPI.ts";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";

type TaskListProps = {
    tasks: TaskProject[],
    canEdit: boolean
}

type GroupTask = {
    [key: string]: TaskProject[],
}

const initialStatusGroups: GroupTask = {
    PENDING: [],
    ON_HOLD: [],
    IN_PROGRESS: [],
    UNDER_REVIEW: [],
    COMPLETED: []
}

const statusStyles: { [key: string]: string } = {
    PENDING: "border-t-slate-500",
    ON_HOLD: "border-t-red-500",
    IN_PROGRESS: "border-t-blue-500",
    UNDER_REVIEW: "border-t-amber-500",
    COMPLETED: "border-t-emerald-500"
}

const TaskList = ({tasks, canEdit}: TaskListProps) => {

    const params = useParams();
    const projectId = params.projectId!

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return {...acc, [task.status]: currentGroup};
    }, initialStatusGroups);

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
        }
    })

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        if (!over) return;

        const taskId = active.id.toString();
        const status = over.id as TaskStatus;

        queryClient.setQueryData(["project", projectId], (prevData : Project) => {
            const updateTask = prevData.tasks.map((task) => {
                if (task._id === taskId) {
                    return {...task, status}
                }
                return task;
            });
            return {
                ...prevData,
                tasks: updateTask
            }
        });

        mutate({projectId, taskId, status});
    }

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                <DndContext
                    onDragEnd={handleDragEnd}
                >
                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>

                            <h3
                                className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 rounded text-center
                            ${statusStyles[status]}`}
                            >{statusTranslation[status]}</h3>

                            <DropTask status={status}/>

                            <ul className='mt-5 space-y-5'>
                                {tasks.length === 0 ? (
                                    <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                                ) : (
                                    tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit}/>)
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>
            </div>
        </>
    )
};

export default TaskList;
