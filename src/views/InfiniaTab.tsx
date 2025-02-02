import FuelTankBar from "../components/FuelTankBar";
import Turno from "../components/Turno";
import { useFuel } from "../contexts/FuelContext";

function InfiniaTab() {
    
    const { infiniaTank, ureaTank } = useFuel()

    return (
        <div className="space-y-2" >
            <FuelTankBar
                key={infiniaTank.currentLts}
                currentLiters={infiniaTank.currentLts}
                maxLiters={80000}
                lastUpdate={infiniaTank.lastUpdate}
                fuelTank={`Infinia disponible`} />
            <FuelTankBar
                key={ureaTank.currentLts}
                currentLiters={ureaTank.currentLts}
                maxLiters={15000}
                lastUpdate={ureaTank.lastUpdate}
                fuelTank={`Urea disponible`} />
            <Turno />
        </div>
    )
}
export default InfiniaTab