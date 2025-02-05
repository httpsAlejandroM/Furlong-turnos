import { useState } from "react"
import { AvisoType } from "../types/avisosType"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"
import { hourAndMinutes } from "../utils/dateHelper"
import { addNewAviso } from "../utils/avisosUtils"

interface props {
    avisoList: AvisoType[]
}

function AddAviso({ avisoList }: props) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newTitle, setNewTitle] = useState("")
    const [newBody, setNewBody] = useState("")

    const addAviso = async () => {
        const newAviso = {
            title: newTitle,
            body: newBody,
            publicDate: `${new Date().toLocaleDateString()} ${hourAndMinutes()}`,
        }
        
        try {
            await setDoc(doc(db, "avisosList", "avisosList"),{
                avisos: addNewAviso(avisoList, newAviso)
            })
            setIsModalOpen(false)  // Cerrar el modal después de agregar el aviso
            setNewTitle("")
            setNewBody("")
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <>
            <button 
            onClick={() => setIsModalOpen(true)}
            className="text-white bg-blue-900 active:bg-blue-950 rounded shadow-lg px-2 py-1 mt-4  text-sm">
                Agregar Aviso
            </button>
            {
                isModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-20">
                        <div className="bg-white rounded-lg p-6 w-10/12">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título:</label>
                            <input
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                            />

                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cuerpo:</label>
                            <textarea
                                value={newBody}
                                onChange={(e) => setNewBody(e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                            />

                            <div className="flex justify-end">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={addAviso}
                                    className="text-white bg-blue-900 active:bg-blue-950 px-4 py-2 rounded-md "
                                >
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
export default AddAviso