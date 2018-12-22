import SizesContainer from './index'
import Canvas from '../canvas/index'
require('jest-canvas-mock')

describe('sizesContainer', () => {

    describe('initial', () => {
        let canvas, sizes, sizesContainer

        beforeEach(() => {

          sizes = [ 5, 10, 15, 20, 25 ]
          canvas = new Canvas('canvas', 'canvas', 800, 600)
          sizesContainer = new SizesContainer('section', 'sizesContainer', sizes, canvas._lineWidth, canvas.changeSize)
        
        })
        
      test('should be an instance of sizesContainer', () => {
        expect(sizesContainer).toBeInstanceOf(SizesContainer)
      })

      test('should the element be of type HTMLElement', () => {
        expect(sizesContainer.element).toBeDefined()
        expect(sizesContainer.element).toBeInstanceOf(HTMLElement)
      })
  
      test('should the element contain the class name sizesContainer', () => {
        expect(sizesContainer.element.classList.contains('sizesContainer')).toBeTruthy()
      }) 

      test('should the element contains the sizes elements', () => {
        const size = sizesContainer.element.querySelectorAll('.size')
     
        expect(size.length).toEqual(5)
        expect(size[0]).toBeInstanceOf(HTMLElement)
        expect(size[0]).toBeDefined()
        expect(size[0].classList.contains('size')).toBeTruthy()
      })

      test('should be error when parameter tag not is a string', () =>{
        expect(() => new SizesContainer(5, 'sizesContainer', sizes, canvas._lineWidth, canvas.changeColor)).toThrowError('5 is not a string')
      })

      test('should be error when parameter className not is a string', () =>{
        expect(() => new SizesContainer('section', 5, sizes, canvas._lineWidth, canvas.changeColor)).toThrowError('5 is not a string')
      })

      test('should be error when parameter sizes not is an Array', () =>{
        expect(() => new SizesContainer('section', 'sizesContainer', 5, canvas._lineWidth, canvas.changeColor)).toThrowError('5 is not an Array')
      })

      test('should be error when parameter defaultColor not is a number', () =>{
        expect(() => new SizesContainer('section', 'sizesContainer', sizes, 'five', canvas.changeColor)).toThrowError('five is not a number')
      })

      test('should be error when parameter colorCallback not is a function', () =>{
        expect(() => new SizesContainer('section', 'sizesContainer', sizes, canvas._lineWidth, 5)).toThrowError('5 is not a function')
      })
     
    })   
})