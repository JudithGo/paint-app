import Component from '../component'
import ToolsContainer from '../toolsContainer'
import ColorsContainer from '../colorsContainer'
import SizesContainer from '../sizesContainer'

'use strict'

/**
* ToolsControl Component
* @class ToolsControl
* @extends {Component}
*/
class ToolsControl extends Component{

    /**
   * Creates an instance of ToolsControl
   * 
   * @param {string} tag - The tag name to create element
   * @param {string} className - The class name to add
   * @param {function} undoLast - The function to change paintLines in canvas
   * @param {function} redoLast - The function to change paintLines in canvas
   * @param {string} canvasColorDefault - The color name to add class selected
   * @param {function} canvasChangeColor - The function to change color in canvas
   * @param {string} canvasSizeDefault - The size name to add class selected
   * @param {function} canvasChangeSize - The function to change size in canvas
   * @throws {Error} - Incorrect type
   * @memberof ToolsControl
   */
  constructor(tag, className, undoLast, redoLast, canvasColorDefault, canvasChangeColor, canvasSizeDefault, canvasChangeSize) {

    if (typeof tag !== 'string') throw TypeError(`${tag} is not a string`)
    if (typeof className !== 'string') throw TypeError(`${className} is not a string`)
    if (typeof undoLast !== 'function') throw TypeError(`${undoLast} is not a function`)
    if (typeof redoLast !== 'function') throw TypeError(`${redoLast} is not a function`)
    if (typeof canvasColorDefault !== 'string') throw TypeError(`${canvasColorDefault} is not a string`)
    if (typeof canvasSizeDefault !== 'number') throw TypeError(`${canvasSizeDefault} is not a number`)
    if (typeof canvasChangeColor !== 'function') throw TypeError(`${canvasChangeColor} is not a function`)
    if (typeof canvasChangeSize !== 'function') throw TypeError(`${canvasChangeSize} is not a function`)
    
    super(tag, className)

    let toolsContainer = new ToolsContainer('section', 'toolsContainer', undoLast, redoLast)

    this.element.appendChild(toolsContainer.element)

    let colorsContainer = new ColorsContainer('section', 'colorsContainer',
      [
        '#000000', '#fd5658', '#ffbc00', '#16c757', '#16affc',
        '#ffffff', '#a42b1d', '#ed8323', '#568b34', '#085799',
        '#cfd8dc', '#ff4081', '#ff6e40', '#aeea00', '#304ffe',
        '#4e342e', '#d414f6', '#8d6e63', '#1de9b6', '#7c4dff'
      ],
      canvasColorDefault, canvasChangeColor
    )

    this.element.appendChild(colorsContainer.element)

    let sizesContainer = new SizesContainer('section','sizesContainer', [5,10,15,20,25], canvasSizeDefault, canvasChangeSize)

    this.element.appendChild(sizesContainer.element)
        
  }
}
export default ToolsControl