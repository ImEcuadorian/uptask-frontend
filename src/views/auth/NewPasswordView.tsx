import {useState} from "react";
import NewPasswordToken from "@/components/auth/NewPasswordToken.tsx";
import NewPasswordForm from "@/components/auth/NewPasswordForm.tsx";
import {ConfirmTokenForm} from "../../types";

const NewPasswordView = () => {

    const [token, setToken] = useState<ConfirmTokenForm["token"]>('');

    const [isValidToken, setIsValidToken] = useState(false);

    return (
        <>
            <h1 className="text-5xl font-black text-white">Restablecer Contraseña</h1>
            <p className="text-2xl font-light text-white mt-5">
                Llena el formulario para {''}
                <span className=" text-fuchsia-500 font-bold">cambiar la contraseña</span>
            </p>

            {
                !isValidToken ? (
                    <NewPasswordToken
                        token={token}
                        setToken={setToken}
                        setIsValidToken={setIsValidToken}
                    />
                ) : (
                    <NewPasswordForm
                        token={token}
                    />
                )
            }

        </>
    )
};

export default NewPasswordView;
