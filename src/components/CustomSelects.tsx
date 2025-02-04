
interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    newEstado: string;
    setNewEstado: (estado: string) => void;
}

function CustomSelects({ newEstado, setNewEstado, ...rest }: Props) {

    return (
        <select
        
        value={newEstado}
        onChange={(e) => setNewEstado(e.target.value)}
        className={ rest.className ? rest.className : "px-2 py-1 rounded-lg mr-2 text-gray-900 w-28 "}
      >
        <option className="active:bg-red-600" disabled={newEstado === "Esperando"} value="Esperando">Esperando</option>
        <option disabled={newEstado === "Cargando"} value="Cargando">Cargando</option>
        <option disabled={newEstado === "Cargó"} value="Cargó">Cargó</option>
        <option disabled={newEstado === "Ausente"} value="Ausente">Ausente</option>
      </select>
    );
}

export default CustomSelects;
