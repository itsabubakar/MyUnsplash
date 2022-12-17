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
            <div className="top-[20vh] left-[calc(50%-140px)] fixed bg-white h-[140px] py-5 px-6 rounded-md w-[300px]">
                {loading && <Loading />}
                {!loading && <div className="flex flex-col items-center">
                    <h2 className="font-semibold text-center">Are you sure?</h2>

                    <div className="flex gap-x-4 max-w-[200px] w-full  mt-4 justify-between">
                        <button
                            className="text-sm border-2 px-2 py-1 rounded-md hover:border-red-400 text-gray-400 hover:text-red-500"
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