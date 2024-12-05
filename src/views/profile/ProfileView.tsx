import {useAuth} from "../../hooks/useAuth.ts";
import ProfileForm from "@/components/profile/ProfileForm.tsx";

const ProfileView = () => {

    const {data, isLoading} = useAuth();

    if (isLoading) {
        return <p>Cargando...</p>
    }

    if (data) return (
        <ProfileForm data={data}/>
    )
};

export default ProfileView;
