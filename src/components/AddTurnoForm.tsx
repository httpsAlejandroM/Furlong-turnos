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
        <div className="w-full mb-4 px-1 flex items-center gap-2 overflow-hidden">

    <input
        type="number"
        placeholder="Equipo"
        value={newEquipo}
        onKeyDown={(e) => {
            if (["e", "E", "+", "-"].includes(e.key)) {
                e.preventDefault();
            }
        }}
        onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,4}$/.test(value)) {
                setNewEquipo(value);
            }
        }}
        className="px-2 py-1 rounded text-gray-900 w-20 flex-shrink"
    />

    <div className="flex-shrink">
        <CustomSelects newEstado={newEstado} setNewEstado={setNewEstado} />
    </div>

    <button
        disabled={newEquipo === ""}
        onClick={handleAddEquipo}
        className="px-2 py-1 bg-blue-900 text-white rounded flex-shrink whitespace-nowrap disabled:bg-blue-950 disabled:text-gray-400"
    >
        Agregar Equipo
    </button>

</div>

    )
}
export default AddTurnoForm
