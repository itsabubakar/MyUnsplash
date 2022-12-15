import { useContext, useState } from "react"
import { AppContext } from "../App"

type Button = {
    text: String,
    bg: String
}

type Context = {
    addPhotoModal: boolean
}



const Button = ({ text, bg }: Button) => {
    const { addPhotoModal, setAddPhotoModal } = useContext(AppContext)

    const handleClick = (): void => {
        setAddPhotoModal(!addPhotoModal)
    }
    return (
        <button
            onClick={handleClick}
            className={`${bg} text-white py-2 px-3 text-[14px] font-semibold rounded-md hover:bg-gray-400`}>{text}</button>
    )
}
export default Button