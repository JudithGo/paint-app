import Component from '../component'
import Color from '../color'

'use strict'

/**
* ColorsContainer Component
* @class ColorsContainer
* @extends {Component}
*/
class ColorsContainer extends Component {

  /**
   * Creates an instance of ColorsContainer
   * 
   * @param {string} tag - The tag name to create element
   * @param {string} className - The class name to add
   * @param {Array} colors - The array with colors
   * @param {string} canvasColorDefault - The color name to add class selected
   * @param {function} canvasChangeColor - The function to change color in canvas
   * @throws {Error} - Incorrect type
   * @memberof ColorsContainer
   */
  
  constructor(tag, className, colors, canvasColorDefault, canvasChangeColor) {

    if (typeof tag !== 'string') throw TypeError(`${tag} is not a string`)
    if (typeof className !== 'string') throw TypeError(`${className} is not a string`)
    if (!Array.isArray(colors)) throw TypeError(`${colors} is not an Array`)
    if (typeof canvasColorDefault !== 'string') throw TypeError(`${canvasColorDefault} is not a string`)
    if (typeof canvasChangeColor !== 'function') throw TypeError(`${canvasChangeColor} is not a function`)

    super (tag, className)

    this.colors = colors

    this.colors.forEach(color => {

      const button = new Color('button', 'color', color, canvasColorDefault, canvasChangeColor)

      this.element.appendChild(button.element)
    })
    
  }
}

export default ColorsContainer
