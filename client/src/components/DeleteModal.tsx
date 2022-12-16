import { useContext } from "react"
import { AppContext } from "../App"
import axios from "axios"
import Loading from "./Loading"

const DeleteModal = () => {
    const { deleteModal, setDeleteModal, deleteId, fetchImages, loading, setLoading } = useContext(AppContext)

    const handleClick = (): void => {
        setDeleteModal(!deleteModal)
    }

    const deleteImages = async () => {

        const apiLink = 'http://localhost:8080/api'

        const response = await axios.delete(apiLink, { data: { id: deleteId } })
            .then((resp) => {
                console.log('Image deleted')
                console.log(resp.data);
                fetchImages()
                setLoading(false)
                setDeleteModal(!deleteModal)

            })
            .catch((err) => {
                // remove loading screen
                console.log(err.response.data)
            })
    }

    const handleDelete = (e: any) => {
        setLoading(true)
        deleteImages()
    }

    return (
        <div className={`${deleteModal ? 'absolute bg-[#00000085] w-full min-h-screen h-full grid justify-center  z-10' : 'hidden'}`}>
            <div className="top-[20vh] left-[25vw] fixed bg-white h-[180px] py-5 px-6 rounded-md w-[400px]">
                {loading && <Loading />}
                {!loading && <div>
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
                            onClick={handleDelete}
                        >Delete</button>
                    </div>
                </div>}

            </div>
        </div>
    )
}
export default DeleteModal