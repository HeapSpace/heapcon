var SHOW_GUI = false;
var IMAGE_ASPECT_RATIO = 4.36;
var CAMERA_WIDTH = 8;

var params = {
    distortionX: 0.3,
    distortionY: 1.7,
    frequencyX: 0.6,
    frequencyY: 0.39,
    envelopeFrequencyX: 0.38,
    envelopeFrequencyY: 1.47,
    mouseDistortion: 0.0,
    mouseDistortionWidth: 2.2,
    timeScale: 0.004,
    wireframe: false,
    subdivision: 40,
    animate: true,
    rotation: 0
};

if (SHOW_GUI) {
    var gui = new dat.GUI({ width: 300 });
    var folderParameters = gui.addFolder('Logo Parameters');
    folderParameters.add(params, 'animate');
    folderParameters.add(params, 'rotation', [0, 90, -90])
        .onChange(applyRotation);
    folderParameters.add(params, 'distortionX', 0.0, 2.0)
        .onChange(function (_) { updateUniforms(); });
    folderParameters.add(params, 'distortionY', 0.0, 2.0)
        .onChange(function (_) { updateUniforms(); });
    folderParameters.add(params, 'frequencyX', 0.0, 3.0)
        .onChange(function (_) { updateUniforms(); });
    folderParameters.add(params, 'frequencyY', 0.0, 3.0)
        .onChange(function (_) { updateUniforms(); });
    folderParameters.add(params, 'envelopeFrequencyX', 0.0, 2.0)
        .onChange(function (_) { updateUniforms(); });
    folderParameters.add(params, 'envelopeFrequencyY', 0.0, 2.0)
        .onChange(function (_) { updateUniforms(); });
    folderParameters.add(params, 'mouseDistortion', 0.0, 1.0)
        .onChange(function (_) { updateUniforms(); });
    folderParameters.add(params, 'mouseDistortionWidth', 0.0, 5.0)
        .onChange(function (_) { updateUniforms(); });
    folderParameters.add(params, 'timeScale', 0.0, 0.02)
        .onChange(function (_) { updateUniforms(); });
    folderParameters.add(params, 'wireframe', 0.0, 0.02)
        .onChange(function (_) { updateMaterial(); });
    folderParameters.add(params, 'subdivision', 1, 50).step(1)
        .onChange(function (_) { createPlane(); });
    folderParameters.open();
}

var uniforms = {
    time: { type: "f", value: 1.0 },
    distortionX: { type: "f", value: params.distortionX },
    distortionY: { type: "f", value: params.distortionY },
    frequencyX: { type: "f", value: params.frequencyX },
    frequencyY: { type: "f", value: params.frequencyY },
    envelopeFrequencyX: { type: "f", value: params.envelopeFrequencyX },
    envelopeFrequencyY: { type: "f", value: params.envelopeFrequencyY },
    mouseDistortion: { type: "f", value: params.mouseDistortion },
    mouseDistortionWidth: { type: "f", value: params.mouseDistortionWidth },
    timeScale: { type: "f", value: params.timeScale },
    texture: { type: "t", value: THREE.ImageUtils.loadTexture("/images/logo_4k_stretched.png") },
    mousePosition: new THREE.Uniform(new THREE.Vector2(10000, 10000)),
    blendColor: { type: "c", value: new THREE.Color(0x5E06FA) }
};

var planeMaterial, width, height;

function createPlaneGeometry() {
    return new THREE.PlaneGeometry(IMAGE_ASPECT_RATIO, 1.0, params.subdivision * IMAGE_ASPECT_RATIO,
        params.subdivision);
}

function createPlane() {
    planeGeometry = createPlaneGeometry();
    planeMesh.geometry = planeGeometry;
}

function updateUniforms() {
    uniforms.distortionX = { type: "f", value: params.distortionX };
    uniforms.distortionY = { type: "f", value: params.distortionY };
    uniforms.frequencyX = { type: "f", value: params.frequencyX };
    uniforms.frequencyY = { type: "f", value: params.frequencyY };
    uniforms.envelopeFrequencyX = { type: "f", value: params.envelopeFrequencyX };
    uniforms.envelopeFrequencyY = { type: "f", value: params.envelopeFrequencyY };
    uniforms.mouseDistortion = { type: "f", value: params.mouseDistortion };
    uniforms.mouseDistortionWidth = { type: "f", value: params.mouseDistortionWidth };
    uniforms.timeScale = { type: "f", value: params.timeScale };
}

function updateMaterial() {
    planeMaterial.wireframe = params.wireframe;
}

function render() {
    requestAnimationFrame(render);

    if (params.animate) {
        var elapsedMilliseconds = Date.now() - startTime;
        var elapsedSeconds = elapsedMilliseconds / 1000.;
        uniforms.time.value = 60. * elapsedSeconds;
    }

    renderer.render(scene, camera);
}

function onMouseMove(event) {
    var mouseX = ((event.clientX / window.innerWidth) * 2 - 1) * width / 2;
    var mouseY = (-(event.clientY / window.innerHeight) * 2 + 1) * height / 2;

    uniforms.mousePosition = new THREE.Uniform(new THREE.Vector2(mouseX, mouseY));
}

function applyRotation(rotation) {
    if (rotation == 90) {
        planeMesh.rotation.z = 1.5707;
    } else if (rotation == -90) {
        planeMesh.rotation.z = -1.5707;
    } else {
        planeMesh.rotation.z = 0;
    }
}

////////////////////
// Initialization //
////////////////////

var scene = new THREE.Scene();
var canvas = document.getElementById("canvas");
height = CAMERA_WIDTH * (canvas.offsetHeight / canvas.offsetWidth);
width = CAMERA_WIDTH;
var camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 100);

var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});
var pixelRatio = window.devicePixelRatio || 1;
renderer.setPixelRatio(pixelRatio);
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

light = new THREE.DirectionalLight(0xffffff);
light.position.set(-1, 0.2, 1).normalize();
scene.add(light);

camera.position.set(0, 0, 50);
camera.lookAt(scene.position);
scene.add(camera);

var planeGeometry = createPlaneGeometry();
planeMaterial = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent,
    wireframe: params.wireframe,
    side: THREE.DoubleSide,
    transparent: true
});
var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

createPlane();
scene.add(planeMesh);

var startTime = Date.now();
render();

document.addEventListener( 'mousemove', onMouseMove, false );
