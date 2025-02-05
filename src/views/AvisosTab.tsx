import { useEffect, useState } from "react"
import Aviso from "../components/Aviso"
import { AvisoType } from "../types/avisosType"
import { useAuth } from "../contexts/authContext"
import AddAviso from "../components/AddAviso"
import { doc, onSnapshot, setDoc } from "firebase/firestore"
import { db } from "../firebase"

function AvisosTab() {
    const { isAuthenticated } = useAuth()

    const [avisoList, setAvisoList] = useState<AvisoType[]>([])

    const handleDeleteAviso = async (publicDate: string, title:string, body:string) => {
        const newAvisoList = avisoList.filter(aviso => `${aviso.title} ${aviso.body} ${aviso.publicDate}` !== `${title} ${body} ${publicDate}`);

        try {
            await setDoc(doc(db, "avisosList", "avisosList"), {
                avisos: newAvisoList
            })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const unsubAvisos = onSnapshot(doc(db, "avisosList", "avisosList"), (docSnap) => {
            if (docSnap.exists()) {
                setAvisoList(docSnap.data().avisos)
            }
        })

        return () => unsubAvisos();
    }, [])

    return (
        <section className="bg-white rounded mt-1 p-5 mx-auto w-11/12 flex flex-col items-end gap-3">
            {
                avisoList && avisoList.map((aviso, index) => {
                    return (
                        <Aviso
                            key={`${aviso.title} ${aviso.publicDate} ${index}`}
                            title={aviso.title}
                            body={aviso.body}
                            publicDate={aviso.publicDate}
                            onDelete={handleDeleteAviso}
                        />
                    )
                })
            }
            {isAuthenticated && <AddAviso avisoList={avisoList} />}
        </section>
    )
}
export default AvisosTab