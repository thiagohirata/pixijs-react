import * as PIXI from 'pixi.js'
import { PROPERTIES as ContainerProperties, ContainerFactory } from './Container'

const PROPERTIES = ContainerProperties.concat(['texture'])

const Sprite = ContainerFactory(PIXI.Sprite, PROPERTIES)

export default Sprite
