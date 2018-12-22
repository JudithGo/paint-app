import Color from './index'
import Canvas from '../canvas/index'
require('jest-canvas-mock')

describe('color', () => {

  describe('initial', () => {
    let canvas, color

    beforeEach(() => {

      canvas = new Canvas('canvas', 'canvas', 800, 600)
      color = new Color('button', 'color', '#000000', canvas._paintColor, canvas.changeColor)
      
    })

    test('should be an instance of Color', () => {
      expect(color).toBeInstanceOf(Color)
    })

    test('should the element be of type HTMLElement', () => {
      expect(color.element).toBeDefined()
      expect(color.element).toBeInstanceOf(HTMLElement)
    })

    test('should the element contain the class name color', () => {
      expect(color.element.classList.value).toBeTruthy()
    })

    test('should be error when parameter tag not is a string', () =>{
      expect(() => new Color(5, 'color', '#000000', canvas._paintColor, canvas.changeColor)).toThrowError('5 is not a string')
    })

    test('should be error when parameter className not is a string', () =>{
      expect(() => new Color('button', 5, '#000000', canvas._paintColor, canvas.changeColor)).toThrowError('5 is not a string')
    })

    test('should be error when parameter colorButton not is a string', () =>{
      expect(() => new Color('button', 'color', 5, canvas._paintColor, canvas.changeColor)).toThrowError('5 is not a string')
    })

    test('should be error when parameter defaultColor not is a string', () =>{
      expect(() => new Color('button', 'color', '#000000', 5, canvas.changeColor)).toThrowError('5 is not a string')
    })

    test('should be error when parameter callback not is a function', () =>{
      expect(() => new Color('button', 'color', '#000000', canvas._paintColor, 5)).toThrowError('5 is not a function')
    })

  })
  
})