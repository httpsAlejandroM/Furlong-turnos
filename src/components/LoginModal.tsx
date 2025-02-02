import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import useForm from "../custom hooks/useForm";
import { app } from "../firebase";
import { useAuth } from "../contexts/authContext";

interface props {
    closeDialog: VoidFunction
}


function LoginModal({ closeDialog }: props) {
    const initialForm = {
        email: "",
        password: ""
    }
    const { email, password, onInputChange } = useForm(initialForm)
    const { login } = useAuth()

    const auth = getAuth(app);

    const loginHandler = () => {
        setPersistence(auth, browserLocalPersistence) // Persiste la sesión en el almacenamiento local
            .then(() => {
                signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user
                    console.log(user);
                    login(user.refreshToken)
                })
                
            })
            .catch((error) => {
                console.error("Error al iniciar sesión:", error.code, error.message);
            });

        closeDialog();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white w-11/12 max-w-md p-6 rounded-md shadow-lg">
                <button onClick={closeDialog}
                    className="absolute text-xl top-1 right-2 text-gray-600 hover:text-gray-800 focus:outline-none">
                    ✕
                </button>
                <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
                    Iniciar Sesión
                </h2>

                <input className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onInputChange}
                    type="email" />
                <input className="w-full p-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onInputChange}
                    type="password" />
                <button
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    type="button"
                    onClick={loginHandler}
                >
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
}

export default LoginModal;
