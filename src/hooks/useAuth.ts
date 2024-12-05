import {useQuery} from "@tanstack/react-query";
import {getUser} from "../services/AuthAPI.ts";

export const useAuth = () => {

    const {data, isError, isLoading} = useQuery({
        queryKey: ["profile"],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false
    });

    return {
        data,
        isError,
        isLoading
    }
}
