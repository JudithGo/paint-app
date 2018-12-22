import App from './app'
require('jest-canvas-mock')

describe('app', () => {

    describe('initial', () => {
      let app
  
      beforeEach(() => {
        app = new App('section', 'app')
      })
  
      test('should be an instance of App', () => {
        expect(app).toBeInstanceOf(App)
      })

      test('should be error when parameter tag not is a string', () =>{
        expect(() => new App( 5, 'app')).toThrowError('5 is not a string')
      })

      test('should be error when parameter className not is a string', () =>{
        expect(() => new App( 'section', 5)).toThrowError('5 is not a string')
      })
  
      test('should the element be of type HTMLElement', () => {
        expect(app.element).toBeDefined()
        expect(app.element).toBeInstanceOf(HTMLElement)
      })
  
      test('should the element contain the class name App', () => {
        expect(app.element.classList.contains('app')).toBeTruthy()
      })
  
      test('should the element contains the canvas element', () => {
        const canvas = app.element.querySelector('.canvas')
    
        expect(canvas).toBeInstanceOf(HTMLElement)
        expect(canvas).toBeDefined()
        expect(canvas.classList.contains('canvas')).toBeTruthy()
      })

      test('should the element contains the toolsControl element', () => {
        const toolsControl = app.element.querySelector('.toolsControl')
  
        expect(toolsControl).toBeInstanceOf(HTMLElement)
        expect(toolsControl).toBeDefined()
        expect(toolsControl.classList.contains('toolsControl')).toBeTruthy()
      })
    })
  })