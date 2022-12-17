import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import axios from "axios"
import DeleteButton from "./DeleteButton"
import Loading from "./Loading"

type ImageResult = {
    _id: string,
    link: string,
    label: string
}
const Masonry = () => {
    const [homePageLoader, setHomePageLoader] = useState<boolean>(false)
    const {
        setDeleteModal,
        deleteModal,
        images,
        setImages,
        noImagesFound,
        searchBox
    } = useContext(AppContext)

    const handleClick = () => {
        setDeleteModal(!deleteModal)
    }

    const fetchImages = async () => {

        const apiLink = '/api'

        const response = await axios.get(apiLink)
            .then((resp) => {
                // reversing the array so the last pops first
                setImages(resp.data.reverse())
                setHomePageLoader(false)
            })
            .catch((err) => {
                // remove loading screen
                setHomePageLoader(false)
                console.log(err.response.data)
            })
    }

    useEffect(() => {
        setHomePageLoader(true)
        fetchImages()
        console.log(noImagesFound)

    }, [])

    return (
        <div>
            {homePageLoader &&
                <div className="mt-52">
                    <Loading />
                </div>}
            {
                noImagesFound && <div className="flex justify-center items-center h-[70vh]">
                    <p className="text-2xl">No images found with the label: {searchBox}</p>

                </div>
            }
            {!homePageLoader && !noImagesFound && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[280px] px-5 sm:px-20 gap-10">
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
            </div>}
        </div>

    )
}
export default Masonry