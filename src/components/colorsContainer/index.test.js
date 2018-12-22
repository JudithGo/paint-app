import ColorsContainer from './index'
import Canvas from '../canvas/index'
require('jest-canvas-mock')

describe('colorsContainer', () => {

    describe('initial', () => {
        let canvas, colors, colorsContainer

        beforeEach(() => {

          colors = [ 'red', 'black', 'green' ]
          canvas = new Canvas('canvas', 'canvas', 800, 600)
          colorsContainer = new ColorsContainer('section', 'colorsContainer', colors, canvas._paintColor, canvas.changeColor)
        
        })
        
      test('should be an instance of colorsContainer', () => {
        expect(colorsContainer).toBeInstanceOf(ColorsContainer)
      })

      test('should the element be of type HTMLElement', () => {
        expect(colorsContainer.element).toBeDefined()
        expect(colorsContainer.element).toBeInstanceOf(HTMLElement)
      })
  
      test('should the element contain the class name colorsContainer', () => {
        expect(colorsContainer.element.classList.contains('colorsContainer')).toBeTruthy()
      }) 

      test('should the element contains the colors elements', () => {
        const color = colorsContainer.element.querySelectorAll('.color')
     
        expect(color.length).toEqual(3)
        expect(color[0]).toBeInstanceOf(HTMLElement)
        expect(color[0]).toBeDefined()
        expect(color[0].classList.contains('color')).toBeTruthy()
      })

      test('should be error when parameter tag not is a string', () =>{
        expect(() => new ColorsContainer(5, 'colorsContainer', colors, canvas._paintColor, canvas.changeColor)).toThrowError('5 is not a string')
      })

      test('should be error when parameter className not is a string', () =>{
        expect(() => new ColorsContainer('section', 5, colors, canvas._paintColor, canvas.changeColor)).toThrowError('5 is not a string')
      })

      test('should be error when parameter colors not is an Array', () =>{
        expect(() => new ColorsContainer('section', 'colorsContainer', 5, canvas._paintColor, canvas.changeColor)).toThrowError('5 is not an Array')
      })

      test('should be error when parameter defaultColor not is a string', () =>{
        expect(() => new ColorsContainer('section', 'colorsContainer', colors, 5, canvas.changeColor)).toThrowError('5 is not a string')
      })

      test('should be error when parameter colorCallback not is a function', () =>{
        expect(() => new ColorsContainer('section', 'colorsContainer', colors, canvas._paintColor, 5)).toThrowError('5 is not a function')
      })
     
    })   
})