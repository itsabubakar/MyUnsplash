import { useContext } from "react"
import { AppContext } from "../App"

const DeleteModal = () => {
    const { deleteModal, setDeleteModal } = useContext(AppContext)

    const handleClick = (): void => {
        setDeleteModal(!deleteModal)
    }
    return (
        <div className={`${deleteModal ? 'absolute bg-gray-400 w-full h-full grid justify-center z-10' : 'hidden'}`}>
            <div className="mt-52">
                <h2>Delete Modal</h2>
                <button
                    onClick={handleClick}
                >Close Modal</button>
            </div>
        </div>
    )
}
export default DeleteModal