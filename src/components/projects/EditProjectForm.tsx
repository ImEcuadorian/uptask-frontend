import {Link, useNavigate} from "react-router-dom";
import ProjectForm from "@/components/projects/ProjectForm.tsx";
import {Project, ProjectFormData} from "../../types";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateProject} from "../../services/ProjectAPI.ts";
import {toast} from "react-toastify";

type EditProjectFormProps = {
    data: ProjectFormData,
    projectId: Project['_id']
}
const EditProjectForm = ({data, projectId} : EditProjectFormProps) => {

    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm<ProjectFormData>({
        defaultValues: {
            projectName: data.projectName,
            clientName: data.clientName,
            description: data.description,
        }
    });

    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: updateProject,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects"]
            });
            queryClient.invalidateQueries({
                queryKey: ["edit-project", projectId]
            });
            toast.success('Proyecto actualizado correctamente');
            navigate("/");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const handleFormSubmit = (formData: ProjectFormData) => {
        const data = {formData, projectId};
        mutate(data);
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">

                <h1 className="text-5xl font-black">Editar proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para editar el proyecto</p>
                <nav className="my-5">
                    <Link to={"/"}
                          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer
                transition-colors">Volver a proyectos</Link>
                </nav>
                <form className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                      onSubmit={handleSubmit(handleFormSubmit)}
                      noValidate
                >
                    <ProjectForm register={register} errors={errors}/>
                    <input
                        type="submit"
                        value="Guardar Cambios"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer
                   transition-colors"
                    />
                </form>
            </div>
        </>
    )
};

export default EditProjectForm;
