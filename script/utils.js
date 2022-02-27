var identityMatrix = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
];
const TRUE = 1;
const FALSE = 0;
const TOLERANCE = 10;
const ELEMENT_SIZE = 5*Float32Array.BYTES_PER_ELEMENT;
const COLOR_OFFSET = 2*Float32Array.BYTES_PER_ELEMENT;

function createVertexShader(){
  vertexShaderProgram = ` 
    attribute vec4 a_position;
    uniform vec2 u_resolution;
    uniform mat4 transform_matrix;
    varying vec3 f_color;
    attribute vec3 v_color;
    void main(){
      vec2 position = (transform_matrix * a_position).xy;
      vec2 zeroToOne = position / u_resolution;
      vec2 zeroToTwo = zeroToOne * 2.0;
      vec2 clipSpace = zeroToTwo - 1.0;
      gl_Position = vec4(clipSpace, 0, 1);
      f_color = v_color;
    }`;

  vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderProgram);
  gl.compileShader(vertexShader);
  return vertexShader; 
}

function createFragmentShader(){
  fragmentShaderProgram = 
  `precision highp float;
    varying vec3 f_color;
    void main(){
      gl_FragColor = vec4(f_color, 1.0);
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
  r = parseInt(result[1], 16)/255;
  g = parseInt(result[2], 16)/255;
  b = parseInt(result[3], 16)/255;
  rgb.push(r, g, b);
  return rgb;
}

function vertexAttribPointer(gl, aPosition, vertexColor){
  gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, ELEMENT_SIZE, COLOR_OFFSET);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, ELEMENT_SIZE, 0);
}

function searchMatchingPositionIdx(array, x, y){
  for(var i = 0; i < array.length; i += 5){
    var distanceToNearestPoint = getEuclideanDistance(array[i], array[i+1], x, y);
    if (distanceToNearestPoint <= TOLERANCE) {
      return i;
    }
  }
  return -1;
}

function searchMatchingPositionsIdx(array, x, y){
  var idx = []
  for(var i = 0; i < array.length; i += 5){
    var distanceToNearestPoint = getEuclideanDistance(array[i], array[i+1], x, y);
    if (distanceToNearestPoint <= TOLERANCE) {
      idx.push(i);
    }
  }
  return idx;
}

// Save and Load
var saveFile = document.getElementById("saveFile");
saveFile.addEventListener('click', function(){
  var newFile = document.createElement('a');
  var outputData = '';

  if(arrayOfLineVertices.length != 0){
    arrayOfLineVertices.push('line');
    outputData += JSON.stringify(arrayOfLineVertices);
  }

  if(arrayOfPolygonVertices.length != 0){
    arrayOfPolygonVertices.push('polygon');
    outputData += JSON.stringify(arrayOfPolygonVertices);
  }

  newFile.href = 'data:text/plain,' + outputData;
  newFile.download = 'drawing.txt';
  newFile.click();
});

// var loadFile = document.getElementById("inputFile");
// loadFile.addEventListener('change', function(e){
//   var file = new FileReader();
//   file.onload = function(e){
//   };    