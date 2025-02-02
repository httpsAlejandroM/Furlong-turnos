import FuelTankBar from "../components/FuelTankBar";
import Turno from "../components/Turno";
import { useFuel } from "../contexts/FuelContext";


function ComúnTab() {

  const { comunTank } = useFuel()

  return (
    <div key={comunTank.currentLts} className="space-y-2">
      <FuelTankBar
        currentLiters={comunTank.currentLts}
        lastUpdate={comunTank.lastUpdate}
        maxLiters={40000}
        fuelTank={`Común disponible`} />
      <Turno />
    </div>
  )
}
export default ComúnTab