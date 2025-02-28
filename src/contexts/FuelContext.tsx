import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

type FuelTank = {
  currentLts: number;
  lastUpdate: Date | null | string;
};

type FuelContextType = {
  comunTank: FuelTank;
  infiniaTank: FuelTank;
  ureaTank: FuelTank;
};

const FuelContext = createContext<FuelContextType | undefined>(undefined);

export function FuelProvider({ children }: { children: React.ReactNode }) {
  const [comunTank, setComunTank] = useState<FuelTank>({ currentLts: 40000, lastUpdate: "00:00" });
  const [infiniaTank, setInfiniaTank] = useState<FuelTank>({ currentLts: 80000, lastUpdate: "00:00" });
  const [ureaTank, setUreaTank] = useState<FuelTank>({ currentLts: 10000, lastUpdate: "00:00" });

  useEffect(() => {
    const unsubComun = onSnapshot(doc(db, "comunTank", "comunTank"), (docSnap) => {
      if (docSnap.exists()) {
        setComunTank(docSnap.data() as FuelTank);
      }
    });

    const unsubInfinia = onSnapshot(doc(db, "infiniaTank", "infiniaTank"), (docSnap) => {
      if (docSnap.exists()) {
        setInfiniaTank(docSnap.data() as FuelTank);
      }
    });

    const unsubUrea = onSnapshot(doc(db, "ureaTank", "ureaTank"), (docSnap) => {
      if (docSnap.exists()) {
        setUreaTank(docSnap.data() as FuelTank);
      }
    });

    return () => {
      unsubComun();
      unsubInfinia();
      unsubUrea();
    };
  }, []);

  return (
    <FuelContext.Provider value={{ comunTank, infiniaTank, ureaTank }}>
      {children}
    </FuelContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFuel() {
  const context = useContext(FuelContext);
  if (!context) throw new Error("useFuel debe usarse dentro de FuelProvider");
  return context;
}
