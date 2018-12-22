import Size from './index'
import Canvas from '../canvas/index'
require('jest-canvas-mock')

describe('size', () => {

  describe('initial', () => {
    let canvas, size

    beforeEach(() => {

      canvas = new Canvas('canvas', 'canvas', 800, 600)
      size = new Size('button', 'size', 5, canvas._lineWidth, canvas.changeSize)

    })

    test('should be an instance of size', () => {
      expect(size).toBeInstanceOf(Size)
    })

    test('should the element be of type HTMLElement', () => {
      expect(size.element).toBeDefined()
      expect(size.element).toBeInstanceOf(HTMLElement)
    })

    test('should the element contain the class name size', () => {
      expect(size.element.classList.contains('size')).toBeTruthy()
    })

    test('should be error when parameter tag not is a string', () =>{
      expect(() => new Size(5, 'size', 5, canvas._lineWidth, canvas.changeSize)).toThrowError('5 is not a string')
    })

    test('should be error when parameter className not is a string', () =>{
      expect(() => new Size('button', 5, 5, canvas._lineWidth, canvas.changeSize)).toThrowError('5 is not a string')
    })

    test('should be error when parameter sizeButton not is a number', () =>{
      expect(() => new Size('button', 'size', 'five', canvas._lineWidth, canvas.changeSize)).toThrowError('five is not a number')
    })

    test('should be error when parameter sizeDefault not is a number', () =>{
      expect(() => new Size('button', 'size', 5, 'five', canvas.changeSize)).toThrowError('five is not a number')
    })

    test('should be error when parameter callback not is a function', () =>{
      expect(() => new Size('button', 'size', 5, canvas._lineWidth, 5)).toThrowError('5 is not a function')
    })

  })
  
})