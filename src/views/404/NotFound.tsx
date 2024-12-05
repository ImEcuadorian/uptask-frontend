import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <h1
                className="font-black text-center text-4xl text-white"
            >Pagina no encontrada</h1>

            <p className="mt-10 text-center text-white">
                Regresar al
                <Link to={"/"} className="text-fuchsia-500"> proyectos </Link>
            </p>

        </>
    )
};

export default NotFound;
