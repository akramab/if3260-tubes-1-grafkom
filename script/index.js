var drawing = FALSE;
var editing = FALSE;
var selected = FALSE;
var drawNew = document.getElementById("drawNew");
var editShape = document.getElementById("editShape");
var resetCanvas = document.getElementById("resetCanvas");
var shapeMenu = document.getElementById("shape-menu");
var colorMenu = document.getElementById("color-menu");

function webGl() {
    clear();
    canvas = document.getElementById("gl-canvas");
    canvas.removeEventListener("click", drawShape);

    gl = canvas.getContext("webgl");
    if (!gl) {
        alert("WebGL is not available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    
    vertexShader = createVertexShader();
    fragmentShader = createFragmentShader();
    program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);
}

drawNew.addEventListener("click", function(){
    drawing = TRUE;
    editing = FALSE;

    var shapeMenu = document.getElementById("shape-menu").value;
    canvas.addEventListener("click", e=>drawShape(e, shapeMenu));
});

editShape.addEventListener("click", function(){
    drawing = FALSE;
    editing = TRUE;
    var positionIdx = -1;
    var positionsIdx = []; // for multiple points in polygon

    canvas.addEventListener("click", function(e){
        getMousePosition(e)

        if(editing === TRUE && drawing === FALSE){
            if(selected === FALSE){
                if(shapeMenu.value === 'line'){
                    positionIdx = searchMatchingPositionIdx(arrayOfLineVertices, mousePosX, mousePosY);
                    if(positionIdx !== -1){
                        selected = TRUE;
                    }
                } else if (shapeMenu.value === 'polygon'){
                    positionsIdx = searchMatchingPositionsIdx(arrayOfPolygonVertices, mousePosX, mousePosY);
                    if(positionsIdx.length !== 0){
                        selected = TRUE
                    }
                }
            } else {
                if(shapeMenu.value === 'line'){
                    arrayOfLineVertices[positionIdx] = mousePosX;
                    arrayOfLineVertices[positionIdx + 1] = mousePosY;
                    createLine(arrayOfLineVertices, (arrayOfLineVertices.length / 5));
                    selected = FALSE;
                    positionIdx = -1;
                } else if (shapeMenu.value === 'polygon'){
                    positionsIdx.forEach(matchingIdx => {
                        arrayOfPolygonVertices[matchingIdx] = mousePosX;
                        arrayOfPolygonVertices[matchingIdx + 1] = mousePosY;
                    });
                    createPolygon(arrayOfPolygonVertices);
                    selected = FALSE;
                    positionsIdx = []
                }
            } 
        }
    });
});

resetCanvas.addEventListener("click", webGl);

shapeMenu.addEventListener('change', (e) => {
    canvas.removeEventListener('click', drawShape);
})

colorMenu.addEventListener('change', (e) => {
    shapeColor = hexToRgb(colorMenu.value);
})

webGl(); 