var RECTANGLE_DRAW_COUNT = 6; //

var point1Rectangle = [];
var point2Rectangle = [];

var arrayOfRectangleVertices= [];
var tempArrayOfRectangleVertice = [];
var numOfRectangles = 0;
var shapeColor = hexToRgb(document.getElementById("color-menu").value);

var clickCount = 0

function createRectangle(polygonVertices){
  numOfRectangles = polygonVertices.length / 6;

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
  gl.drawArrays(gl.TRIANGLES, 0, RECTANGLE_DRAW_COUNT * numOfRectangles);

}

function setRectangleArrayVertice(point1, point2) {
  var X1 = point1[0]
  var X3 = point1[0]
  var X4 = point1[0]

  var Y3 = point1[1]
  var Y4 = point1[1]
  var Y6 = point1[1]

  var X2 = point2[0]
  var X5 = point2[0]
  var X6 = point2[0]

  var Y1 = point2[1]
  var Y2 = point2[1]
  var Y5 = point2[1]

  var rectangleArrayVertice = [X1, Y1, shapeColor[0],shapeColor[1],shapeColor[2], X2, Y2, shapeColor[0],shapeColor[1],shapeColor[2], X3, Y3, shapeColor[0],shapeColor[1],shapeColor[2], X4, Y4, shapeColor[0],shapeColor[1],shapeColor[2], X5, Y5, shapeColor[0],shapeColor[1],shapeColor[2], X6, Y6, shapeColor[0],shapeColor[1],shapeColor[2]]

  return rectangleArrayVertice
}

function drawNewRectangle(e){
  if(drawing === TRUE){
      getMousePosition(e);

      if (clickCount == 0) {
        point1Rectangle = [mousePosX, mousePosY]
      } else if (clickCount == 1) {
        point2Rectangle = [mousePosX, mousePosY]
        tempArrayOfRectangleVertice = setRectangleArrayVertice(point1Rectangle, point2Rectangle)
      }
      
      if (clickCount == 1) {
        for(const arrEl of tempArrayOfRectangleVertice) {
          arrayOfRectangleVertices.push(arrEl)
        }

        createRectangle(arrayOfRectangleVertices);
        clickCount = 0
        return
      }

      clickCount++
  }
}

function clearRectangle(){
  if(arrayOfRectangleVertices.length !== 0){
    arrayOfRectangleVertices = [];
    numOfRectangles = 0;
  }
}