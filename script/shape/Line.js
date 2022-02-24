var arrayOfLineVertices=[];
var lineCount = 0;

function createLine(lineVertices, lineCount){
  createVertexBuffer(lineVertices);

  var aPosition = gl.getAttribLocation(program, "a_position");
  var vertexColor = gl.getAttribLocation(program, "vertex_color");
  var uResolution = gl.getUniformLocation(program, "u_resolution");
  var transformMatrix = gl.getUniformLocation(program, "transform_matrix");

  vertexAttribPointer(gl, aPosition, vertexColor);

  gl.uniform2fv(uResolution, [canvas.clientWidth, canvas.clientHeight]);
  gl.uniformMatrix4fv(transformMatrix, false, new Float32Array(identityMatrix));
  gl.enableVertexAttribArray(vertexColor);
  gl.enableVertexAttribArray(aPosition);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.LINES, 0, lineCount);
}

function drawNewLine(e){
  if(drawing === TRUE){
      var shapeColor = hexToRgb(document.getElementById("color-menu").value);
      getMousePosition(e);

      arrayOfLineVertices.push(mousePosX);
      arrayOfLineVertices.push(mousePosY);
      arrayOfLineVertices.push(shapeColor[0],shapeColor[1],shapeColor[2]);

      if(arrayOfLineVertices.length % 10 == 0){
          lineCount += 1;
          createLine(arrayOfLineVertices, (arrayOfLineVertices.length / 5));
      }
  }
}

function clearLine(){
  if(arrayOfLineVertices.length !== 0){
    arrayOfLineVertices = [];
  }
}