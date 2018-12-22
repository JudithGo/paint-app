import Component from '../component'

'use strict'

/**
* Tool Component
* @class Tool
* @extends {Component}
*/
class Tool extends Component{

  /**
   * Creates an instance of Tool
   * 
   * @param {string} tag - The tag name to create element
   * @param {string} className - The class name to add
   * @param {function} callback - The function to change paintLines in canvas
   * @throws {Error} - Incorrect type
   * @memberof Tool
   */
  constructor(tag, className , callback) {

    if (typeof tag !== 'string') throw TypeError(`${tag} is not a string`)
    if (typeof className !== 'string') throw TypeError(`${className} is not a string`)
    if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)
    
    super (tag, className) 
    
    this.callback = callback

    const span = document.createElement('span')
    this.element.appendChild(span)
    
    this.element.onclick = () => {
      this.callback()
    }
  }
}

export default Tool
