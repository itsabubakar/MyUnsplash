import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import axios from "axios"
import DeleteButton from "./DeleteButton"

type ImageResult = {
    _id: string,
    link: string,
    label: string
}
const Masonry = () => {
    const {
        setDeleteModal,
        deleteModal,
        images,
        setImages
    } = useContext(AppContext)

    const handleClick = () => {
        setDeleteModal(!deleteModal)
    }

    const fetchImages = async () => {

        const apiLink = 'http://localhost:8080/api'

        const response = await axios.get(apiLink)
            .then((resp) => {
                // reversing the array so the last pops first
                setImages(resp.data.reverse())
            })
            .catch((err) => {
                // remove loading screen
                console.log(err.response.data)
            })
    }

    useEffect(() => {
        fetchImages()
    }, [])

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 auto-rows-[280px] px-20 gap-10">
            {
                images.map((img: ImageResult) => (
                    <figure className="hover-img" key={img._id}>
                        <img className="red-b" src={img.link} alt={img.label} />
                        <figcaption className="py-4 px-5">
                            <DeleteButton
                                id={img._id}
                            />
                            <p className="mt-auto font-bold">{img.label}</p>
                        </figcaption>
                    </figure>
                ))
            }
        </div>

    )
}
export default Masonry