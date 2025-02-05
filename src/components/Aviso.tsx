import { useAuth } from "../contexts/authContext"

interface props {
    title: string
    body: string
    publicDate: string
    onDelete: (publicDate: string, title:string, body:string) => void
}

function Aviso({ title, body, publicDate,  onDelete }: props) {

    const { isAuthenticated } = useAuth()

    return (
        <article className="w-full bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-lg shadow-md p-4 space-y-2 max-w-3xl mx-auto">
            <h2 className="text-xl font-serif font-semibold text-gray-900 dark:text-white">
                {title}
            </h2>
            <p className="font-sans text-gray-800 dark:text-gray-300">
                {body}
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                {publicDate}
            </div>
            {
                isAuthenticated &&
                <button
                    className="text-red-500 hover:text-red-700 text-sm"
                    onClick={()=>onDelete(publicDate, title, body)}
                >
                    Eliminar
                </button>}
        </article>
    );
}

export default Aviso;
