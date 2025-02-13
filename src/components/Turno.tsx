import { useEffect, useState } from "react";
import AddTurnoForm from "./AddTurnoForm";
import { TurnoType } from "../types/turnoType";
import { useAuth } from "../contexts/authContext";
import TablaTurnos from "./TablaTurnos";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import DeleteAllButon from "./DeleteAllButton";
import { useTabs } from "../contexts/TabsContext";

function Turno() {

    const { isAuthenticated } = useAuth()
    const { currentTab } = useTabs()

    const currentList = currentTab === "Común" ? "comunList" : "infiniaList"

    const [turnosList, setTurnosList] = useState<TurnoType[]>([])

    const dateOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };
    
    const fecha = new Date().toLocaleString("es-Es", dateOptions)

    //me suscribo a los cambios en la colección turnos y actualizo el estado en tiempo real
    useEffect(() => {
        const docRef = doc(db, currentList, currentList);
        // Suscribirse a cambios en tiempo real
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                
                setTurnosList(data.turnos || []); // Actualizar estado con el array
            } else {
                console.log("Documento no encontrado");
            }
        });

        // Cleanup: cancelar la suscripción cuando el componente se desmonte
        return () => unsubscribe();
    }, [currentList]);


    return (
        <div className="text-white">
            <h2 className="ps-2 py-2 text-xl">{fecha}</h2>
            {
                isAuthenticated && <AddTurnoForm turnosList={turnosList} />
            }
            <TablaTurnos turnosList={turnosList} setTurnosList={setTurnosList}/>
           {
            isAuthenticated &&  <DeleteAllButon/>
           }
        </div>
    )
}
export default Turno