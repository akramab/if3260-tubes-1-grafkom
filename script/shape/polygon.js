var arrayOfPolygonVertices= [];
var polygonTriangleCount = 0;
var initialVertex = [];
var shapeColor = hexToRgb(document.getElementById("color-menu").value);

function createPolygon(polygonVertices){
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
  gl.drawArrays(gl.TRIANGLES, 0, polygonTriangleCount);
}

function drawNewPolygon(e){
  if(drawing === TRUE){
      getMousePosition(e);
      if (initialVertex.length === 0) {
        initialVertex.push(mousePosX, mousePosY);
      }

      addPointTriangle(mousePosX, mousePosY);

      polygonTriangleCount = arrayOfPolygonVertices.length/5;
      if (polygonTriangleCount >= 3) {
        createPolygon(arrayOfPolygonVertices);
        // createPolygonStrips(arrayOfPolygonVertices);
      }
  }

  document.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
      initialVertex = [];
    }
  });
}

function closePolygonVertices(e) {
  if (e.key == 'Enter') {
    initialVertex = [];
  }
}

function addPointTriangle(x, y) {
  const len = arrayOfPolygonVertices.length;
  if (len < 15) {
      arrayOfPolygonVertices.push(x, y);
      arrayOfPolygonVertices.push(shapeColor[0],shapeColor[1],shapeColor[2]);
  } else {
      arrayOfPolygonVertices.push(initialVertex[0], initialVertex[1]);
      arrayOfPolygonVertices.push(shapeColor[0],shapeColor[1],shapeColor[2]);
      arrayOfPolygonVertices.push(arrayOfPolygonVertices[len-5], arrayOfPolygonVertices[len-4]);
      arrayOfPolygonVertices.push(shapeColor[0],shapeColor[1],shapeColor[2]);
      arrayOfPolygonVertices.push(x,y);
      arrayOfPolygonVertices.push(shapeColor[0],shapeColor[1],shapeColor[2]);
  }
}

function clearPolygon(){
  if(arrayOfPolygonVertices.length !== 0){
    arrayOfPolygonVertices = [];
    initialVertex = [];
    polygonTriangleCount = 0;
  }
}