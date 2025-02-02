import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { TurnoType } from "../types/turnoType";
import { deleteTurno } from "../utils/turnosListUtils";
import { db } from "../firebase";
import { useTabs } from "../contexts/TabsContext";

interface Props {
    equipo: TurnoType;
    turnosList: TurnoType[];
}

function DeleteButton({ equipo, turnosList }: Props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { currentTab } = useTabs()

    const currentList = currentTab === "Común" ? "comunList" : "infiniaList"

    const deleteHandler = async () => {
        const deletedTurno = deleteTurno(turnosList, equipo);

        try {
            await setDoc(doc(db, currentList, currentList), {
                turnos: deletedTurno
            });
        } catch (error) {
            console.error(":(", error);
        }
        setIsDialogOpen(false); // Cierra el diálogo después de borrar
    };

    return (
        <>
            {/* Botón de eliminar */}
            <button
                onClick={() => setIsDialogOpen(true)}
                className="bg-blue-900 active:bg-blue-950 rounded shadow-lg px-2 text-sm"
            >
                X
            </button>

            {/* Diálogo de confirmación */}
            {isDialogOpen && (
                <div className="fixed z-20 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <p className="text-gray-900">¿Seguro que quieres borrar este turno?</p>
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
                                Borrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DeleteButton;
