import { AiOutlineSearch } from 'react-icons/ai'
import Button from './Button'

const Header = () => {
    return (
        <div className="flex px-20 pt-5 pb-10 gap-x-10 items-center">
            <h2 className="text-2xl font-bold">My Unsplash</h2>
            <div>
                <form className='flex items-center border-2 rounded-lg outline-none hover:ring-1 hover:ring-gray-300 py-2 px-3'>
                    <AiOutlineSearch size={20} className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search by label"
                        className="outline-none"
                    />
                </form>
            </div>
            <div className='ml-auto'>
                <Button
                    text={"Add a photo"}
                    bg={"bg-green-500"}
                />
            </div>

        </div>
    )
}
export default Header