// Text editor
// replit
// Server-side text editor, linter and interpreter
// codeblockes
// Server-side Visual Studio Code
// code 1.75.1
// Client-side Visual Studio Code
// mousepad 0.4.2
// Mousepad is a fast text editor for the Xfce Desktop Environment.

// CDN
// unpkg
// Content delivery network

// Language
// js
// Nuff said

// Third-party content
// three.js
// cross-browser JavaScript library and application programming interface (API) used to create and display animated 3D computer graphics in a web browser using WebGL

// Rules
// Scopes are treated as 1 byte
// I always struggle then see "()=>{}" thereas "()" can be represented with one byte but in some cases that byte stays unused. To prevent that kind of thoughts from now all scopes will add 1 pseudobyte to overall file size. Pseudobyte as valuable as any other kind of bytes though

let src='./main.js'
let then=()=>main()
document.body.innerText='Loading...';(new Promise((onload, onerror)=>document.body.append(Object.assign(document.createElement('script'),{src,async:true,onload,onerror})))).then(then).catch(e=>console.log(document.body.innerText+=''+e.target.src+' cannot be loaded'))
