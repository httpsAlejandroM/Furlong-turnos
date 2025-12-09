import { useAuth } from "../contexts/authContext";
import { TurnoType } from "../types/turnoType";
import BodyTable from "./BodyTable";
import EmptyColumns from "./EmptyColumns";

interface props {
    turnosList: TurnoType[]
    setTurnosList: (turnosList: TurnoType[]) => void
}

function TablaTurnos({ turnosList }: props) {

    const { isAuthenticated } = useAuth()

    const headerTable = isAuthenticated ? ["Turno", "Equipo", "Estado", "Acciones"] : ["Turno", "Equipo", "Estado"]

    const bgStatus = (status: string) => {
        switch (status) {
            case "Cargó":
                return "bg-green-300 text-green-900";
                case "Cargando":
                    return "bg-blue-300 text-blue-900";
            case "Ausente":
                return "bg-red-300 text-red-900";
            case "Esperando":
                return "bg-yellow-300 text-yellow-900";
            case "Prioridad":
                return "bg-purple-300 text-purple-900";
            default:
                break;
        }
    }

    return (
        <table className="w-11/12 mx-auto divide-y divide-gray-200 dark:divide-neutral-700">
            <thead className="">
                <tr className="">
                    {
                        headerTable.map((head) => {
                            return (
                                <th
                                    key={head}
                                    scope="col"
                                    className={` py-2 text-center text-xs font-medium text-gray-200 uppercase dark:text-neutral-500`}>{head}</th>
                            )
                        })
                    }
                </tr>
            </thead>

            <tbody className="">
                {
                    turnosList.length > 0
                        ? turnosList.map((turno, index) => {
                            const colorBg = bgStatus(turno.estado)
                            return (
                                <BodyTable
                                    key={turno.equipo}
                                    isAuthenticated={isAuthenticated}
                                    index={index + 1}
                                    equipo={turno}
                                    estado={turno.estado}
                                    nroEquipo={turno.equipo}
                                    turnosList={turnosList}
                                    colorBg={colorBg}
                                />


                            )
                        })
                        : <EmptyColumns isAuhtenticated={isAuthenticated} />
                }
            </tbody>

        </table>
    )
}
export default TablaTurnos
