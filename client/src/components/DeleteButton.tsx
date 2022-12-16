import { useContext } from "react"
import { AppContext } from "../App"

type Button = {
    id: string
}

const DeleteButton = ({ id }: Button) => {
    const {
        deleteModal,
        setDeleteModal,
        deleteId,
        setDeleteId
    } = useContext(AppContext)

    const handleClick = () => {
        setDeleteModal(!deleteModal)
        setDeleteId(id)
    }
    return (
        <button
            onClick={handleClick}
            className="ml-auto border border-red-500 text-red-500 rounded-3xl px-4 py-1 text-sm font-semibold">delete</button>
    )
}
export default DeleteButton