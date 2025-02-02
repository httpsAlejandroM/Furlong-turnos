import { createContext, useContext, useState, ReactNode } from "react";

// 1. Definir el tipo de datos que manejará el contexto.
// En este caso, es un tipo con un valor de estado y una función para actualizarlo.
type StateType = "Valor1" | "Valor2";

// 2. Crear una interfaz que defina la estructura del contexto.
// Esta interfaz especifica qué valores y funciones estarán disponibles para los componentes que consuman el contexto.
interface ContextProps {
    state: StateType; // Estado actual
    setState: (value: StateType) => void; // Función para actualizar el estado
}

// 3. Crear el contexto con un valor inicial indefinido.
// Se usa `undefined` porque el contexto solo debe ser utilizado dentro de un proveedor.
const MyContext = createContext<ContextProps | undefined>(undefined);

// 4. Crear un proveedor que gestionará el estado y permitirá que los componentes hijos accedan al contexto.
export function MyProvider({ children }: { children: ReactNode }) {
    // 5. Crear el estado que se compartirá a través del contexto.
    const [state, setState] = useState<StateType>("Valor1");

    return (
        // 6. Proveer el estado y la función para modificarlo a los componentes hijos.
        <MyContext.Provider value={{ state, setState }}>
            {children}
        </MyContext.Provider>
    );
}

// 7. Crear un hook personalizado para acceder fácilmente al contexto en cualquier componente.
// eslint-disable-next-line react-refresh/only-export-components
export function useMyContext() {
    // 8. Obtener el contexto con `useContext`.
    const context = useContext(MyContext);

    // 9. Si el contexto no está disponible, significa que el componente que intenta usarlo
    // no está dentro de un proveedor. Se lanza un error para evitar fallos.
    if (!context) {
        throw new Error("useMyContext debe usarse dentro de un MyProvider");
    }

    // 10. Retornar el contexto para que los componentes puedan acceder al estado y modificarlo.
    return context;
}
