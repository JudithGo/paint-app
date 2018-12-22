import ToolsContainer from './index'
import Canvas from '../canvas/index'
require('jest-canvas-mock')

describe('toolsContainer', () => {

    describe('initial', () => {
        let canvas, toolsContainer

        beforeEach(() => {

          canvas = new Canvas('canvas', 'canvas', 800, 600)
          toolsContainer = new ToolsContainer('section', 'toolsContainer', canvas.undoLast, canvas.redoLast)
        
        })
        
      test('should be an instance of toolsContainer', () => {
        expect(toolsContainer).toBeInstanceOf(ToolsContainer)
      })

      test('should the element be of type HTMLElement', () => {
        expect(toolsContainer.element).toBeDefined()
        expect(toolsContainer.element).toBeInstanceOf(HTMLElement)
      })
  
      test('should the element contain the class name toolsContainer', () => {
        expect(toolsContainer.element.classList.contains('toolsContainer')).toBeTruthy()
      }) 

      test('should be error when parameter tag not is a string', () =>{
        expect(() => new ToolsContainer(5, 'toolsContainer', canvas.undoLast, canvas.redoLast)).toThrowError('5 is not a string')
      })

      test('should be error when parameter className not is a string', () =>{
        expect(() => new ToolsContainer('section', 5, canvas.undoLast, canvas.redoLast)).toThrowError('5 is not a string')
      })

      test('should be error when parameter undoCallback not is a function', () =>{
        expect(() => new ToolsContainer('section', 'toolsContainer', 5, canvas.redoLast)).toThrowError('5 is not a function')
      })

      test('should be error when parameter redoCallback not is a function', () =>{
        expect(() => new ToolsContainer('section', 'toolsContainer', canvas.undoLast, 5)).toThrowError('5 is not a function')
      })
     
    })   
})