import Tool from './index'

describe('tool', () => {

  describe('initial', () => {
    let tool, res

    const click = () => res = 'ok'

    beforeEach(() => {
      tool = new Tool('section', 'tool', click)
    })

    test('should be an instance of Tool', () => {
      expect(tool).toBeInstanceOf(Tool)
    })

    test('should the element be of type HTMLElement', () => {
      expect(tool.element).toBeDefined()
      expect(tool.element).toBeInstanceOf(HTMLElement)
    })

    test('should the element contain the class name tool', () => {
      expect(tool.element.classList.contains('tool')).toBeTruthy()
    })

    test('should the element contains the span element', () => {
      const span = tool.element.querySelector('span')
  
      expect(span).toBeInstanceOf(HTMLElement)
      expect(span).toBeDefined()
    })

    test('should onClick', () => {
      tool.element.dispatchEvent(new Event('click'))
      expect(res).toEqual('ok')
    })

    test('should be error when parameter tag not is a string', () =>{
      expect(() => new Tool(5, 'tool', click)).toThrowError('5 is not a string')
    })

    test('should be error when parameter className not is a string', () =>{
      expect(() => new Tool('section', 5, click)).toThrowError('5 is not a string')
    })

    test('should be error when parameter callback not is a function', () =>{
      expect(() => new Tool('section', 'tool', 5)).toThrowError('5 is not a function')
    })

  })
  
})