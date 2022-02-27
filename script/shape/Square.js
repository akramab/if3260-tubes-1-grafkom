var SQUARE_DRAW_COUNT = 6;

var arrayOfSquareVertices = [];
var numOfSquares = 0;
var shapeColor = hexToRgb(document.getElementById("color-menu").value);


var point1Square = []
var point2Square = []
var tempArrayOfSquareVertice = []


var clickCount = 0

function createSquare(polygonVertices){
  createVertexBuffer(polygonVertices);

  var aPosition = gl.getAttribLocation(program, "a_position");
  var vertexColor = gl.getAttribLocation(program, "v_color");
  var uResolution = gl.getUniformLocation(program, "u_resolution");
  var transformMatrix = gl.getUniformLocation(program, "transform_matrix");

  vertexAttribPointer(gl, aPosition, vertexColor);

  gl.uniform2fv(uResolution, [canvas.clientWidth, canvas.clientHeight]);
  gl.uniformMatrix4fv(transformMatrix, false, new Float32Array(identityMatrix));
  gl.enableVertexAttribArray(vertexColor);
  gl.enableVertexAttribArray(aPosition);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, SQUARE_DRAW_COUNT * numOfSquares);

}


function setSquareArrayVertice(point1, point2) {
    var height = getEuclideanDistance(point1[0], point1[1], point2[0], point2[1]) / Math.sqrt(2)
    var width = height

    var initPoint = point1

    if (point1[0] > point2[0]) {
        initPoint = point2
    }

    var X1_M = initPoint[0];
    var X2_M = initPoint[0] + width;

    var Y1_M = initPoint[1];
    var Y2_M = initPoint[1] - height;

    var MULT = 1
    var X1 = X1_M * MULT //X1 mouse 
    var Y1 = Y1_M * MULT //Y2 mouse 
    var X2 = X2_M * MULT //X2 mouse
    var Y2 = Y1_M * MULT //Y2 mouse
    var X3 = X1_M * MULT //X1 mouse
    var Y3 = Y2_M * MULT //Y1 Mouse
    var X4 = X1_M * MULT //X1 mouse
    var Y4 = Y2_M * MULT //Y1 Mouse
    var X5 = X2_M * MULT //X2 mouse
    var Y5 = Y1_M * MULT //Y2 mouse
    var X6 = X2_M * MULT //X2 mouse
    var Y6 = Y2_M * MULT //Y1 Mouse

    squareArrayVertice = [X1, Y1, shapeColor[0],shapeColor[1],shapeColor[2], X2, Y2, shapeColor[0],shapeColor[1],shapeColor[2], X3, Y3, shapeColor[0],shapeColor[1],shapeColor[2], X4, Y4, shapeColor[0],shapeColor[1],shapeColor[2], X5, Y5, shapeColor[0],shapeColor[1],shapeColor[2], X6, Y6, shapeColor[0],shapeColor[1],shapeColor[2]]

    return squareArrayVertice
}

function drawNewSquare(e){
  if(drawing === TRUE){
      getMousePosition(e);

      if (clickCount == 0) {
          point1Square = [mousePosX, mousePosY]

      } else if (clickCount == 1) {
          point2Square = [mousePosX, mousePosY]
          tempArrayOfSquareVertice = setSquareArrayVertice(point1Square, point2Square)

      }

      if (clickCount == 1) {
        numOfSquares++
        for(const arrEl of tempArrayOfSquareVertice) {
          arrayOfSquareVertices .push(arrEl)
        }

        createSquare(arrayOfSquareVertices );
        clickCount = 0
        return
      }

      clickCount++
  }
}

function clearSquare(){
  if(arrayOfSquareVertices .length !== 0){
    arrayOfSquareVertices  = [];
    numOfSquares = 0;
  }
}