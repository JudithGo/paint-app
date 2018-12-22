import Component from './component'
import Canvas from './canvas'
import ToolsControl from './toolsControl'

'use strict'

/**
* App Component
* @class App
* @extends {Component}
*/
class App extends Component{

    /**
   * Creates an instance of App
   * 
   * @param {string} tag - The tag name to create element
   * @param {string} className - The class name to add
   * @throws {Error} - Incorrect type
   * @memberof App
   */  
    constructor(tag, className){
        if (typeof tag !== 'string') throw TypeError(`${tag} is not a string`)
        if (typeof className !== 'string') throw TypeError(`${className} is not a string`)
        
        super (tag, className)

        let canvas = new Canvas('canvas', 'canvas', 800, 600)
        
        let toolsControl = new ToolsControl('section', 'toolsControl', canvas.undoLast, canvas.redoLast, canvas._paintColor, canvas.changeColor, canvas._lineWidth, canvas.changeSize)
    
        this.element.appendChild(toolsControl.element)
    
        this.element.appendChild(canvas.element)
    }
}

export default App


