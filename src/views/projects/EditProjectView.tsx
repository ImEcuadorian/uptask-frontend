import {Navigate, useParams} from "react-router-dom";
import {getProjectById} from "../../services/ProjectAPI.ts";
import {useQuery} from "@tanstack/react-query";
import EditProjectForm from "@/components/projects/EditProjectForm.tsx";

const EditProjectView = () => {

    const params = useParams();

    const projectId = params.projectId!;

    const {data, isLoading, isError} = useQuery({
        queryKey: ["edit-project", projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
    });

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <Navigate to={"/404"}/>;

    if (data) return (
        <EditProjectForm data={data} projectId={projectId}/>
    )
};

export default EditProjectView;
