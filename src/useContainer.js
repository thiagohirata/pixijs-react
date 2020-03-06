import { useContext } from 'react'
import PixijsContainerContext from './context/PixijsContainerContext'

const useContainer = () => {
  return useContext(PixijsContainerContext)
}

export default useContainer
