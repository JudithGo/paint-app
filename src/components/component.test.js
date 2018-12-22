import Component from './component'

describe('component', () => {

    describe('initial', () => {
        let component

        beforeEach(() => {
            component = new Component('section', 'component')
        })
        
      test('should be an instance of Component', () => {
        expect(component).toBeInstanceOf(Component)
      })

      test('should be error when parameter tag not is a string', () =>{
        expect(() => new Component(5, 'component')).toThrowError('5 is not a string')
      })

      test('should be error when parameter className not is a string', () =>{
        expect(() => new Component('section', 5)).toThrowError('5 is not a string')
      })

      test('should the element be of type HTMLElement', () => {
        expect(component.element).toBeDefined()
        expect(component.element).toBeInstanceOf(HTMLElement)
      })
  
      test('should the element contain the class name App', () => {
        expect(component.element.classList.contains('component')).toBeTruthy()
      }) 
    })   
})