var RECTANGLE_DRAW_COUNT = 6; //

var arrayOfRectangleVertices= [];
var numOfRectangles = 0;
var shapeColor = hexToRgb(document.getElementById("color-menu").value);

// var MULT = 5
// var X1 = 10 * MULT //X1 mouse 
// var Y1 = 20 * MULT //Y2 mouse 
// var X2 = 80 * MULT //X2 mouse
// var Y2 = 20 * MULT //Y2 mouse
// var X3 = 10 * MULT //X1 mouse
// var Y3 = 30 * MULT //Y1 Mouse
// var X4 = 10 * MULT //X1 mouse
// var Y4 = 30 * MULT //Y1 Mouse
// var X5 = 80 * MULT //X2 mouse
// var Y5 = 20 * MULT //Y2 mouse
// var X6 = 80 * MULT //X2 mouse
// var Y6 = 30 * MULT //Y1 Mouse
var clickCount = 0

function createRectangle(polygonVertices){
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

function drawNewRectangle(e){
  if(drawing === TRUE){
      getMousePosition(e);

      if (clickCount == 0) {
        X1 = mousePosX
        X3 = mousePosX
        X4 = mousePosX

        Y3 = mousePosY
        Y4 = mousePosY
        Y6 = mousePosY

      } else if (clickCount == 1) {
        X2 = mousePosX
        X5 = mousePosX
        X6 = mousePosX

        Y1 = mousePosY
        Y2 = mousePosY
        Y5 = mousePosY

      }
      tempArrayOfRectangleVertice = [X1, Y1, shapeColor[0],shapeColor[1],shapeColor[2], X2, Y2, shapeColor[0],shapeColor[1],shapeColor[2], X3, Y3, shapeColor[0],shapeColor[1],shapeColor[2], X4, Y4, shapeColor[0],shapeColor[1],shapeColor[2], X5, Y5, shapeColor[0],shapeColor[1],shapeColor[2], X6, Y6, shapeColor[0],shapeColor[1],shapeColor[2]]


      if (clickCount == 1) {
        // initialVertex.push(X1, Y1)
        numOfRectangles++
        for(const arrEl of tempArrayOfRectangleVertice) {
          arrayOfRectangleVertices.push(arrEl)
        }

        console.log(tempArrayOfRectangleVertice)
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