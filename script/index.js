var drawing = FALSE;
var editing = FALSE;
var drawNew = document.getElementById("drawNew");
var editShape = document.getElementById("editShape");
var resetCanvas = document.getElementById("resetCanvas");
var shapeMenu = document.getElementById("shape-menu");

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
    console.log(shapeMenu)

    canvas.addEventListener("click", e=>drawShape(e, shapeMenu));
});

editShape.addEventListener("click", function(){
    drawing = FALSE;
    editing = TRUE;
});

resetCanvas.addEventListener("click", webGl);

shapeMenu.addEventListener('change', (e) => {
    canvas.removeEventListener('click', drawShape);
})

webGl(); 