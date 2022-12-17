import { useState, createContext } from 'react'
import AddPhotoModal from './components/AddPhotoModal'
import Header from "./components/Header"
import Masonry from './components/Masonry'
import Modal from './components/Modal'
import axios from 'axios'

interface ImageData {
  _id: string;
  label: string;
  link: string;
}

type AppContext = {
  addPhotoModal: boolean,
  setAddPhotoModal: React.Dispatch<React.SetStateAction<boolean>>,
  deleteModal: boolean,
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  images: Array<ImageData>,
  setImages: React.Dispatch<React.SetStateAction<ImageData[]>>,
  fetchImages: any,
  deleteId: string,
  setDeleteId: React.Dispatch<React.SetStateAction<string>>
  searchBox: string,
  setSearchBox: React.Dispatch<React.SetStateAction<string>>,
  setNoImagesFound: React.Dispatch<React.SetStateAction<boolean>>,
  noImagesFound: boolean
}

const ContextState = {
  addPhotoModal: false,
  setAddPhotoModal: () => { },
  deleteModal: false,
  setDeleteModal: () => { },
  loading: false,
  setLoading: () => { },
  images: [],
  setImages: () => { },
  fetchImages: () => { },
  deleteId: '',
  setDeleteId: () => { },
  searchBox: '',
  setSearchBox: () => { },
  noImagesFound: false,
  setNoImagesFound: () => { },

}

export const AppContext = createContext<AppContext>(ContextState)

const App = () => {
  const [addPhotoModal, setAddPhotoModal] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [images, setImages] = useState<ImageData[]>([])
  const [deleteId, setDeleteId] = useState<string>('')
  const [searchBox, setSearchBox] = useState<string>('')
  const [noImagesFound, setNoImagesFound] = useState<boolean>(false)

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


  return (

    <AppContext.Provider
      value={{
        addPhotoModal,
        setAddPhotoModal,
        deleteModal,
        setDeleteModal,
        loading,
        setLoading,
        images,
        setImages,
        fetchImages,
        deleteId,
        setDeleteId,
        searchBox,
        setSearchBox,
        setNoImagesFound,
        noImagesFound
      }}
    >
      <div className="relative pb-10">
        <Modal />
        <Header />
        <Masonry />
      </div>
    </AppContext.Provider>
  )
}
export default App