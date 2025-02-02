import React, { useRef, useState } from 'react';
import EditFuelModal from './EditFuelModal';
import { conditionalLiters, formatLiters } from '../utils/formatLiters';
//import { hourAndMinutes } from '../utils/dateHelper';
import { useAuth } from '../contexts/authContext';

interface FuelTankBarProps {
  currentLiters: number;
  lastUpdate: Date | null | string
  maxLiters: number;
  fuelTank: string
}

const FuelTankBar: React.FC<FuelTankBarProps> = ({ currentLiters, maxLiters, fuelTank, lastUpdate }) => {

  const [currentsLiters] = useState<number>(currentLiters)
  const [percentage, setPercentage] = useState<number>((currentsLiters / maxLiters) * 100)

  const { isAuthenticated } = useAuth()

  const getBarColor = () => {
    if (percentage > 66) return 'bg-green-500';
    if (percentage > 33) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    if (!isAuthenticated) return
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <div className='px-2 space-y-1 '>
      <p className="text-white p-0 m-0">{`${fuelTank}`}</p>
      <div className={`h-8 border-2 border-gray-800 rounded-md overflow-hidden bg-gray-200 relative ${isAuthenticated && "cursor-pointer"}`}
        onClick={openDialog}
      >
        <div
          className={`h-full ${getBarColor()} transition-all duration-500 overflow-visible`}
          style={{ width: `${percentage}%`, maxWidth: "100%" }}
        >
          <p className={`text-center text-neutral-900 whitespace-nowrap font-semibold`}>{conditionalLiters(currentsLiters, maxLiters)}k Lts / {formatLiters(maxLiters.toString())}k Lts</p>
        </div>
      </div>
      <small className='text-slate-100 text-xs p-0 m-0'>{`Última actualización: ${lastUpdate}`}</small>
      <dialog ref={dialogRef}>
        <EditFuelModal closeDialog={closeDialog}  setPercentage={setPercentage} currentLiters={currentLiters} maxLiters={maxLiters} />
      </dialog>
    </div>

  );
};

export default FuelTankBar;
