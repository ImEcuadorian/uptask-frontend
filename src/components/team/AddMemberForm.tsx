import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import {TeamMemberForm} from "../../types";
import {findUserByEmail} from "../../services/TeamAPI.ts";
import SearchResult from "@/components/team/SearchResult.tsx";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        email: ''
    }
    const params = useParams()
    const projectId = params.projectId!

    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues: initialValues})

    const mutation = useMutation({
        mutationFn: findUserByEmail,
    })

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = {
            formData,
            projectId
        }
        mutation.mutate(data)
    }

    const resetForm = () => {
        reset();
        mutation.reset();
    }

    return (
        <>

            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >

                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="name"
                    >E-mail de Usuario</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="E-mail del usuario a Agregar"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    value='Buscar Usuario'
                />
            </form>
            <div className="mt-10">
                {
                    mutation.isPending && <p className="text-center">Buscando Usuario...</p>
                }
                {
                    mutation.isError && <ErrorMessage>{mutation.error?.message}</ErrorMessage>
                }
                {
                    mutation.data && (<SearchResult data={mutation.data} reset = {resetForm}/>)
                }

            </div>

        </>
    )
}
