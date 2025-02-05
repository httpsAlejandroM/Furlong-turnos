import NavBar from "../components/NavBar"
import ComúnTab from "./ComúnTab"
import InfiniaTab from "./InfiniaTab"
import { useTabs } from "../contexts/TabsContext"
import AvisosTab from "./AvisosTab"

function HomePage() {
  const { currentTab } = useTabs()

  const currentGasoil = {
    "Común": <ComúnTab />,
    "Infinia": <InfiniaTab/>,
    "Avisos": <AvisosTab/>
  }

  return (
    <div className="w-full md:w-3/5 mx-auto">
      <NavBar />
      {currentGasoil[currentTab]}
    </div>
  )
}
export default HomePage