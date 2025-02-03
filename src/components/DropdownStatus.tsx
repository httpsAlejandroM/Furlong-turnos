import { useState, useRef, useEffect } from "react";
import { StatusType, TurnoType } from "../types/turnoType";
import { updateStatus } from "../utils/turnosListUtils";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useTabs } from "../contexts/TabsContext";

interface Props {
  currentStatus: string;
  equipo: TurnoType
  turnosList: TurnoType[]
  
}

function DropdownStatus({ currentStatus, turnosList, equipo }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const dropdownRef = useRef<HTMLDivElement>(null);
const { currentTab } = useTabs()

    const currentList = currentTab === "Común" ? "comunList" : "infiniaList"

  const options: StatusType[] = ["Cargó", "Ausente", "Esperando"];

  const bgStatus = (status: string) => {
    switch (status) {
      case "Cargó":
        return "bg-green-300 text-green-900";
      case "Ausente":
        return "bg-red-300 text-red-900";
      case "Esperando":
        return "bg-yellow-300 text-yellow-900";
      default:
        break;
    }
  }

  // Manejar clics fuera del dropdown para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Manejar selección de opciones
  const handleSelect = async (status: string) => {
    setSelectedStatus(status);
    setIsOpen(false);

    const updatedStatus = updateStatus(turnosList, equipo, status)
    try {
      await setDoc(doc(db, currentList, currentList), {
        turnos: updatedStatus
      })
    } catch (error) {
      console.error(":(", error)
    }
  };

  return (
    <div className="relative inline-block w-24" ref={dropdownRef}>

      <div
        className={`${bgStatus(selectedStatus)} pl-2 py-1 rounded-lg cursor-pointer flex items-center justify-between`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedStatus}
        <span className={`me-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>{`\u2B9F`}</span>
      </div>

      {isOpen && (
        <ul className="text-start absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              className={`px-2 py-1 hover:bg-gray-200 cursor-pointer rounded-lg ${selectedStatus === option ? "hover:bg-white text-slate-400 cursor-default rounded-none" : ""
                }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownStatus;
