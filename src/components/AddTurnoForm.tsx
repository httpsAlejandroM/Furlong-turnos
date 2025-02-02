import { useState } from "react";
import CustomSelects from "./CustomSelects";
import { TurnoType } from "../types/turnoType";
import { pushTurno } from "../utils/turnosListUtils";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useTabs } from "../contexts/TabsContext";

interface props {
    turnosList: TurnoType[]
}


function AddTurnoForm({ turnosList }: props) {

    const [newEquipo, setNewEquipo] = useState('');
    const [newEstado, setNewEstado] = useState('Esperando')
    const { currentTab } = useTabs()

    const currentList = currentTab === "Común" ? "comunList" : "infiniaList"

    const handleAddEquipo = async () => {
        const addEquipo = { equipo: Number(newEquipo), estado: newEstado }

        const turnos = pushTurno(turnosList, addEquipo)

        try {
            await setDoc(doc(db, currentList, currentList), {
                turnos
            });
            setNewEquipo('');
            setNewEstado('Esperando');
        } catch (error) {
            console.error("Error al agregar equipo a Firestore:", error);
        }
    };

    return (
        <div className="w-full mb-4 px-1">
            <input
                type="number"
                placeholder="Equipo"
                value={newEquipo}
                onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                        e.preventDefault(); // Evita que el usuario escriba estas teclas
                    }
                }}
                onChange={(e) => {
                    const value = e.target.value;

                    // Permitir solo valores numéricos y limitar a 4 dígitos
                    if (/^\d{0,4}$/.test(value)) {
                        setNewEquipo(value);
                    }
                }}
                className="px-2 py-1 rounded mr-2 text-gray-900 w-28"
            />
            <CustomSelects newEstado={newEstado} setNewEstado={setNewEstado} />
            <button
                disabled={newEquipo === ""}
                onClick={handleAddEquipo}
                className="px-2 py-1 bg-blue-900 text-white rounded w-auto disabled:bg-blue-950 disabled:text-gray-400"
            >
                Agregar Equipo
            </button>
        </div>
    )
}
export default AddTurnoForm