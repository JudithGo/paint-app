import ToolsControl from './index'
import Canvas from '../canvas/index'
require('jest-canvas-mock')

describe('toolsControl', () => {

    describe('initial', () => {
        let canvas, toolsControl

        beforeEach(() => {

          canvas = new Canvas('canvas', 'canvas', 800, 600)
          toolsControl = new ToolsControl('section', 'toolsControl', canvas.undoLast, canvas.redoLast, canvas._paintColor, canvas.changeColor, canvas._lineWidth, canvas.changeSize)
        
        })
        
      test('should be an instance of toolsControl', () => {
        expect(toolsControl).toBeInstanceOf(ToolsControl)
      })

      test('should the element be of type HTMLElement', () => {
        expect(toolsControl.element).toBeDefined()
        expect(toolsControl.element).toBeInstanceOf(HTMLElement)
      })
  
      test('should the element contain the class name toolsControl', () => {
        expect(toolsControl.element.classList.contains('toolsControl')).toBeTruthy()
      }) 

      test('should the element contains the toolsContainer element', () => {
        const toolsContainer = toolsControl.element.querySelector('.toolsContainer')
    
        expect(toolsContainer).toBeInstanceOf(HTMLElement)
        expect(toolsContainer).toBeDefined()
        expect(toolsContainer.classList.contains('toolsContainer')).toBeTruthy()
      })

      test('should the element contains the sizesContainer element', () => {
        const sizesContainer = toolsControl.element.querySelector('.sizesContainer')
  
        expect(sizesContainer).toBeInstanceOf(HTMLElement)
        expect(sizesContainer).toBeDefined()
        expect(sizesContainer.classList.contains('sizesContainer')).toBeTruthy()
      })

      test('should the element contains the colorsContainer element', () => {
        const colorsContainer = toolsControl.element.querySelector('.colorsContainer')
  
        expect(colorsContainer).toBeInstanceOf(HTMLElement)
        expect(colorsContainer).toBeDefined()
        expect(colorsContainer.classList.contains('colorsContainer')).toBeTruthy()
      })

      test('should be error when parameter tag not is a string', () =>{
        expect(() => new ToolsControl(5, 'toolsControl', canvas.undoLast, canvas.redoLast, canvas._paintColor, canvas.changeColor, canvas._lineWidth, canvas.changeSize)).toThrowError('5 is not a string')
      })

      test('should be error when parameter className not is a string', () =>{
        expect(() => new ToolsControl('section', 5, canvas.undoLast, canvas.redoLast, canvas._paintColor, canvas.changeColor, canvas._lineWidth, canvas.changeSize)).toThrowError('5 is not a string')
      })

      test('should be error when parameter undoCallback not is a function', () =>{
        expect(() => new ToolsControl('section', 'toolsControl', 5, canvas.redoLast, canvas._paintColor, canvas.changeColor, canvas._lineWidth, canvas.changeSize)).toThrowError('5 is not a function')
      })

      test('should be error when parameter redoCallback not is a function', () =>{
        expect(() => new ToolsControl('section', 'toolsControl', canvas.undoLast, 5, canvas._paintColor, canvas.changeColor, canvas._lineWidth, canvas.changeSize)).toThrowError('5 is not a function')
      })

      test('should be error when parameter paintColor not is a string', () =>{
        expect(() => new ToolsControl('section', 'toolsControl', canvas.undoLast, canvas.redoLast, 5, canvas.changeColor, canvas._lineWidth, canvas.changeSize)).toThrowError('5 is not a string')
      })

      test('should be error when parameter colorCallback not is a function', () =>{
        expect(() => new ToolsControl('section', 'toolsControl', canvas.undoLast, canvas.redoLast, canvas._paintColor, 5, canvas._lineWidth, canvas.changeSize)).toThrowError('5 is not a function')
      })

      test('should be error when parameter lineWidth not is a number', () =>{
        expect(() => new ToolsControl('section', 'toolsControl', canvas.undoLast, canvas.redoLast, canvas._paintColor, canvas.changeColor, 'five', canvas.changeSize)).toThrowError('five is not a number')
      })

      test('should be error when parameter colorCallback not is a function', () =>{
        expect(() => new ToolsControl('section', 'toolsControl', canvas.undoLast, canvas.redoLast, canvas._paintColor, canvas.changeColor, canvas._lineWidth, 5)).toThrowError('5 is not a function')
      })
     
    })   
})