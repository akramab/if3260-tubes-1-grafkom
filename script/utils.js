var identityMatrix = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
];
const TRUE = 1;
const FALSE = 0;

function createVertexShader(){
  vertexShaderProgram = ` 
    attribute vec4 a_position;
    uniform mat4 transform_matrix;
    attribute vec3 vertex_color;
    varying vec3 fragColor;
    uniform vec2 u_resolution;
    void main(){
        fragColor = vertex_color;
        vec2 position = (transform_matrix * a_position).xy;
        vec2 zeroToOne = position / u_resolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - 1.0;
        gl_Position = vec4(clipSpace, 0, 1);
    }`;

  vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderProgram);
  gl.compileShader(vertexShader);
  return vertexShader; 
}

function createFragmentShader(){
  fragmentShaderProgram = 
  `precision mediump float;
    varying vec3 fragColor;
    void main(){
        gl_FragColor = vec4(fragColor, 1.0);
    }`;
  fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderProgram);
  gl.compileShader(fragmentShader);
  return fragmentShader;
}

function createProgram(gl, vertexShader, fragmentShader){
  program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  return program;
}

function clear(){
  clearLine();
  lineCount=0;
  clearPolygon();
}

function drawShape(e,shape){
  if(shape === "line"){
      drawNewLine(e);
  }
  if(shape === 'polygon') {
    drawNewPolygon(e);
  }
}

function createVertexBuffer(vertices){
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  //return vertexBuffer;
}

// Basic Operations
function getEuclideanDistance(x1, y1, x2, y2){
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getMousePosition(event){
  mousePosX = event.offsetX;
  mousePosY = canvas.clientHeight - event.offsetY;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  rgb = [];
  r = parseInt(result[1], 16);
  g = parseInt(result[2], 16);
  b = parseInt(result[3], 16);
  rgb.push(r, g, b);
  if (result) {
    return rgb; 
  } else {
    return null; 
  }
}

function vertexAttribPointer(gl, aPosition, vertexColor){
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
  gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
}