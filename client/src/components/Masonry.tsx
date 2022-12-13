import { useContext } from "react"
import { AppContext } from "../App"


const Masonry = () => {
    const { setDeleteModal, deleteModal } = useContext(AppContext)

    const handleClick = () => {
        setDeleteModal(!deleteModal)
        console.log(deleteModal)
    }

    const imgLinks = [
        { label: "Image label", link: "https://source.unsplash.com/random/1" },
        { label: "Image label", link: "https://source.unsplash.com/random/2" },
        { label: "Image label", link: "https://source.unsplash.com/random/3" },
        { label: "Image label", link: "https://source.unsplash.com/random/4" },
        { label: "Image label", link: "https://source.unsplash.com/random/5" },
        { label: "Image label", link: "https://source.unsplash.com/random/6" },
        { label: "Image label", link: "https://source.unsplash.com/random/7" },
        { label: "Image label", link: "https://source.unsplash.com/random/8" },
        { label: "Image label", link: "https://source.unsplash.com/random/9" },
        { label: "Image label", link: "https://source.unsplash.com/random/10" },
    ]

    return (
        <div className="grid-container px-20">
            {imgLinks.map((img) => (
                <figure className="hover-img">
                    <img src={img.link} alt="Image" />
                    <figcaption className="py-4 px-5">
                        <button
                            onClick={handleClick}
                            className="ml-auto border border-red-500 text-red-500 rounded-3xl px-4 py-1 text-sm font-semibold">delete</button>
                        <p className="mt-auto font-bold">{img.label}</p>
                    </figcaption>
                </figure>
            ))}
        </div>

    )
}
export default Masonry