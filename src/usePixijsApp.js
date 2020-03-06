import { useContext } from 'react'
import { PixijsAppContext } from './PixijsApp'

const usePixijsApp = () => {
  return useContext(PixijsAppContext)
}

export default usePixijsApp
