import { TurnoType } from "../types/turnoType"
import DeleteButton from "./DeleteButton"
import DropdownStatus from "./DropdownStatus"

interface Props {
    nroEquipo: number
    index: number
    estado: string
    equipo: TurnoType
    colorBg: string | undefined
    isAuthenticated: boolean
    turnosList: TurnoType[]
}

function BodyTable({ isAuthenticated, nroEquipo, index, estado, equipo, colorBg, turnosList }: Props) {
    return (
        <tr key={nroEquipo} className="odd:bg-white even:bg-gray-200 dark:odd:bg-neutral-900 dark:even:bg-neutral-800 text-center ">
            <td className="whitespace-nowrap  font-medium text-gray-800 dark:text-neutral-200">{index}</td>
            <td className=" py-3 whitespace-nowrap text-sm  text-gray-800 dark:text-neutral-200">{nroEquipo}</td>
            <td className=" py-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                {
                    isAuthenticated
                        ? <DropdownStatus currentStatus={estado} equipo={equipo} turnosList={turnosList} />
                        : <span className={`${colorBg} px-2 py-1 rounded-lg inline-block w-20`}>{estado} </span>
                }
            </td>
            {
                isAuthenticated
                    ? <td className="py-3 whitespace-nowrap text-sm text-white">
                        <DeleteButton equipo={equipo} turnosList={turnosList} />
                    </td>
                    : null
            }
        </tr>
    )
}
export default BodyTable