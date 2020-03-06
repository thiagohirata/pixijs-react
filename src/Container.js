import React, { useEffect, useState } from 'react'
import useContainer from './useContainer'
import * as PIXI from 'pixi.js'
import PixijsContainerContext from './context/PixijsContainerContext'

export const PROPERTIES = [
  'anchor',
  'x',
  'y',
  'zIndex',
  'interactive',
  'buttonMode',
  'width',
  'height',
  'scale',
  'sortableChildren',
]

export const ContainerFactory = (constructor, properties) => props => {
  const parent = useContainer()
  const [container, setContainer] = useState()

  useEffect(() => {
    if (parent) {
      const container = new constructor()
      parent.addChild(container)

      setContainer(container)
      return () => {
        parent?.removeChild(container)
        setContainer(null)
      }
    }
  }, [parent])

  for (let key of properties) {
    useEffect(() => {
      if (container && props[key] !== undefined) {
        container[key] = props[key]
      }
    }, [container, props[key]])
  }

  return (
    <PixijsContainerContext.Provider value={container}>{container && props.children}</PixijsContainerContext.Provider>
  )
}
const Container = ContainerFactory(PIXI.Container, PROPERTIES)

export default Container
