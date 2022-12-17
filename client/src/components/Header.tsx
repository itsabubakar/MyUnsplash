import { AiOutlineSearch } from 'react-icons/ai'
import { AppContext } from '../App'
import { useContext } from 'react'
import Button from './Button'
import axios from 'axios'

const Header = () => {
    const {
        searchBox,
        setSearchBox,
        setImages,
        setLoading,
        setNoImagesFound
    } = useContext(AppContext)

    const handleChange = (e: any) => {
        setNoImagesFound(false)
        setSearchBox(e.target.value)
    }

    const searchImage = async () => {
        const apiLink = '/api/search'
        const response = await axios.post(apiLink, { searchItem: searchBox })
            .then((resp) => {
                setLoading(false)
                setImages(resp.data)

            })
            .catch((err) => {
                console.log(err.response.data)
                setLoading(false)
                setNoImagesFound(true)
            })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(searchBox)
        setLoading(true)
        searchImage()
    }
    return (
        <div className="flex flex-col gap-y-3 sm:flex-row px-5 sm:px-20 pt-5 pb-10 gap-x-10 ">
            <h2 className="text-2xl font-bold"><a href="/">My Unsplash</a></h2>
            <div>
                <form
                    onSubmit={handleSubmit}
                    className='flex items-center border-2 rounded-lg outline-none hover:ring-1 hover:ring-gray-300 py-2 px-3'>
                    <input
                        type="text"
                        placeholder="Search by label"
                        className="outline-none"
                        value={searchBox}
                        onChange={handleChange}
                    />
                    <button type='submit'><AiOutlineSearch size={20} className="text-gray-400 mr-2" /></button>
                </form>
            </div>
            <div className='sm:ml-auto'>
                <Button
                    text={"Add a photo"}
                    bg={"bg-green-500"}
                />
            </div>

        </div>
    )
}
export default Header