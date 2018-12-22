import logic from './index'
import Canvas from '../components/canvas/index'

require('jest-canvas-mock')

describe('logic', () => {

    describe('initial', () => {
        let  canvas, _paintLines, _currentLine, _coordPrev, _coordCurr, _paintColor, _lineWidth, _undoLines

        beforeEach(() => { 
          _paintLines = []
          _currentLine = []
          _undoLines = []
          _coordPrev = {offsetX : 165, offsetY : 178}
          _coordCurr = {offsetX : 175, offsetY : 188}
          _paintColor = '#fd5658'
          _lineWidth = 10
        })
      
      describe ('setCurrentLine', ()=> {
        test('should change when setting variable _currentLine', () => {
          expect(logic.setCurrentLine(_currentLine, _coordPrev, _coordCurr)).toEqual(
            [{"start": {"offsetX": 165, "offsetY": 178}, "stop": {"offsetX": 175, "offsetY": 188}}])
        })
  
        test('should be error when parameter _currentLine not is an Array', () =>{
          expect(() => logic.setCurrentLine(5, _coordPrev, _coordCurr)).toThrowError('5 is not an Array')
        })
  
        test('should be error when parameter _coordPrev not is an Object', () =>{
          expect(() => logic.setCurrentLine(_currentLine, 5, _coordCurr)).toThrowError('5 is not an Object')
        })

        test('should be error when parameter _coordCurr not is an Object', () =>{
          expect(() => logic.setCurrentLine(_currentLine, _coordPrev, 5)).toThrowError('5 is not an Object')
        })
      })
      
      describe('add Paint Lines', () => {

        beforeEach(() => { 
          _currentLine = logic.setCurrentLine(_currentLine, _coordPrev, _coordCurr)
        })

        test('should change when add _currentLine to variable _paintLines', () => {
          
          expect(logic.addPaintLines(_paintLines, _currentLine, _paintColor, _lineWidth)).toEqual([
            {"color": "#fd5658", "lines": 
              [{"start": {"offsetX": 165, "offsetY": 178}, "stop": {"offsetX": 175, "offsetY": 188}}],
            "width": 10}])
        })

        test('should be error when parameter _painLines not is an Array', () =>{
          expect(() => logic.addPaintLines(5, _currentLine, _paintColor, _lineWidth)).toThrowError('5 is not an Array')
        })

        test('should be error when parameter _currentLine not is an Array', () =>{
          expect(() => logic.addPaintLines(_paintLines, 5, _paintColor, _lineWidth)).toThrowError('5 is not an Array')
        })
  
        test('should be error when parameter _paintColor not is a string', () =>{
          expect(() => logic.addPaintLines(_paintLines, _currentLine, 5, _lineWidth)).toThrowError('5 is not a string')
        })

        test('should be error when parameter _lineWidth not is a number', () =>{
          expect(() => logic.addPaintLines(_paintLines, _currentLine, _paintColor, 'five')).toThrowError('five is not a number')
        })
      })
      
      describe('remove last line', () =>{

        beforeEach(()=>{

          canvas = new Canvas('canvas', 'canvas', 800, 600)
  
          _currentLine = logic.setCurrentLine(_currentLine, _coordPrev, _coordCurr)
          _paintLines = logic.addPaintLines(_paintLines, _currentLine, _paintColor, _lineWidth)

        })

        test('should undo line', () => {
  
          expect(_paintLines.length).toEqual(1)
  
          const {undoLines, paintLines} = logic.removeLastLine( canvas.ctx, canvas.element.width, canvas.element.height, _undoLines, _paintLines)
  
          expect(undoLines.length).toEqual(1)
          expect(paintLines.length).toEqual(0)
          
        })

        test('should be error when parameter width not is a number', () =>{
          expect(() => logic.removeLastLine( canvas.ctx, 'five', canvas.element.height, _undoLines, _paintLines)).toThrowError('five is not a number')
        })

        test('should be error when parameter height not is a number', () =>{
          expect(() => logic.removeLastLine( canvas.ctx, canvas.element.width, 'five', _undoLines, _paintLines)).toThrowError('five is not a number')
        })

        test('should be error when parameter _undoLines not is an Array', () =>{
          expect(() => logic.removeLastLine( canvas.ctx, canvas.element.width, canvas.element.height, 5, _paintLines)).toThrowError('5 is not an Array')
        })

        test('should be error when parameter _painLines not is an Array', () =>{
          expect(() => logic.removeLastLine( canvas.ctx, canvas.element.width, canvas.element.height, _undoLines, 5)).toThrowError('5 is not an Array')
        })

      })

      describe('redo last line', () =>{

        beforeEach(()=>{

          canvas = new Canvas('canvas', 'canvas', 800, 600)
  
          _currentLine = logic.setCurrentLine(_currentLine, _coordPrev, _coordCurr)
          _paintLines = logic.addPaintLines(_paintLines, _currentLine, _paintColor, _lineWidth)

        })

        test('should redo line', () => {

          expect(_paintLines.length).toEqual(1)

          const {undoLines, paintLines} = logic.removeLastLine( canvas.ctx, canvas.element.width, canvas.element.height, _undoLines, _paintLines)

          _undoLines = undoLines
          _paintLines = paintLines

          const variables = logic.addLastLineUndo( canvas.ctx, canvas.element.width, canvas.element.height, _undoLines, _paintLines)

          expect(variables.undoLines.length).toEqual(0)
          expect(variables.paintLines.length).toEqual(1)
          
        })

        test('should be error when parameter width not is a number', () =>{
          expect(() => logic.addLastLineUndo( canvas.ctx, 'five', canvas.element.height, _undoLines, _paintLines)).toThrowError('five is not a number')
        })

        test('should be error when parameter height not is a number', () =>{
          expect(() => logic.addLastLineUndo( canvas.ctx, canvas.element.width, 'five', _undoLines, _paintLines)).toThrowError('five is not a number')
        })

        test('should be error when parameter _undoLines not is an Array', () =>{
          expect(() => logic.addLastLineUndo( canvas.ctx, canvas.element.width, canvas.element.height, 5, _paintLines)).toThrowError('5 is not an Array')
        })

        test('should be error when parameter _painLines not is an Array', () =>{
          expect(() => logic.addLastLineUndo( canvas.ctx, canvas.element.width, canvas.element.height, _undoLines, 5)).toThrowError('5 is not an Array')
        })

    })

    describe('paint', () =>{

      beforeEach(()=>{

        canvas = new Canvas('canvas', 'canvas', 800, 600)

      })

      test('should in correct data', () => {

        expect(logic.paint(canvas.ctx, _coordCurr, _coordPrev, _lineWidth, _paintColor)).toEqual({offsetX : 175, offsetY : 188})
        
      })

      test('should be error when parameter _coordCurr not is an Object', () =>{
        expect(() => logic.paint(canvas.ctx, 5, _coordPrev, _lineWidth, _paintColor)).toThrowError('5 is not an Object')
      })

      test('should be error when parameter _coordPrev not is an Object', () =>{
        expect(() => logic.paint(canvas.ctx, _coordCurr, 5, _lineWidth, _paintColor)).toThrowError('5 is not an Object')
      })

      test('should be error when parameter lineWith not is a number', () =>{
        expect(() => logic.paint(canvas.ctx, _coordCurr, _coordPrev, 'five', _paintColor)).toThrowError('five is not a number')
      })

      test('should be error when parameter paintColor not is a string', () =>{
        expect(() => logic.paint(canvas.ctx, _coordCurr, _coordPrev, _lineWidth, 5)).toThrowError('5 is not a string')
      })

  })

  describe('repaint', () =>{

    beforeEach(()=>{

      canvas = new Canvas('canvas', 'canvas', 800, 600)
      _currentLine = logic.setCurrentLine(_currentLine, _coordPrev, _coordCurr)
      _paintLines = logic.addPaintLines(_paintLines, _currentLine, _paintColor, _lineWidth)

    })

    test('should be error when parameter _paintLines not is an Array', () =>{
      expect(() => logic.rePaintAll(canvas.ctx, 5)).toThrowError('5 is not an Array')
    })

  })

  describe('clear canvas', () =>{

    beforeEach(()=>{

      canvas = new Canvas('canvas', 'canvas', 800, 600)

    })

    test('should be error when parameter width not is a number', () =>{
      expect(() => logic.clearCanvas(canvas.ctx, 'five', canvas.element.height)).toThrowError('five is not a number')
    })

    test('should be error when parameter height not is a number', () =>{
      expect(() => logic.clearCanvas(canvas.ctx, canvas.element.width, 'five')).toThrowError('five is not a number')
    })

  })
})
    
})