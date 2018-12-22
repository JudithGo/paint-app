import Component from '../component'
import Tool from '../tool'

'use strict'

/**
* ToolsContainer Component
* @class ToolsContainer
* @extends {Component}
*/
class ToolsContainer extends Component{

  /**
   * Creates an instance of ToolsContainer
   * 
   * @param {string} tag - The tag name to create element
   * @param {string} className - The class name to add
   * @param {function} undoLast - The function to change paintLines in canvas
   * @param {function} redoLast - The function to change paintLines in canvas
   * @throws {Error} - Incorrect type
   * @memberof ToolsContainer
   */
  constructor(tag, className, undoLast, redoLast) {

    if (typeof tag !== 'string') throw TypeError(`${tag} is not a string`)
    if (typeof className !== 'string') throw TypeError(`${className} is not a string`)
    if (typeof undoLast !== 'function') throw TypeError(`${undoLast} is not a function`)
    if (typeof redoLast !== 'function') throw TypeError(`${redoLast} is not a function`)
   
    super(tag, className)

    const undo = new Tool('button', 'undo', undoLast)
    this.element.appendChild(undo.element)

    const redo = new Tool('button', 'redo', redoLast)
    this.element.appendChild(redo.element)
    
  }
}

export default ToolsContainer
