import React, { useState, useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js'
import PixijsContainerContext from './context/PixijsContainerContext'
export const PixijsAppContext = React.createContext(undefined)

export const PROPERTIES = ['resizeTo', 'backgroundColor', 'transparent']

const PixijsApp = props => {
  const { resizeTo } = props
  const [app, setApp] = useState()
  const viewRef = useRef()
  useEffect(() => {
    const params = {
      view: viewRef.current,
    }
    PROPERTIES.forEach(key => {
      if (props[key]) params[key] = props[key]
    })
    const app = new PIXI.Application(params)
    setApp(app)
  }, [])

  // for (let key of PROPERTIES) {
  //   useEffect(() => {
  //     if (app && props[key] !== undefined) {
  //       app[key] = props[key]
  //       console.log(app[key])
  //     }
  //   }, [app, props[key]])
  // }
  return [
    <canvas ref={viewRef} key="appcanvas" />,
    <PixijsAppContext.Provider value={app} key="appcontext">
      <PixijsContainerContext.Provider value={app?.stage}>{app && props.children}</PixijsContainerContext.Provider>
    </PixijsAppContext.Provider>,
  ]
}

export default PixijsApp
