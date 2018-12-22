import Component from '../component'

'use strict'
/**
* Color Component
* @class Color
* @extends {Component}
*/
class Color extends Component{

  /**
   * Creates an instance of Color
   * 
   * @param {string} tag - The tag name to create element
   * @param {string} className - The class name to add
   * @param {string} color - The color name to add background
   * @param {string} canvasColorDefault - The color name to add class selected
   * @param {function} canvasChangeColor - The function to change color in canvas
   * @throws {Error} - Incorrect type
   * @memberof Color
   */
  constructor(tag, className, color, canvasColorDefault, canvasChangeColor) {

    if (typeof tag !== 'string') throw TypeError(`${tag} is not a string`)
    if (typeof className !== 'string') throw TypeError(`${className} is not a string`)
    if (typeof color !== 'string') throw TypeError(`${color} is not a string`)
    if (typeof canvasColorDefault !== 'string') throw TypeError(`${canvasColorDefault} is not a string`)
    if (typeof canvasChangeColor !== 'function') throw TypeError(`${canvasChangeColor} is not a function`)

    super (tag, 'color')

    this.color = color
    
    if(color === canvasColorDefault) this.element.classList.add('selectedColor')

    this.element.setAttribute('style', `background-color: ${this.color}`) 
    
    
    this.element.onclick = () => {

      document.querySelector('.color.selectedColor').classList.remove('selectedColor');

      this.element.classList.add('selectedColor')

      canvasChangeColor(this.color)
    }

  }
}
export default Color