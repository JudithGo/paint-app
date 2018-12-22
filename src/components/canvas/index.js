import Component from '../component'
import logic from '../../logic'

'use strict'

/**
* Canvas Component
* @class Canvas
* @extends {Component}
*/
class Canvas extends Component{

   /**
   * Creates an instance of Canvas
   * 
   * @param {string} tag - The tag name to create element
   * @param {string} className - The class name to add
   * @param {number} width - The width of the element
   * @param {number} height - The height of the element
   * @throws {Error} - Incorrect type
   * @memberof Canvas
   */
    constructor(tag, className, _width, _height){

        if (typeof tag !== 'string') throw TypeError(`${tag} is not a string`)
        if (typeof className !== 'string') throw TypeError(`${className} is not a string`)
        if (typeof _width !== 'number') throw TypeError(`${_width} is not a number`)
        if (typeof _height !== 'number') throw TypeError(`${_height} is not a number`)

        super(tag, className)

        this.element.width = _width 
        this.element.height = _height 

        this.ctx = this.element.getContext('2d') 
        this.ctx.lineJoin = 'round' 
        this.ctx.lineCap = 'round' 

        this._paintLines = [],
        this._paintColor = '#000000',
        this._lineWidth = 5,
        this._undoLines = [],
        this._coordPrev = { offsetX : 0, offsetY : 0 },
        this._coordCurr = { offsetX : 0, offsetY : 0 },
        this._isPainting = false,
        this._currentline = []

        this.element.onmousedown = this.handleMouseDown.bind(this)

        this.element.onmousemove = this.handleMouseMove.bind(this)

        this.element.onmouseup = this.handleEndPaintEvent.bind(this)

        this.element.onmouseleave = this.handleEndPaintEvent.bind(this)

        this.redoLast = this.redoLast.bind(this)
        this.undoLast = this.undoLast.bind(this)
        this.changeColor = this.changeColor.bind(this)
        this.changeSize = this.changeSize.bind(this)
       
    }

   /**
   * Handler mouse down
   * @param {MouseEvent} event - The event
   * @memberof Canvas
   */
    handleMouseDown (event) {
        const { offsetX, offsetY } = event 
        this._isPainting = true
        this._coordPrev = { offsetX, offsetY } 

        this._coordCurr = { offsetX, offsetY } 
        this._currentline = logic.setCurrentLine(this._currentline, this._coordPrev, this._coordCurr)
        this._coordPrev = logic.paint(this.ctx, this._coordCurr, this._coordPrev, this._lineWidth, this._paintColor) 
    }

   /**
   * Handler mouse move
   * @param {MouseEvent} event - The event
   * @memberof Canvas
   */
    handleMouseMove(event){
        
        if (this._isPainting) {
                
            const { offsetX, offsetY } = event
            this._coordCurr = { offsetX, offsetY }
        
            this._currentline = logic.setCurrentLine(this._currentline, this._coordPrev, this._coordCurr)
            
            this._coordPrev = logic.paint(this.ctx, this._coordCurr, this._coordPrev, this._lineWidth, this._paintColor)
            
        }
    }

   /**
   * Handler mouse up or mouse leave
   * @param {MouseEvent} event - The event
   * @memberof Canvas
   */
    handleEndPaintEvent ()  {
        if (this._isPainting) {

            this._isPainting = false        
            this._paintLines = logic.addPaintLines(this._paintLines, this._currentline, this._paintColor, this._lineWidth)            
            this._currentline = []
   
            logic.clearCanvas(this.ctx, this.element.width, this.element.height)
            logic.rePaintAll(this.ctx, this._paintLines)
        }
    }

   /**
   * Handler change Color
   * @param {MouseEvent} event - The event
   * @memberof Canvas
   */
    changeColor (color) {
        if (typeof color !== 'string') throw TypeError(`${color} is not a string`)
        
        this._paintColor = color
    }

    /**
   * Handler change size
   * @param {MouseEvent} event - The event
   * @memberof Canvas
   */
    changeSize  (size) { 
        if (typeof size !== 'number') throw TypeError(`${size} is not a number`)

        this._lineWidth = size 
    } 

    /**
   * Handler redo last line
   * @param {MouseEvent} event - The event
   * @memberof Canvas
   */
    redoLast() {

        const {undoLines, paintLines} = logic.addLastLineUndo(this.ctx, this.element.width, this.element.height, this._undoLines, this._paintLines)
        
        this._undoLines = undoLines
        this._paintLines = paintLines

    }

    /**
    * Handler undo last line
    * @param {MouseEvent} event - The event
    * @memberof Canvas
    */
    undoLast (){

        const {undoLines, paintLines} = logic.removeLastLine(this.ctx, this.element.width, this.element.height, this._undoLines, this._paintLines)
        this._undoLines = undoLines
        this._paintLines = paintLines
    }
    
}
export default Canvas
