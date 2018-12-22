'use strict'

/**
* Model class to components
*
* @class Component
*/
class Component{

  /**
  * Creates an instance of Component
  * @param {string} tag - The tag name to create element
  * @param {string} className - The tag name to create element 
  * @throws {Error} - tag and className must be string 
  * @memberof Component
  */
    constructor(tag, className) {
        if (typeof tag === 'string') {
          this.element = document.createElement(tag)
        } else {
          throw TypeError(`${tag} is not a string`)
        }

        if (typeof className === 'string') {
            this.element.classList.add(className)
          } else {
            throw TypeError(`${className} is not a string`)
          }
      }
}
export default Component