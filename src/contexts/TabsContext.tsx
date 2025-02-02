import { createContext, useContext, useState, ReactNode } from "react";

type TabsType = "Común" | "Infinia";
//TODO: agregar comentarios explicando el context

interface TabsContextProps {
    currentTab: TabsType;
    setCurrentTab: (tab: TabsType) => void;
  }

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

export function TabsProvider({ children }: { children: ReactNode }) {
    const [currentTab, setCurrentTab] = useState<TabsType>("Común");
  
    return (
      <TabsContext.Provider value={{ currentTab, setCurrentTab }}>
        {children}
      </TabsContext.Provider>
    );
  }

  // eslint-disable-next-line react-refresh/only-export-components
  export function useTabs() {
    const context = useContext(TabsContext);
    if (!context) {
      throw new Error("useTabs debe usarse dentro de un TabsProvider");
    }
    return context;
  }