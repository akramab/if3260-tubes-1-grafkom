var SQUARE_DRAW_COUNT = 6;

var arrayOfSquareVertices = [];
var numOfSquares = 0;
var shapeColor = hexToRgb(document.getElementById("color-menu").value);


var point1Square = []
var point2Square = []
var tempArrayOfSquareVertice = []


var squareClickCount = 0

function createSquare(polygonVertices){
  numOfSquares = polygonVertices.length / 6  

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
    var X2_M = 0
    var Y2_M = 0

    var initPoint = point1

    var X1_M = initPoint[0];
    var Y1_M = initPoint[1];

    if ((point1[0] <= point2[0]) && (point1[1] <= point2[1])) {
        X2_M = initPoint[0] + width;
        Y2_M = initPoint[1] + height;
    }

    if ((point1[0] > point2[0]) && (point1[1] < point2[1])) {
        X2_M = initPoint[0] - width;
        Y2_M = initPoint[1] + height;
    }

    if ((point1[0] < point2[0]) && (point1[1] > point2[1])) {
        X2_M = initPoint[0] + width;
        Y2_M = initPoint[1] - height;
    }

    if ((point1[0] > point2[0]) && (point1[1] > point2[1])) {
        X2_M = initPoint[0] - width;
        Y2_M = initPoint[1] - height;
    }
    
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

function setEditedArrayOfSquareVertice(offset, newSquareArrayVertice) {
    for (var i = offset; i < offset + 30; i ++) {
        arrayOfSquareVertices[i] = newSquareArrayVertice[i-offset]
    }
}

function drawNewSquare(e){
  if(drawing === TRUE){
      getMousePosition(e);

      if (squareClickCount == 0) {
          point1Square = [mousePosX, mousePosY]

      } else if (squareClickCount == 1) {
          point2Square = [mousePosX, mousePosY]
          console.log(point1Square)
          console.log(point2Square)
          tempArrayOfSquareVertice = setSquareArrayVertice(point1Square, point2Square)

      }

      if (squareClickCount == 1) {
        for(const arrEl of tempArrayOfSquareVertice) {
          arrayOfSquareVertices .push(arrEl)
        }

        createSquare(arrayOfSquareVertices );
        squareClickCount = 0
        return
      }

      squareClickCount++
  }
}

function findSquareCornerPointsPairByX(xCoordinates) {
    var xCornerPointsPair = []
    var normalizeX = 0
    var offset = 0
    for(xCoordinate of xCoordinates) {
        normalizeX = xCoordinate % 30
        offset = xCoordinate - normalizeX
        
        if(normalizeX == 0) {
            xCornerPointsPair = [offset, offset + normalizeX, offset + 25]

            return xCornerPointsPair
        } else if (normalizeX == 5) {
            xCornerPointsPair = [offset, offset + normalizeX, offset + 15]

            return xCornerPointsPair
        } else if (normalizeX == 25) {
            xCornerPointsPair = [offset, offset + normalizeX, offset + 0]

            return xCornerPointsPair
        } else if (normalizeX == 15) {
            xCornerPointsPair = [offset, offset + normalizeX, offset + 5]

            return xCornerPointsPair
        }
    }
}

function clearSquare(){
  if(arrayOfSquareVertices .length !== 0){
    arrayOfSquareVertices  = [];
    numOfSquares = 0;
  }
}