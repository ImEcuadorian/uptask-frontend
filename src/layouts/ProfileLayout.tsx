import {Outlet} from "react-router-dom";
import Tabs from "@/components/profile/Tabs.tsx";

const ProfileLayout = () => {
    return (
        <>
            <Tabs />
            <Outlet />
        </>
    )
};

export default ProfileLayout;
