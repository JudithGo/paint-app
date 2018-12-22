import Component from '../component'

'use strict'

/**
* Size Component
* @class Size
* @extends {Component}
*/
class Size extends Component{

  /**
   * Creates an instance of Size
   * 
   * @param {string} tag - The tag name to create element
   * @param {string} className - The class name to add
   * @param {string} size - The size name to add height style
   * @param {string} canvasSizeDefault - The size name to add class selected
   * @param {function} canvasChangeSize - The function to change size in canvas
   * @throws {Error} - Incorrect type
   * @memberof Size
   */
  constructor(tag, className, size, canvasSizeDefault, canvasChangeSize) {

    if (typeof tag !== 'string') throw TypeError(`${tag} is not a string`)
    if (typeof className !== 'string') throw TypeError(`${className} is not a string`)
    if (typeof size !== 'number') throw TypeError(`${size} is not a number`)
    if (typeof canvasSizeDefault !== 'number') throw TypeError(`${canvasSizeDefault} is not a number`)
    if (typeof canvasChangeSize !== 'function') throw TypeError(`${canvasChangeSize} is not a function`)

    super (tag, className)

    this.size = size

    if(size === canvasSizeDefault) this.element.classList.add('selectedSize')

    this.element.setAttribute('style', `height: ${size}`) 
    
    
    this.element.onclick = () => {

      document.querySelector('.size.selectedSize').classList.remove('selectedSize');

      this.element.classList.add('selectedSize')

      canvasChangeSize(this.size)

    }
  }
}
export default Size