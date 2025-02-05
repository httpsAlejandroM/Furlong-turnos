import { AvisoType } from "../types/avisosType"

const addNewAviso = (avisosList: AvisoType[], newAviso: AvisoType) => {

    if(avisosList.length >= 10){
        avisosList.pop()
    }
    return [newAviso, ...avisosList]
}

export {
    addNewAviso
}