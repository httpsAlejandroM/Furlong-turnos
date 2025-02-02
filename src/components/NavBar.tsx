import { useRef } from "react";
import LoginModal from "./LoginModal";
import { useAuth } from "../contexts/authContext";
import { useTabs } from "../contexts/TabsContext";


function NavBar() {
  const buttonNavStyles = "py-2 px-3 inline-flex items-center text-sm font-medium rounded-lg border border-transparent bg-blue-900 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none"
  // bg-gray-700 p-2 rounded-lg
  const { isAuthenticated } = useAuth();
  const { currentTab, setCurrentTab } = useTabs()

  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
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
    <header className="flex justify-between bg-black p-3">
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setCurrentTab("Común")}
          type="button"
          className={`${buttonNavStyles} ${currentTab === "Común" ? "bg-red-600" : ""}`}>
          Común
        </button>
        <button
          onClick={() => setCurrentTab("Infinia")}
          type="button"
          className={`${buttonNavStyles} ${currentTab === "Infinia" ? "bg-red-600" : ""}`}>
          Infinia
        </button>
      </div>
      <div className="">
        {
          !isAuthenticated && <button type="button" onClick={openDialog} className={`${buttonNavStyles}`}>Login</button>
        }
        <dialog
          className=""
          ref={dialogRef} >
          <LoginModal closeDialog={closeDialog} />
        </dialog>

      </div>
    </header>
  )
}
export default NavBar