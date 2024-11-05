import { useContext, useState } from "react";
import { ChatbotContext } from "@/context";
import { useNavigate } from "react-router-dom";
import { ReadLogin } from "@/services/admin.routes";

const Login = () => {
    const { setLogin } = useContext(ChatbotContext);

    // Crear estados para email y password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    // Función asincrónica para manejar el submit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        try {
            const response = await ReadLogin({ email, password });

            if (response.status) {
                navigate("/");
                setLogin(true);
            } else {
                setErrorMessage("Usuario o contraseña incorrectos");
            }
        } catch (error) {
            setErrorMessage("Error en el inicio de sesión, intente nuevamente");
            console.log(error)
        }
    };

    return (
        <div className="w-full flex flex-row justify-center items-center h-screen bg-gray-300">
            <div className="w-fit border rounded-lg p-4 bg-white">
                <h1 className="mb-4 mt-4 text-center">Login</h1>
                {errorMessage && (
                    <div className="error-message text-danger border p-1">
                        {errorMessage}
                    </div>
                )}
                <form >
                    <div className="mb-3 flex justify-between">
                        <label htmlFor="email" className="mr-2">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="pl-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 flex justify-between">
                        <label htmlFor="password" className="mr-2">
                            Password
                        </label>
                        <input
                            type="password"
                            className="pl-1"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-evenly mt-4">
                        <button
                            type="button"
                            className="bg-blue-500 px-1 rounded-sm text-white"
                            onClick={handleSubmit}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;