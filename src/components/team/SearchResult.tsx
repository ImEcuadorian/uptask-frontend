import {TeamMember} from "../../types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addUserToProject} from "../../services/TeamAPI.ts";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";

type SearchResultProps = {
    data: TeamMember;
    reset: () => void;
}
const SearchResult = ({data, reset}: SearchResultProps) => {

    //Opcional const navigation = useNavigate();

    const params = useParams();
    const projectId = params.projectId!;

    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            toast.success('Usuario agregado al proyecto');
            reset();
            queryClient.invalidateQueries({
                queryKey: ["projectTeam", {projectId}]
            });
            // Opcional para cerrar navigation(location.pathname, {replace: true});
        }
    })

    const handleAddUser = () => {
        mutate({projectId, id: data._id});
    }

    return (
        <>
            <p className="mt-10 text-center font-bold">
                Resultado:
            </p>
            <div className="flex justify-between items-center">
                <p>{data.name}</p>
                <button className="text-purple-600 hover:text-purple-100 px-10 py-3 font-bold cursor-pointer"
                        onClick={handleAddUser}
                >
                    Agregar al proyecto
                </button>
            </div>
        </>
    )
};

export default SearchResult;
