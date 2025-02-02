interface Props {
    isAuhtenticated: boolean
}

function EmptyColumns({ isAuhtenticated }: Props) {
    return (
        <>
            {
                isAuhtenticated
                    ? <tr className="odd:bg-white even:bg-gray-200 dark:odd:bg-neutral-900 dark:even:bg-neutral-800 text-center ">
                        <td className="whitespace-nowrap  text-center font-medium text-gray-800 dark:text-neutral-200">-</td>
                        <td className=" py-3 whitespace-nowrap text-sm text-center  text-gray-800 dark:text-neutral-200">-</td>
                        <td className=" py-3 whitespace-nowrap text-sm text-center  text-gray-800 dark:text-neutral-200">-</td>
                        <td className=" py-3 whitespace-nowrap text-sm text-center  text-gray-800 dark:text-neutral-200">-</td>
                    </tr>
                    : <tr className="odd:bg-white even:bg-gray-200 dark:odd:bg-neutral-900 dark:even:bg-neutral-800 text-center ">
                        <td className="whitespace-nowrap  text-center font-medium text-gray-800 dark:text-neutral-200">-</td>
                        <td className=" py-3 whitespace-nowrap text-sm text-center  text-gray-800 dark:text-neutral-200">-</td>
                        <td className=" py-3 whitespace-nowrap text-sm text-center  text-gray-800 dark:text-neutral-200">-</td>
                    </tr>
            }
        </>
    )
}
export default EmptyColumns