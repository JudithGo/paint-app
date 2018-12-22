'use strict'

const logic = {

    /**
     * set current line
     * @param {Array} _currentLine - The array containing the current lines
     * @param {Object} _coordPrev - the object containing the previous coordinates
     * @param {Object} _coordCurr - the object containing the current 
     * @returns {Array} Return the _currentLine processed
     */
    setCurrentLine(_currentLine, _coordPrev, _coordCurr){
        
        if (!Array.isArray(_currentLine)) throw TypeError(`${_currentLine} is not an Array`)
        if ((_coordPrev instanceof Object) === false) throw TypeError(`${_coordPrev} is not an Object`)
        if ((_coordCurr instanceof Object) === false) throw TypeError(`${_coordCurr} is not an Object`)

        _currentLine = _currentLine.concat({
            start: { ..._coordPrev },
            stop: { ..._coordCurr },
        }) 
   
        return _currentLine
    },

     /**
     * add current line to pain lines
     * @param {Array} _paintLines - The array containing the paint lines
     * @param {Array} _currentLine - The array containing the current lines
     * @param {String} _paintColor - the color current
     * @param {Number} _lineWidth - the size of line current
     * @returns {Array} Return the _currentLine processed
     */
    addPaintLines(_paintLines, _currentLine, _paintColor, _lineWidth){

        if (!Array.isArray(_paintLines)) throw TypeError(`${_paintLines} is not an Array`)
        if (!Array.isArray(_currentLine)) throw TypeError(`${_currentLine} is not an Array`)
        if (typeof _paintColor !== 'string') throw TypeError(`${_paintColor} is not a string`)
        if (typeof _lineWidth !== 'number') throw TypeError(`${_lineWidth} is not a number`)

        _paintLines.push({
            lines: _currentLine,
            color: _paintColor,
            width: _lineWidth
        })
       
        return _paintLines
    },

     /**
     * paint lines
     * @param {CanvasRenderingContext2D} ctx - The context of canvas
     * @param {Object} _coordPrev - the object containing the previous coordinates
     * @param {Object} _coordCurr - the object containing the current 
     * @param {String} _paintColor - the color current
     * @param {Number} _lineWidth - the size of line current
     * @returns {Object} Return the new previous coordinates
     */
    paint(ctx, _coordCurr, _coordPrev, _lineWidth, _paintColor){
        
        if ((_coordCurr instanceof Object) === false) throw TypeError(`${_coordCurr} is not an Object`)
        if ((_coordPrev instanceof Object) === false) throw TypeError(`${_coordPrev} is not an Object`)
        if (typeof _lineWidth !== 'number') throw TypeError(`${_lineWidth} is not a number`)
        if (typeof _paintColor !== 'string') throw TypeError(`${_paintColor} is not a string`)

        
        const { offsetX, offsetY } = _coordCurr
        const { offsetX: x, offsetY: y } = _coordPrev

        ctx.lineWidth = _lineWidth 
        
        ctx.beginPath()

        ctx.strokeStyle = _paintColor
        
        ctx.moveTo(x, y)
        
        ctx.lineTo(offsetX, offsetY)
        
        ctx.stroke()

        ctx.closePath()
      
        return { offsetX, offsetY }
        
    },

     /**
     * Iteration of _paintLines and call paint
     * @param {CanvasRenderingContext2D} ctx - The context of canvas
     * @param {Array} _paintLines - The array containing the paint lines
     */
    rePaintAll(ctx, _paintLines){
        
        if (!Array.isArray(_paintLines)) throw TypeError(`${_paintLines} is not an Array`)
       
            _paintLines.forEach(line => {

                line.lines.forEach(_line =>{
                    
                    this.paint(ctx, _line.stop, _line.start, line.width, line.color )
                    
                })
            }) 
    },

    /**
     * clear canvas
     * @param {CanvasRenderingContext2D} ctx - The context of canvas
     * @param {Number} width - the width element
     * @param {Number} height - the height element
     */
    clearCanvas(ctx, width, height){

        if (typeof width !== 'number') throw TypeError(`${width} is not a number`)
        if (typeof height !== 'number') throw TypeError(`${height} is not a number`)

        ctx.clearRect(0, 0, width, height)
    },

    /**
     * add last line added in undoLines 
     * @param {CanvasRenderingContext2D} ctx - The context of canvas
     * @param {Number} width - the width element
     * @param {Number} height - the height element
     * @param {Array} _undoLines - The array containing the undo lines
     * @param {Array} _paintLines - The array containing the paint lines
     * @returns {Object} Return paintLines and undoLines processed
     */
    addLastLineUndo(ctx, width, height, _undoLines, _paintLines){
    
        if (typeof width !== 'number') throw TypeError(`${width} is not a number`)
        if (typeof height !== 'number') throw TypeError(`${height} is not a number`)
        if (!Array.isArray(_undoLines)) throw TypeError(`${_undoLines} is not an Array`)
        if (!Array.isArray(_paintLines)) throw TypeError(`${_paintLines} is not an Array`)

        if (_undoLines.length !== 0) {
            this.clearCanvas(ctx, width, height)
            _paintLines.push(_undoLines.pop())
            this.rePaintAll(ctx, _paintLines)
        }

        return { paintLines :_paintLines, undoLines: _undoLines }
    },

     /**
     * add last line added in undoLines 
     * @param {CanvasRenderingContext2D} ctx - The context of canvas
     * @param {Number} width - the width element
     * @param {Number} height - the height element
     * @param {Array} _undoLines - The array containing the undo lines
     * @param {Array} _paintLines - The array containing the paint lines
     * @returns {Object} Return paintLines and undoLines processed
     */

    removeLastLine(ctx, width, height, _undoLines, _paintLines){
    
        if (typeof width !== 'number') throw TypeError(`${width} is not a number`)
        if (typeof height !== 'number') throw TypeError(`${height} is not a number`)
        if (!Array.isArray(_undoLines)) throw TypeError(`${_undoLines} is not an Array`)
        if (!Array.isArray(_paintLines)) throw TypeError(`${_paintLines} is not an Array`)

        if (_paintLines.length !== 0) {
            this.clearCanvas(ctx, width, height)
            _undoLines.push(_paintLines.pop())
            this.rePaintAll(ctx, _paintLines)
        }

        return { paintLines :_paintLines, undoLines: _undoLines }
    }

}

export default logic