import { useState, createContext } from 'react'
import AddPhotoModal from './components/AddPhotoModal'
import Header from "./components/Header"
import Masonry from './components/Masonry'
import Modal from './components/Modal'

type AppContext = {
  addPhotoModal: boolean,
  setAddPhotoModal: React.Dispatch<React.SetStateAction<boolean>>,
  deleteModal: boolean,
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ContextState = {
  addPhotoModal: false,
  setAddPhotoModal: () => { },
  deleteModal: false,
  setDeleteModal: () => { }
}

export const AppContext = createContext<AppContext>(ContextState)

const App = () => {
  const [addPhotoModal, setAddPhotoModal] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  return (

    <AppContext.Provider
      value={{
        addPhotoModal,
        setAddPhotoModal,
        deleteModal,
        setDeleteModal
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