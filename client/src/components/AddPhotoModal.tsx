import { useContext, useState } from "react"
import { AppContext } from "../App"
import axios from "axios"
import Loading from "./Loading"

const AddPhotoModal = () => {
    const {
        addPhotoModal,
        setAddPhotoModal,
        loading,
        setLoading,
        fetchImages
    } = useContext(AppContext)
    const [label, setLabel] = useState<string>('')
    const [url, setUrl] = useState<string>('')

    // Form error handling states
    const [labelError, setLabelError] = useState(false)
    const [urlError, setUrlError] = useState(false)
    const [fromUnsplash, setFromUnsplash] = useState(false)

    // closes modal
    const handleClick = (): void => {
        setAddPhotoModal(!addPhotoModal)
    }

    // sets label state
    const handleLabelChange = (e: any) => {
        const value = e.target.value
        setLabel(value)
    }

    // sets url state
    const handleUrlChange = (e: any) => {
        let urlStr = e.target.value.trim()
        setUrl(urlStr)
    }

    // check link passes
    const linkFromUnsplash = () => {

        const unsplashLink = "https://images.unsplash.com"

        const link = url.slice(0, 27)

        if (link === unsplashLink) {
            console.log('comparison happening')
        } else {
            console.log('Not what ai want')
            setFromUnsplash(true)
            let timer = setTimeout(() => {
                setFromUnsplash(false)
            }, 1500);

            return () => clearTimeout(timer)
        }
    }

    // post data to db
    const postData = async () => {
        const link = url
        const apiLink = '/api'
        const data = {
            label, link
        }

        // show loading screen
        setLoading(true)
        console.log(loading)
        const response = await axios.post(apiLink, data)
            .then((resp) => {
                // remove loading screen
                setLoading(false)
                setAddPhotoModal(false)
                fetchImages()
                console.log(resp.data)
            })
            .catch((err) => {
                // remove loading screen
                setLoading(false)
                setAddPhotoModal(false)
                console.log(err.response.data)
            })
    }

    // handles form submission
    const handleSubmit = (e: any) => {
        e.preventDefault()


        if (!label) {
            setLabelError(true)
            let timer = setTimeout(() => {
                setLabelError(false)
            }, 1500);
        }

        if (!url) {
            setUrlError(true)
            let timer = setTimeout(() => {
                setUrlError(false)
            }, 1500);
        }

        if (url) {
            linkFromUnsplash()
        }

        // Post the link and label to the db
        if (url && label) {
            postData()
            setUrl('')
            setLabel('')
        }


    }
    return (
        <div className={`${addPhotoModal ? 'absolute z-10 bg-[#00000085] w-full min-h-screen h-full grid justify-center' : 'hidden'}`}>
            <div className="mt-48 bg-white h-[310px] py-5 px-6 rounded-md w-[400px]">
                {loading && <Loading />}

                {!loading && <div>
                    <h2 className="font-semibold">Add a new photo</h2>
                    <form className="flex flex-col gap-y-3 my-5 w-full" onSubmit={handleSubmit}>
                        <label htmlFor="label">
                            <p className="text-gray-700 mb-2 text-sm">Label</p>
                            <input
                                value={label}
                                onChange={handleLabelChange}
                                className={`border rounded-md  px-3 py-3  text-sm border-gray-600 w-full outline-none ${labelError ? 'ring-2 ring-red-600 border-white' : 'ring-0'}`} type="text" id="label" placeholder="Awesome title" />
                        </label>
                        <label htmlFor="url">
                            <p className="text-gray-700 text-sm">Photo URL</p>
                            <p className={`${fromUnsplash ? 'text-sm text-red-600' : 'hidden'}`}>Image url must be from https://images.unsplash.com</p>
                            <input
                                onChange={handleUrlChange}
                                value={url}
                                className={`mt-2 border rounded-md  px-3 py-3  text-sm border-gray-600 w-full outline-none ${urlError ? 'ring-2 ring-red-600 border-white' : 'ring-0'}`} type="text" id="url" placeholder="https://images.unsplash.com/photo-1671017614105-d3273404f9ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60" />
                        </label>
                        <div className="flex gap-x-4">
                            <button
                                className="ml-auto hover:text-red-500 text-gray-400"
                                onClick={handleClick}
                            >Cancel</button>
                            <button
                                className="bg-green-500 hover:bg-slate-500 text-white py-2 px-4 rounded-md"
                                type="submit"
                            >Submit</button>
                        </div>
                    </form>
                </div>}
            </div>
        </div>
    )
}
export default AddPhotoModal