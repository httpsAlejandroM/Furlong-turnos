import { useState } from "react";
import { hourAndMinutes } from "../utils/dateHelper";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { pathByLiters } from "../utils/formatLiters";

interface props {
    currentLiters: number;
    maxLiters: number;
    closeDialog: VoidFunction
    setPercentage: (percentage: number) => void
}

function EditFuelModal({ currentLiters, maxLiters, closeDialog, setPercentage }: props) {

    const [currentLts, setCurrentLts] = useState<string>(currentLiters.toString());

    const handleSaveChanges = async () => {
        setPercentage((Number(currentLts) / maxLiters) * 100);
        closeDialog()
        //Devuelve un path del tanque correspondiente segun su capacidad maxima
        const pathTank = pathByLiters(maxLiters)

        try {
            await setDoc(doc(db, pathTank, pathTank),{
                currentLts: Number(currentLts),
                lastUpdate: hourAndMinutes() 
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg w-80">
                <h2 className="text-lg font-bold mb-4">Editar capacidad del tanque</h2>
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Litros actuales</label>
                    <input
                        type="number"
                        className="border border-gray-300 rounded p-1 w-full"
                        value={currentLts}
                        onKeyDown={(e) => {
                            if (["e", "E", "+", "-"].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => setCurrentLts(e.target.value)}
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                        onClick={closeDialog}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={handleSaveChanges}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    )
}
export default EditFuelModal