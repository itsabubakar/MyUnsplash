import { useContext } from "react"
import { AppContext } from "../App"

const AddPhotoModal = () => {
    const { addPhotoModal, setAddPhotoModal } = useContext(AppContext)

    const handleClick = (): void => {
        setAddPhotoModal(!addPhotoModal)
    }
    return (
        <div className={`${addPhotoModal ? 'absolute z-10 bg-gray-400 w-full h-full grid justify-center' : 'hidden'}`}>
            <div className="mt-52">
                <h2>Modal</h2>
                <button
                    onClick={handleClick}
                >Close Modal</button>
            </div>
        </div>
    )
}
export default AddPhotoModal