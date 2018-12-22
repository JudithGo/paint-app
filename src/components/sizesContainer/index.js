import Component from '../component'
import Size from '../size'

'use strict'

/**
* SizesContainer Component
* @class SizesContainer
* @extends {Component}
*/
class SizesContainer extends Component{

  /**
   * Creates an instance of SizesContainer
   * 
   * @param {string} tag - The tag name to create element
   * @param {string} className - The class name to add
   * @param {string} sizes - The array with sizes
   * @param {string} canvasSizeDefault - The size name to add class selected
   * @param {function} canvasChangeSize - The function to change size in canvas
   * @throws {Error} - Incorrect type
   * @memberof SizesContainer
   */
  constructor(tag, className, sizes, canvasSizeDefault, canvasChangeSize) {

    if (typeof tag !== 'string') throw TypeError(`${tag} is not a string`)
    if (typeof className !== 'string') throw TypeError(`${className} is not a string`)
    if (!Array.isArray(sizes)) throw TypeError(`${sizes} is not an Array`)
    if (typeof canvasSizeDefault !== 'number') throw TypeError(`${canvasSizeDefault} is not a number`)
    if (typeof canvasChangeSize !== 'function') throw TypeError(`${canvasChangeSize} is not a function`)

    super (tag, 'sizesContainer')

    this.sizes = sizes

    this.sizes.forEach(size => {

      const button = new Size('button', 'size', size, canvasSizeDefault, canvasChangeSize)

      this.element.appendChild(button.element)
    })
  }
}

export default SizesContainer
