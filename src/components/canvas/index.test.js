import Canvas from './index'
require('jest-canvas-mock')


describe('canvas', () => {

    describe('initial', () => {
      let canvas
      
      beforeEach(() => {

        canvas = new Canvas('canvas', 'canvas', 800, 600)
        
      })
  
      test('should be an instance of Canvas', () => {
        expect(canvas).toBeInstanceOf(Canvas)
      })
  
      test('should the element be of type HTMLElement', () => {
        expect(canvas.element).toBeDefined()
        expect(canvas.element).toBeInstanceOf(HTMLElement)
      })

      test('should the element contain the class name canvas', () => {
        expect(canvas.element.classList.contains('canvas')).toBeTruthy()
      })
  
      test('should the element have the correct heigh and width', () => {
        expect(canvas.element.height).toEqual(600)
        expect(canvas.element.width).toEqual(800)
      })

      test('should the element have correct lineJoin and lineCap', () => {
        expect(canvas.ctx.lineJoin).toEqual('round')
        expect(canvas.ctx.lineCap).toEqual('round')
      })

      test('should be error when parameter tag not is a string', () =>{
        expect(() => new Canvas(5, 'canvas', 800, 600)).toThrowError('5 is not a string')
      })

      test('should be error when parameter className not is a string', () =>{
        expect(() => new Canvas('canvas', 5, 800, 600)).toThrowError('5 is not a string')
      })

      test('should be error when parameter width not is a number', () =>{
        expect(() => new Canvas('canvas', 'canvas', 'five', 600)).toThrowError('five is not a number')
      })

      test('should be error when parameter height not is a number', () =>{
        expect(() => new Canvas('canvas', 'canvas', 800, 'five')).toThrowError('five is not a number')
      })

      test('should onmousedown', () => {

        canvas.element.onmousedown({ offsetX: 168, offsetY: 178 })
        expect(canvas._isPainting).toBeTruthy()
        expect(canvas._coordPrev).toEqual({ offsetX: 168, offsetY: 178 })
        expect(canvas._coordCurr).toEqual({ offsetX: 168, offsetY: 178 })
        expect(canvas._currentline).toEqual([ { start: { offsetX: 168, offsetY: 178 }, stop: { offsetX: 168, offsetY: 178 } } ])
      
      })

      test('should onmousemove', () => {
        canvas.element.onmousedown({ offsetX: 168, offsetY: 178 })
        canvas.element.onmousemove({ offsetX: 150, offsetY: 158 })
        expect(canvas._isPainting).toBeTruthy()
        expect(canvas._coordPrev).toEqual({ offsetX: 150, offsetY: 158 })
        expect(canvas._coordCurr).toEqual({ offsetX: 150, offsetY: 158 })
        expect(canvas._currentline).toEqual([{"start": {"offsetX": 168, "offsetY": 178}, "stop": {"offsetX": 168, "offsetY": 178}}, {"start": {"offsetX": 168, "offsetY": 178}, "stop":{"offsetX": 150, "offsetY": 158}}])
      })

      test('should onmouseup or mouseleave', () => {
        canvas.element.onmousedown({ offsetX: 168, offsetY: 178 })
        canvas.element.onmousemove({ offsetX: 150, offsetY: 158 })

        canvas.element.onmouseup()
        expect(canvas._isPainting).toBeFalsy()
        expect(canvas._currentline).toEqual([])
        })

      test('should change color', () => {
        canvas.changeColor("red")
        expect(canvas._paintColor).toEqual("red")
      })

      test('should change size', () => {
        canvas.changeSize(10)
        expect(canvas._lineWidth).toEqual(10)
      })

      test('should undo last line', () => {
        canvas.element.onmousedown({ offsetX: 168, offsetY: 178 })
        canvas.element.onmousemove({ offsetX: 150, offsetY: 158 })
        canvas.element.onmouseup()

        expect(canvas._undoLines.length).toEqual(0)
        canvas.undoLast()
        expect(canvas._undoLines.length).toEqual(1)
      })

      test('should redo last line', () => {
        canvas.element.onmousedown({ offsetX: 168, offsetY: 178 })
        canvas.element.onmousemove({ offsetX: 150, offsetY: 158 })
        canvas.element.onmouseup()
        canvas.undoLast()

        expect(canvas._undoLines.length).toEqual(1)
        canvas.redoLast()
        expect(canvas._undoLines.length).toEqual(0)
      })
      
    })
})