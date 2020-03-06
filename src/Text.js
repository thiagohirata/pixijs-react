import * as PIXI from 'pixi.js'
import { PROPERTIES as ContainerProperties, ContainerFactory } from './Container'

const PROPERTIES = ContainerProperties.concat(['text'])

const Text = ContainerFactory(PIXI.Text, PROPERTIES)

export default Text
