import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useTabs } from "../contexts/TabsContext";


function DeleteAllButon() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { currentTab } = useTabs()

    const currentList = currentTab === "Común" ? "comunList" : "infiniaList"

    const deleteHandler = async () => {
        try {
            await setDoc(doc(db, currentList, currentList), {
                turnos: []
            });
        } catch (error) {
            console.error(":(", error);
        }
        setIsDialogOpen(false); // Cierra el diálogo después de borrar
    };

    return (
        <div className="flex items-center justify-end me-4 sm:me-7 md:me-6 lg:me-7 xl:me-9 2xl:me-12">
            {/* Botón de eliminar */}
            <button
                onClick={() => setIsDialogOpen(true)}
                className="bg-blue-900 active:bg-blue-950 rounded shadow-lg px-2 py-1 mt-4  text-sm"
            >
                Vaciar lista
            </button>

            {/* Diálogo de confirmación */}
            {isDialogOpen && (
                <div className="fixed z-20 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <p className="text-gray-900">¿Seguro que quiere vaciar la lista?</p>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button
                                onClick={() => setIsDialogOpen(false)}
                                className="bg-gray-400 px-3 py-1 rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={deleteHandler}
                                className="bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeleteAllButon;
