import { TurnoType } from "../types/turnoType"

const pushTurno = (turnoList: TurnoType[], equipo: TurnoType) => {
    const alreadyExistEquipo = turnoList.find((turno) => turno.equipo === equipo.equipo)
    if (alreadyExistEquipo) {
        return turnoList
    } else {
        return [...turnoList, equipo]
    }
}

const deleteTurno = (turnoList: TurnoType[], equipo: TurnoType) => {
    const filteredList = turnoList.filter((turno) => turno.equipo !== equipo.equipo)

    return filteredList
}

const updateStatus = (turnoList: TurnoType[], equipo: TurnoType, newStatus: string) => {    
    const updatedList = turnoList.map((turno) => {
        if (turno.equipo !== equipo.equipo) return turno
        else return {...equipo, estado: newStatus}
    })    
    return updatedList
}

export {
    pushTurno,
    deleteTurno,
    updateStatus
}