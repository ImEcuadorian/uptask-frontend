import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getFullProjectById} from "../../services/ProjectAPI.ts";
import AddTaskModal from "@/components/task/AddTaskModal.tsx";
import TaskList from "@/components/task/TaskList.tsx";
import EditTaskData from "@/components/task/EditTaskData.tsx";
import TaskModalDetails from "@/components/task/TaskModalDetails.tsx";
import {useAuth} from "../../hooks/useAuth.ts";
import {isManager} from "../../utils/policies.ts";
import {useMemo} from "react";

const ProjectDetailsView = () => {

    const {data: user, isLoading: authLoading} = useAuth();

    const navigate = useNavigate();

    const params = useParams();

    const projectId = params.projectId!;

    const {data, isLoading, isError} = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getFullProjectById(projectId),
        retry: false
    });

    const canEdit = useMemo(()=> {
        return data?.manager === user?._id;
    }, [data, user]);

    if (isLoading && authLoading) return <p>Cargando...</p>;
    if (isError) return <Navigate to={"/404"}/>;
    if (data && user) return (
        <>

            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>
            <nav className="my-5 flex gap-3">

                {
                    isManager(data.manager, user._id) && (
                        <>
                            <button
                                type="button"
                                className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                                onClick={() => navigate(location.pathname + "?newTask=true")}
                            >

                                Agregar tarea
                            </button>
                            <Link
                                to={`team`}
                                className="bg-purple-600 hover:bg-purple-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                            >Colaboradores</Link>
                        </>
                    )
                }


            </nav>
            <TaskList tasks={data.tasks}
                canEdit={canEdit}
            />
            <AddTaskModal/>
            <EditTaskData/>
            <TaskModalDetails/>
        </>
    )
};

export default ProjectDetailsView;
