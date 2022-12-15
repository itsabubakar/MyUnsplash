import { useContext } from "react"
import { AppContext } from "../App"

const DeleteModal = () => {
    const { deleteModal, setDeleteModal } = useContext(AppContext)

    const handleClick = (): void => {
        setDeleteModal(!deleteModal)
    }
    return (
        <div className={`${deleteModal ? 'absolute bg-[#00000085] w-full h-full grid justify-center z-10' : 'hidden'}`}>
            <div className="mt-52 bg-white h-[180px] py-5 px-6 rounded-md w-[400px]">
                <h2 className="font-semibold">Are you sure?</h2>
                <form className="my-2">
                    <label htmlFor="delete">
                        <p className="text-sm text-gray-700 mb-2">Enter the label to delete</p>
                        <input className="rounded-md  px-3 py-2  text-sm border border-gray-600 w-full" type="text" id="delete" placeholder="image label" />
                    </label>
                </form>
                <div className="flex gap-x-4 mt-3">
                    <button
                        className="ml-auto text-sm text-gray-400 hover:text-red-500"
                        onClick={handleClick}
                    >Cancel</button>
                    <button
                        className="bg-red-500 hover:bg-gray-500 text-sm text-white py-2 px-3 rounded-md"
                        onClick={handleClick}
                    >Submit</button>
                </div>
            </div>
        </div>
    )
}
export default DeleteModal