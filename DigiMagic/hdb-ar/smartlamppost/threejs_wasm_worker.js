function isMobile() {
    return /Android|mobile|iPad|iPhone/i.test(navigator.userAgent);
}

var interpolationFactor = 24;

var clock = new THREE.Clock();

var trackedMatrix = {
    // for interpolation
    delta: [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ],
    interpolated: [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ]
}

var markers = {
    "pinball": {
        width: 1637,
        height: 2048,
        dpi: 250,
        url: "DataNFT/pinball",
    },
};

var setMatrix = function (matrix, value) {
    var array = [];
    for (var key in value) {
        array[key] = value[key];
    }
    if (typeof matrix.elements.set === "function") {
        matrix.elements.set(array);
    } else {
        matrix.elements = [].slice.call(array);
    }
};

var plane_bg;
var plane_1;
var plane_2;
var plane_3;
var plane_top_1;
var plane_top_2;

var model1;//gltf
var model2;
var model3;
var model4;

//tools
var adjust_scale = 2;
var adjust_px = 380 / 10;
var adjust_py = 0;
var adjust_angle = 25;
//, side: THREE.DoubleSide

var p1_bicycle_video;
var p1_human2_video;
var p1_human3_video;

var bicycle_texture = new THREE.TextureLoader().load('assets/sprites/part1_bicycle.png');
SpriteAnimator.add({ texture: bicycle_texture, tilesHorizontal: 23, tilesVertical: 22, fps: 24, numberOfTiles: 500 });
var bicycle_animate = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial({ transparent: true, depthTest: false, map: bicycle_texture, side: THREE.DoubleSide }));

// // P1.
// var p1_bicycle_frame = 0;
// var p1_bicycle_duration = 0;
// var p1_bicycle_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p1_bicycle_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/01_Bicycle/01_Bicycle_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p1_bicycle_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/01_Bicycle/01_Bicycle_000' + count + '.png');
//     }
//     else {
//         p1_bicycle_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/01_Bicycle/01_Bicycle_00' + count + '.png');
//     }
// }
// var p1_human2_frame = 0;
// var p1_human2_duration = 0;
// var p1_human2_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p1_human2_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/02_Human/02_Human_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p1_human2_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/02_Human/02_Human_000' + count + '.png');
//     }
//     else {
//         p1_human2_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/02_Human/02_Human_00' + count + '.png');
//     }
// }
// var p1_human3_frame = 0;
// var p1_human3_duration = 0;
// var p1_human3_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p1_human3_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/03_Human/03_Human_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p1_human3_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/03_Human/03_Human_000' + count + '.png');
//     }
//     else {
//         p1_human3_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/03_Human/03_Human_00' + count + '.png');
//     }
// }
// var p1_human4_frame = 0;
// var p1_human4_duration = 0;
// var p1_human4_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p1_human4_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/04_Human/04_Human_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p1_human4_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/04_Human/04_Human_000' + count + '.png');
//     }
//     else {
//         p1_human4_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/04_Human/04_Human_00' + count + '.png');
//     }
// }
// var p1_human5_frame = 0;
// var p1_human5_duration = 0;
// var p1_human5_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p1_human5_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/05_Human/05_Human_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p1_human5_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/05_Human/05_Human_000' + count + '.png');
//     }
//     else {
//         p1_human5_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/05_Human/05_Human_00' + count + '.png');
//     }
// }
// var p1_human6_frame = 0;
// var p1_human6_duration = 0;
// var p1_human6_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p1_human6_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/06_Human/06_Human_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p1_human6_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/06_Human/06_Human_000' + count + '.png');
//     }
//     else {
//         p1_human6_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/06_Human/06_Human_00' + count + '.png');
//     }
// }
// var p1_icon_frame = 0;
// var p1_icon_duration = 0;
// var p1_icon_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p1_icon_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/Part01_Icon/Part01_Icon_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p1_icon_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/Part01_Icon/Part01_Icon_000' + count + '.png');
//     }
//     else {
//         p1_icon_textures[count] = new THREE.TextureLoader().load('assets/sprites/1/Part01_Icon/Part01_Icon_00' + count + '.png');
//     }
// }

// var p1_bicycle_material = new THREE.MeshBasicMaterial({ map: p1_bicycle_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
// var p1_human2_material = new THREE.MeshBasicMaterial({ map: p1_human2_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
// var p1_human3_material = new THREE.MeshBasicMaterial({ map: p1_human3_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
// var p1_human4_material = new THREE.MeshBasicMaterial({ map: p1_human4_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
// var p1_human5_material = new THREE.MeshBasicMaterial({ map: p1_human5_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
// var p1_human6_material = new THREE.MeshBasicMaterial({ map: p1_human6_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
// var p1_icon_material = new THREE.MeshBasicMaterial({ map: p1_icon_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });

// // P2.
// var p2_human1_frame = 0;
// var p2_human1_duration = 0;
// var p2_human1_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p2_human1_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/Human01/Human01_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p2_human1_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/Human01/Human01_000' + count + '.png');
//     }
//     else {
//         p2_human1_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/Human01/Human01_00' + count + '.png');
//     }
// }
// var p2_human2_frame = 0;
// var p2_human2_duration = 0;
// var p2_human2_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p2_human2_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/Human02/Human02_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p2_human2_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/Human02/Human02_000' + count + '.png');
//     }
//     else {
//         p2_human2_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/Human02/Human02_00' + count + '.png');
//     }
// }
// var p2_human3_frame = 0;
// var p2_human3_duration = 0;
// var p2_human3_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p2_human3_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/Human03/Human03_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p2_human3_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/Human03/Human03_000' + count + '.png');
//     }
//     else {
//         p2_human3_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/Human03/Human03_00' + count + '.png');
//     }
// }
// var p2_human4_frame = 0;
// var p2_human4_duration = 0;
// var p2_human4_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p2_human4_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/Human04/Human04_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p2_human4_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/Human04/Human04_000' + count + '.png');
//     }
//     else {
//         p2_human4_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/Human04/Human04_00' + count + '.png');
//     }
// }
// var p2_human5_frame = 0;
// var p2_human5_duration = 0;
// var p2_human5_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p2_human5_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/Human05/Human05_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p2_human5_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/Human05/Human05_000' + count + '.png');
//     }
//     else {
//         p2_human5_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/Human05/Human05_00' + count + '.png');
//     }
// }
// var p2_rain_frame = 0;
// var p2_rain_duration = 0;
// var p2_rain_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p2_rain_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/Rain02/Rain_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p2_rain_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/Rain02/Rain_000' + count + '.png');
//     }
//     else {
//         p2_rain_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/Rain02/Rain_00' + count + '.png');
//     }
// }
// var p2_icon_frame = 0;
// var p2_icon_duration = 0;
// var p2_icon_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p2_icon_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/PART02_Icon/PART02_Icon_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p2_icon_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/PART02_Icon/PART02_Icon_000' + count + '.png');
//     }
//     else {
//         p2_icon_textures[count] = new THREE.TextureLoader().load('assets/sprites/2/PART02_Icon/PART02_Icon_00' + count + '.png');
//     }
// }

// var p2_human1_material = new THREE.MeshBasicMaterial({ map: p2_human1_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
// var p2_human2_material = new THREE.MeshBasicMaterial({ map: p2_human2_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
// var p2_human3_material = new THREE.MeshBasicMaterial({ map: p2_human3_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
// var p2_human4_material = new THREE.MeshBasicMaterial({ map: p2_human4_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
// var p2_human5_material = new THREE.MeshBasicMaterial({ map: p2_human5_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
// var p2_rain_material = new THREE.MeshBasicMaterial({ map: p2_rain_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
// var p2_icon_material = new THREE.MeshBasicMaterial({ map: p2_icon_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });

// // P3.
// var p3_human1_frame = 0;
// var p3_human1_duration = 0;
// var p3_human1_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p3_human1_textures[count] = new THREE.TextureLoader().load('assets/sprites/3/Human01/Human01_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p3_human1_textures[count] = new THREE.TextureLoader().load('assets/sprites/3/Human01/Human01_000' + count + '.png');
//     }
//     else {
//         p3_human1_textures[count] = new THREE.TextureLoader().load('assets/sprites/3/Human01/Human01_00' + count + '.png');
//     }
// }
// var p3_human2_frame = 0;
// var p3_human2_duration = 0;
// var p3_human2_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p3_human2_textures[count] = new THREE.TextureLoader().load('assets/sprites/3/Human02/Human02_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p3_human2_textures[count] = new THREE.TextureLoader().load('assets/sprites/3/Human02/Human02_000' + count + '.png');
//     }
//     else {
//         p3_human2_textures[count] = new THREE.TextureLoader().load('assets/sprites/3/Human02/Human02_00' + count + '.png');
//     }
// }
// var p3_human3_frame = 0;
// var p3_human3_duration = 0;
// var p3_human3_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p3_human3_textures[count] = new THREE.TextureLoader().load('assets/sprites/3/Human03/Human03_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p3_human3_textures[count] = new THREE.TextureLoader().load('assets/sprites/3/Human03/Human03_000' + count + '.png');
//     }
//     else {
//         p3_human3_textures[count] = new THREE.TextureLoader().load('assets/sprites/3/Human03/Human03_00' + count + '.png');
//     }
// }
// var p3_human4_frame = 0;
// var p3_human4_duration = 0;
// var p3_human4_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p3_human4_textures[count] = new THREE.TextureLoader().load('assets/sprites/3/Human04/Human04_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p3_human4_textures[count] = new THREE.TextureLoader().load('assets/sprites/3/Human04/Human04_000' + count + '.png');
//     }
//     else {
//         p3_human4_textures[count] = new THREE.TextureLoader().load('assets/sprites/3/Human04/Human04_00' + count + '.png');
//     }
// }
// var p3_human5_frame = 0;
// var p3_human5_duration = 0;
// var p3_human5_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p3_human5_textures[count] = new THREE.TextureLoader().load('assets/sprites/3/Human05/Human05_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p3_human5_textures[count] = new THREE.TextureLoader().load('assets/sprites/3/Human05/Human05_000' + count + '.png');
//     }
//     else {
//         p3_human5_textures[count] = new THREE.TextureLoader().load('assets/sprites/3/Human05/Human05_00' + count + '.png');
//     }
// }
// var p3_icon_frame = 0;
// var p3_icon_duration = 0;
// var p3_icon_textures = [];
// for (count = 0; count < 500; count++) {
//     if (count < 10) {
//         p3_icon_textures[count] = new THREE.TextureLoader().load('assets/sprites/3/Part03_Icon/Part03_Icon_0000' + count + '.png');
//     }
//     else if (count >= 10 && count < 100) {
//         p3_icon_textures[count] = new THREE.TextureLoader().load('assets/sprites/3/Part03_Icon/Part03_Icon_000' + count + '.png');
//     }
//     else {
//         p3_icon_textures[count] = new THREE.TextureLoader().load('assets/sprites/3/Part03_Icon/Part03_Icon_00' + count + '.png');
//     }
// }

// var p3_human1_material = new THREE.MeshBasicMaterial({ map: p3_human1_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
// var p3_human2_material = new THREE.MeshBasicMaterial({ map: p3_human2_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
// var p3_human3_material = new THREE.MeshBasicMaterial({ map: p3_human3_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
// var p3_human4_material = new THREE.MeshBasicMaterial({ map: p3_human4_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
// var p3_human5_material = new THREE.MeshBasicMaterial({ map: p3_human5_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
// var p3_icon_material = new THREE.MeshBasicMaterial({ map: p3_icon_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });

//var worker;
function start(container, marker, video, input_width, input_height, canvas_draw, render_update, track_update) {
    worker = new Worker('wasm_worker/artoolkit.wasm_worker.js');
    worker.onmessage = function (ev) {
        start2(container, marker, video, input_width, input_height, canvas_draw, render_update, track_update);
    }
}

function start2(container, marker, video, input_width, input_height, canvas_draw, render_update, track_update) {
    var vw, vh;
    var sw, sh;
    var pscale, sscale;
    var w, h;
    var pw, ph;
    var ox, oy;
    var camera_para = './../Data/camera_para-iPhone 5 rear 640x480 1.0m.dat';

    var canvas_process = document.createElement('canvas');
    var context_process = canvas_process.getContext('2d');

    var renderer = new THREE.WebGLRenderer({ canvas: canvas_draw, alpha: true, antialias: true, logarithmicDepthBuffer: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    var scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 350);
    scene.add(camera);
    //var camera = new THREE.Camera();
    //camera.matrixAutoUpdate = false;


    var light = new THREE.AmbientLight(0xffffff, 0.30);
    scene.add(light);

    var direct_light = new THREE.DirectionalLight(0xffffff, 1);
    direct_light.position.set(1, 1, 2);
    scene.add(direct_light);

    ///
    var step = 1;

    var root = new THREE.Object3D();
    scene.add(root);
    root.visible = false;

    // Create video object
    let video2 = document.createElement('video');
    video2.src = "video/01_Color.mp4"; // Set video address
    video2.autoplay = "autoplay"; // To set up playback
    video2.loop = true;
    // Video object is used as VideoTexture parameter to create texture object
    // var texture = new THREE.VideoTexture(video2)
    // var geometry = new THREE.PlaneGeometry(108, 71); // rectangular plane
    // var material = new THREE.MeshPhongMaterial({
    //     map: texture, // Set texture map
    // }); // Material object Material
    // var mesh = new THREE.Mesh(geometry, material); // Mesh model object Mesh
    // scene.add(mesh); // The mesh model is added to the scene

    console.log("xxxxxx4")
    p1_bicycle_video = document.createElement('video');
    //p1_bicycle_video.src = "video/01_Color.mp4";
    p1_bicycle_video.src = "video/test.webm";
    p1_bicycle_video.playsInline = true;
    p1_bicycle_video.autoplay = "autoplay";
    p1_bicycle_video.loop = true;
    p1_bicycle_video.crossOrigin = "anonymous";
    p1_bicycle_video.onloadeddata = function () {
        console.log("play")
        p1_bicycle_video.play();
    };

    var p1_bicycle_video_texture = new THREE.VideoTexture(p1_bicycle_video);
    p1_bicycle_video_texture.minFilter = THREE.LinearFilter;
    p1_bicycle_video_texture.magFilter = THREE.LinearFilter;
    p1_bicycle_video_texture.format = THREE.RGBAFormat;

    p1_human2_video = document.createElement('video');
    p1_human2_video.src = "video/test.webm";
    p1_human2_video.playsInline = true;
    p1_human2_video.autoplay = "autoplay";
    p1_human2_video.loop = true;
    p1_human2_video.crossOrigin = "anonymous";
    p1_human2_video.onloadeddata = function () {
        p1_human2_video.play();
    };

    var p1_human2_video_texture = new THREE.VideoTexture(p1_human2_video);
    p1_human2_video_texture.minFilter = THREE.LinearFilter;
    p1_human2_video_texture.magFilter = THREE.LinearFilter;
    p1_human2_video_texture.format = THREE.RGBAFormat;

    var p1_bicycle_material = new THREE.MeshPhongMaterial({ map: p1_bicycle_video_texture, transparent: true, side: THREE.DoubleSide, opacity: 1, alphaMap: p1_bicycle_video_texture });
    var p1_human2_material = new THREE.MeshPhongMaterial({ map: p1_human2_video_texture, transparent: true, side: THREE.DoubleSide, opacity: 1 });

    var updateFcts = [];
    var p1_human3_video_texture = new THREEx.VideoTexture("video/sintel.ogv");
    p1_human3_video	= p1_human3_video_texture.video;
    p1_human3_video.muted = true;
    updateFcts.push(function (delta, now) {
        p1_human3_video_texture.update(delta, now);
        console.log("XXXXX " + delta);
    })

    //var p1_human3_material = new THREE.MeshPhongMaterial({ map: p1_human3_video_texture.texture, transparent: true, side: THREE.DoubleSide, opacity: 1 });
    var p1_human3_material = new THREE.MeshPhongMaterial({ map: p1_human3_video_texture.texture, side: THREE.DoubleSide, opacity: 1 });
    // var geometry = new THREE.PlaneGeometry(108, 71);
    // var mesh = new THREE.Mesh(geometry,  p1_bicycle_material);
    // scene.add(mesh);

    p1_human4_video = document.getElementById('video_test');

    var p1_human4_video_texture = new THREE.VideoTexture(p1_human4_video);
    p1_human4_video_texture.minFilter = THREE.LinearFilter;
    p1_human4_video_texture.magFilter = THREE.LinearFilter;
    p1_human4_video_texture.format = THREE.RGBAFormat;

    var p1_human4_material = new THREE.MeshPhongMaterial({ map: p1_human2_video_texture, transparent: true, side: THREE.DoubleSide, opacity: 1 });

    /* Load Model */
    var threeGLTFLoader1 = new THREE.GLTFLoader();
    threeGLTFLoader1.load("Data/models/smartlamppost1.gltf", function (gltf) {
        model1 = gltf.scene;

        model1.position.x = 0;
        model1.position.y = 0;
        model1.position.z = 0;

        model1.scale.x = model1.scale.y = model1.scale.z = 0.5;

        model1.visible = true;

        var tree1_1;
        var tree1_2;
        var bg1_1;
        var floor1_1;
        var lamppost1_1;
        var lamppost1_2a;
        var lamppost1_2b;

        console.log("model1");
        console.log(model1);
        for (count = 0; count < model1.children.length; count++) {
            console.log(model1.children[count]);
            if (model1.children[count].name == "Tree01") {
                console.log("Tree01 LV1");
                tree1_1 = model1.children[count];
            }
            if (model1.children[count].name == "Tree02") {
                console.log("Tree02 LV1");
                tree1_2 = model1.children[count];
            }
            if (model1.children[count].name == "BG") {
                console.log("BG LV1");
                bg1_1 = model1.children[count];
            }
            if (model1.children[count].name == "Lamppost01") {
                console.log("Lamppost01 LV1");
                lamppost1_1 = model1.children[count];
            }
            if (model1.children[count].name == "Lamppost02a") {
                console.log("Lampost01a LV1");
                lamppost1_2a = model1.children[count];
            }
            if (model1.children[count].name == "Lamppost02b") {
                console.log("Lampost02b LV1");
                lamppost1_2b = model1.children[count];
            }
            if (model1.children[count].name == "Cube") {
                console.log("Cube LV1");
                floor1_1 = model1.children[count];
            }
        }

        // tree 1.
        if (tree1_1 != undefined) {
            tree1_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/tree01.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
            tree1_1.material.needsUpdate = true;

            tree1_1.rotation.y = 180 * 0.0174532925;
            tree1_1.rotation.z = 180 * 0.0174532925;
        }

        // tree 2.
        if (tree1_2 != undefined) {
            tree1_2.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/tree02.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
            tree1_2.material.needsUpdate = true;

            tree1_2.rotation.y = 180 * 0.0174532925;
            tree1_2.rotation.z = 180 * 0.0174532925;
        }

        // BG.
        if (bg1_1 != undefined) {
            //bg1_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/bg.png'), opacity: 1, depthTest: false, transparent: false, side: THREE.DoubleSide });
            bg1_1.material = p1_human4_material;
            bg1_1.material.needsUpdate = true;

            bg1_1.rotation.y = 180 * 0.0174532925;
            bg1_1.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 1.
        if (lamppost1_1 != undefined) {
            //lamppost1_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost01.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
            lamppost1_1.material = p1_bicycle_material;
            lamppost1_1.material.needsUpdate = true;

            lamppost1_1.rotation.y = 180 * 0.0174532925;
            lamppost1_1.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 2a.
        if (lamppost1_2a != undefined) {
            //lamppost1_2a.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost02.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
            lamppost1_2a.material = p1_human2_material;
            lamppost1_2a.material.needsUpdate = true;

            lamppost1_2a.rotation.y = 180 * 0.0174532925;
            lamppost1_2a.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 2b.
        if (lamppost1_2b != undefined) {
            //lamppost1_2b.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost02.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
            lamppost1_2b.material = p1_human3_material;
            lamppost1_2b.material.needsUpdate = true;

            lamppost1_2b.rotation.y = 180 * 0.0174532925;
            lamppost1_2b.rotation.z = 180 * 0.0174532925;
        }

        // floor.
        if (floor1_1 != undefined) {
            floor1_1.material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/floor.png'), opacity: 1, depthTest: true, transparent: false, side: THREE.DoubleSide });
            floor1_1.material.needsUpdate = true;
        }

        root.add(model1);
    });

    // var threeGLTFLoader2 = new THREE.GLTFLoader();
    // threeGLTFLoader2.load("Data/models/smartlamppost2.gltf", function (gltf) {
    //     model2 = gltf.scene;

    //     model2.position.x = 0;
    //     model2.position.y = 0;
    //     model2.position.z = 0;

    //     model2.scale.x = model2.scale.y = model2.scale.z = 0.5;

    //     model2.visible = false;

    //     var tree2_1;
    //     var tree2_2;
    //     var bg2_1;
    //     var floor2_1;
    //     var lamppost2_1;
    //     var lamppost2_2a;
    //     var lamppost2_2b;
    //     var bicycle2_1;
    //     var human2_2;
    //     var human2_3;
    //     var human2_4;
    //     var human2_5;
    //     var human2_6;
    //     var icon2_1;

    //     console.log("model2");
    //     console.log(model2);
    //     for (count = 0; count < model2.children.length; count++) {
    //         console.log(model2.children[count]);
    //         if (model2.children[count].name == "Tree01") {
    //             console.log("Tree01 LV1");
    //             tree2_1 = model2.children[count];
    //         }
    //         if (model2.children[count].name == "Tree02") {
    //             console.log("Tree02 LV1");
    //             tree2_2 = model2.children[count];
    //         }
    //         if (model2.children[count].name == "BG") {
    //             console.log("BG LV1");
    //             bg2_1 = model2.children[count];
    //         }
    //         if (model2.children[count].name == "Lamppost01") {
    //             console.log("Lamppost01 LV1");
    //             lamppost2_1 = model2.children[count];
    //         }
    //         if (model2.children[count].name == "Lamppost02a") {
    //             console.log("Lampost01a LV1");
    //             lamppost2_2a = model2.children[count];
    //         }
    //         if (model2.children[count].name == "Lamppost02b") {
    //             console.log("Lampost02b LV1");
    //             lamppost2_2b = model2.children[count];
    //         }
    //         if (model2.children[count].name == "Cube") {
    //             console.log("Cube LV1");
    //             floor2_1 = model2.children[count];
    //         }
    //         if (model2.children[count].name == "Bicycle") {
    //             console.log("Bicycle LV1");
    //             bicycle2_1 = model2.children[count];
    //         }
    //         if (model2.children[count].name == "Human02") {
    //             console.log("Human02 LV1");
    //             human2_2 = model2.children[count];
    //         }
    //         if (model2.children[count].name == "Human03") {
    //             console.log("Human03 LV1");
    //             human2_3 = model2.children[count];
    //         }
    //         if (model2.children[count].name == "Human04") {
    //             console.log("Human04 LV1");
    //             human2_4 = model2.children[count];
    //         }
    //         if (model2.children[count].name == "Human05") {
    //             console.log("Human05 LV1");
    //             human2_5 = model2.children[count];
    //         }
    //         if (model2.children[count].name == "Human06") {
    //             console.log("Human06 LV1");
    //             human2_6 = model2.children[count];
    //         }
    //         if (model2.children[count].name == "Icon") {
    //             console.log("Icon LV1");
    //             icon2_1 = model2.children[count];
    //         }
    //     }

    //     // tree 1.
    //     if (tree2_1 != undefined) {
    //         tree2_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/tree01.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
    //         tree2_1.material.needsUpdate = true;

    //         tree2_1.rotation.y = 180 * 0.0174532925;
    //         tree2_1.rotation.z = 180 * 0.0174532925;
    //     }

    //     // tree 2.
    //     if (tree2_2 != undefined) {
    //         tree2_2.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/tree02.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
    //         tree2_2.material.needsUpdate = true;

    //         tree2_2.rotation.y = 180 * 0.0174532925;
    //         tree2_2.rotation.z = 180 * 0.0174532925;
    //     }

    //     // BG.
    //     if (bg2_1 != undefined) {
    //         bg2_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/bg.png'), opacity: 1, depthTest: false, transparent: false, side: THREE.DoubleSide });
    //         bg2_1.material.needsUpdate = true;

    //         bg2_1.rotation.y = 180 * 0.0174532925;
    //         bg2_1.rotation.z = 180 * 0.0174532925;
    //     }

    //     // lamppost 1.
    //     if (lamppost2_1 != undefined) {
    //         lamppost2_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost01_light.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
    //         lamppost2_1.material.needsUpdate = true;

    //         lamppost2_1.rotation.y = 180 * 0.0174532925;
    //         lamppost2_1.rotation.z = 180 * 0.0174532925;
    //     }

    //     // lamppost 2a.
    //     if (lamppost2_2a != undefined) {
    //         lamppost2_2a.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost02_light.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
    //         lamppost2_2a.material.needsUpdate = true;

    //         lamppost2_2a.rotation.y = 180 * 0.0174532925;
    //         lamppost2_2a.rotation.z = 180 * 0.0174532925;
    //     }

    //     // lamppost 2b.
    //     if (lamppost2_2b != undefined) {
    //         lamppost2_2b.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost02_light.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
    //         lamppost2_2b.material.needsUpdate = true;

    //         lamppost2_2b.rotation.y = 180 * 0.0174532925;
    //         lamppost2_2b.rotation.z = 180 * 0.0174532925;
    //     }

    //     // floor.
    //     if (floor2_1 != undefined) {
    //         floor2_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/floor.png'), opacity: 1, depthTest: true, transparent: false, side: THREE.DoubleSide });
    //         floor2_1.material.needsUpdate = true;
    //     }

    //     // bicycle.
    //     if (bicycle2_1 != undefined) {
    //         bicycle2_1.material = p1_bicycle_material;
    //         bicycle2_1.material.needsUpdate = true;

    //         bicycle2_1.rotation.y = 180 * 0.0174532925;
    //         bicycle2_1.rotation.z = 180 * 0.0174532925;
    //     }

    //     if (human2_2 != undefined) {
    //         human2_2.material = p1_human2_material;
    //         human2_2.material.needsUpdate = true;

    //         human2_2.rotation.y = 180 * 0.0174532925;
    //         human2_2.rotation.z = 180 * 0.0174532925;
    //     }

    //     if (human2_3 != undefined) {
    //         human2_3.material = p1_human3_material;
    //         human2_3.material.needsUpdate = true;

    //         human2_3.rotation.y = 180 * 0.0174532925;
    //         human2_3.rotation.z = 180 * 0.0174532925;
    //     }

    //     if (human2_4 != undefined) {
    //         human2_4.material = p1_human4_material;
    //         human2_4.material.needsUpdate = true;

    //         human2_4.rotation.y = 180 * 0.0174532925;
    //         human2_4.rotation.z = 180 * 0.0174532925;
    //     }

    //     if (human2_5 != undefined) {
    //         human2_5.material = p1_human5_material;
    //         human2_5.material.needsUpdate = true;

    //         human2_5.rotation.y = 180 * 0.0174532925;
    //         human2_5.rotation.z = 180 * 0.0174532925;
    //     }

    //     if (human2_6 != undefined) {
    //         human2_6.material = p1_human6_material;
    //         human2_6.material.needsUpdate = true;

    //         human2_6.rotation.y = 180 * 0.0174532925;
    //         human2_6.rotation.z = 180 * 0.0174532925;
    //     }

    //     if (icon2_1 != undefined) {
    //         icon2_1.material = p1_icon_material;
    //         icon2_1.material.needsUpdate = true;

    //         icon2_1.rotation.y = 180 * 0.0174532925;
    //         icon2_1.rotation.z = 180 * 0.0174532925;
    //     }

    //     root.add(model2);
    // });

    // var threeGLTFLoader3 = new THREE.GLTFLoader();
    // threeGLTFLoader3.load("Data/models/smartlamppost3.gltf", function (gltf) {
    //     model3 = gltf.scene;

    //     model3.position.x = 0;
    //     model3.position.y = 0;
    //     model3.position.z = 0;

    //     model3.scale.x = model3.scale.y = model3.scale.z = 0.5;

    //     model3.visible = false;

    //     var tree3_1;
    //     var tree3_2;
    //     var bg3_1;
    //     var floor3_1;
    //     var lamppost3_1;
    //     var lamppost3_2a;
    //     var lamppost3_2b;
    //     var human3_1;
    //     var human3_2;
    //     var human3_3;
    //     var human3_4;
    //     var human3_5;
    //     var rain3_1;
    //     var icon3_1;

    //     console.log("model3");
    //     console.log(model3);
    //     for (count = 0; count < model3.children.length; count++) {
    //         console.log(model3.children[count]);
    //         if (model3.children[count].name == "Tree01") {
    //             console.log("Tree01 LV1");
    //             tree3_1 = model3.children[count];
    //         }
    //         if (model3.children[count].name == "Tree02") {
    //             console.log("Tree02 LV1");
    //             tree3_2 = model3.children[count];
    //         }
    //         if (model3.children[count].name == "BG") {
    //             console.log("BG LV1");
    //             bg3_1 = model3.children[count];
    //         }
    //         if (model3.children[count].name == "Lamppost01") {
    //             console.log("Lamppost01 LV1");
    //             lamppost3_1 = model3.children[count];
    //         }
    //         if (model3.children[count].name == "Lamppost02a") {
    //             console.log("Lampost01a LV1");
    //             lamppost3_2a = model3.children[count];
    //         }
    //         if (model3.children[count].name == "Lamppost02b") {
    //             console.log("Lampost02b LV1");
    //             lamppost3_2b = model3.children[count];
    //         }
    //         if (model3.children[count].name == "Cube") {
    //             console.log("Cube LV1");
    //             floor3_1 = model3.children[count];
    //         }
    //         if (model3.children[count].name == "Human01") {
    //             console.log("Human01 LV1");
    //             human3_1 = model3.children[count];
    //         }
    //         if (model3.children[count].name == "Human02") {
    //             console.log("Human02 LV1");
    //             human3_2 = model3.children[count];
    //         }
    //         if (model3.children[count].name == "Human03") {
    //             console.log("Human03 LV1");
    //             human3_3 = model3.children[count];
    //         }
    //         if (model3.children[count].name == "Human04") {
    //             console.log("Human04 LV1");
    //             human3_4 = model3.children[count];
    //         }
    //         if (model3.children[count].name == "Human05") {
    //             console.log("Human05 LV1");
    //             human3_5 = model3.children[count];
    //         }
    //         if (model3.children[count].name == "Rain") {
    //             console.log("Rain LV1");
    //             rain3_1 = model3.children[count];
    //         }
    //         if (model3.children[count].name == "Icon") {
    //             console.log("Icon LV1");
    //             icon3_1 = model3.children[count];
    //         }
    //     }

    //     // tree 1.
    //     if (tree3_1 != undefined) {
    //         tree3_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/tree01.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
    //         tree3_1.material.needsUpdate = true;

    //         tree3_1.rotation.y = 180 * 0.0174532925;
    //         tree3_1.rotation.z = 180 * 0.0174532925;
    //     }

    //     // tree 2.
    //     if (tree3_2 != undefined) {
    //         tree3_2.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/tree02.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
    //         tree3_2.material.needsUpdate = true;

    //         tree3_2.rotation.y = 180 * 0.0174532925;
    //         tree3_2.rotation.z = 180 * 0.0174532925;
    //     }

    //     // BG.
    //     if (bg3_1 != undefined) {
    //         bg3_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/bg.png'), opacity: 1, depthTest: false, transparent: false, side: THREE.DoubleSide });
    //         bg3_1.material.needsUpdate = true;

    //         bg3_1.rotation.y = 180 * 0.0174532925;
    //         bg3_1.rotation.z = 180 * 0.0174532925;
    //     }

    //     // lamppost 1.
    //     if (lamppost3_1 != undefined) {
    //         lamppost3_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost01_light.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
    //         lamppost3_1.material.needsUpdate = true;

    //         lamppost3_1.rotation.y = 180 * 0.0174532925;
    //         lamppost3_1.rotation.z = 180 * 0.0174532925;
    //     }

    //     // lamppost 2a.
    //     if (lamppost3_2a != undefined) {
    //         lamppost3_2a.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost02_light.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
    //         lamppost3_2a.material.needsUpdate = true;

    //         lamppost3_2a.rotation.y = 180 * 0.0174532925;
    //         lamppost3_2a.rotation.z = 180 * 0.0174532925;
    //     }

    //     // lamppost 2b.
    //     if (lamppost3_2b != undefined) {
    //         lamppost3_2b.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost02_light.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
    //         lamppost3_2b.material.needsUpdate = true;

    //         lamppost3_2b.rotation.y = 180 * 0.0174532925;
    //         lamppost3_2b.rotation.z = 180 * 0.0174532925;
    //     }

    //     // floor.
    //     if (floor3_1 != undefined) {
    //         floor3_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/floor.png'), opacity: 1, depthTest: true, transparent: false, side: THREE.DoubleSide });
    //         floor3_1.material.needsUpdate = true;
    //     }

    //     // bicycle.
    //     if (human3_1 != undefined) {
    //         human3_1.material = p2_human1_material;
    //         human3_1.material.needsUpdate = true;

    //         human3_1.rotation.y = 180 * 0.0174532925;
    //         human3_1.rotation.z = 180 * 0.0174532925;
    //     }

    //     if (human3_2 != undefined) {
    //         human3_2.material = p2_human2_material;
    //         human3_2.material.needsUpdate = true;

    //         human3_2.rotation.y = 180 * 0.0174532925;
    //         human3_2.rotation.z = 180 * 0.0174532925;
    //     }

    //     if (human3_3 != undefined) {
    //         human3_3.material = p2_human3_material;
    //         human3_3.material.needsUpdate = true;

    //         human3_3.rotation.y = 180 * 0.0174532925;
    //         human3_3.rotation.z = 180 * 0.0174532925;
    //     }

    //     if (human3_4 != undefined) {
    //         human3_4.material = p2_human4_material;
    //         human3_4.material.needsUpdate = true;

    //         human3_4.rotation.y = 180 * 0.0174532925;
    //         human3_4.rotation.z = 180 * 0.0174532925;
    //     }

    //     if (human3_5 != undefined) {
    //         human3_5.material = p2_human5_material;
    //         human3_5.material.needsUpdate = true;

    //         human3_5.rotation.y = 180 * 0.0174532925;
    //         human3_5.rotation.z = 180 * 0.0174532925;
    //     }

    //     if (rain3_1 != undefined) {
    //         rain3_1.material = p2_rain_material;
    //         rain3_1.material.needsUpdate = true;

    //         rain3_1.rotation.y = 180 * 0.0174532925;
    //         rain3_1.rotation.z = 180 * 0.0174532925;
    //     }

    //     if (icon3_1 != undefined) {
    //         icon3_1.material = p2_icon_material;
    //         icon3_1.material.needsUpdate = true;

    //         icon3_1.rotation.y = 180 * 0.0174532925;
    //         icon3_1.rotation.z = 180 * 0.0174532925;
    //     }

    //     root.add(model3);
    // });

    // var threeGLTFLoader4 = new THREE.GLTFLoader();
    // threeGLTFLoader4.load("Data/models/smartlamppost4.gltf", function (gltf) {
    //     model4 = gltf.scene;

    //     model4.position.x = 0;
    //     model4.position.y = 0;
    //     model4.position.z = 0;

    //     model4.scale.x = model4.scale.y = model4.scale.z = 0.5;

    //     model4.visible = false;

    //     var tree4_1;
    //     var tree4_2;
    //     var bg4_1;
    //     var floor4_1;
    //     var lamppost4_1;
    //     var lamppost4_2a;
    //     var lamppost4_2b;
    //     var human4_1;
    //     var human4_2;
    //     var human4_3;
    //     var human4_4;
    //     var human4_5;
    //     var icon4_1;

    //     console.log("model4");
    //     console.log(model4);
    //     for (count = 0; count < model4.children.length; count++) {
    //         console.log(model4.children[count]);
    //         if (model4.children[count].name == "Tree01") {
    //             console.log("Tree01 LV1");
    //             tree4_1 = model4.children[count];
    //         }
    //         if (model4.children[count].name == "Tree02") {
    //             console.log("Tree02 LV1");
    //             tree4_2 = model4.children[count];
    //         }
    //         if (model4.children[count].name == "BG") {
    //             console.log("BG LV1");
    //             bg4_1 = model4.children[count];
    //         }
    //         if (model4.children[count].name == "Lamppost01") {
    //             console.log("Lamppost01 LV1");
    //             lamppost4_1 = model4.children[count];
    //         }
    //         if (model4.children[count].name == "Lamppost02a") {
    //             console.log("Lampost01a LV1");
    //             lamppost4_2a = model4.children[count];
    //         }
    //         if (model4.children[count].name == "Lamppost02b") {
    //             console.log("Lampost02b LV1");
    //             lamppost4_2b = model4.children[count];
    //         }
    //         if (model4.children[count].name == "Cube") {
    //             console.log("Cube LV1");
    //             floor4_1 = model4.children[count];
    //         }
    //         if (model4.children[count].name == "Human01") {
    //             console.log("Human01 LV1");
    //             human4_1 = model4.children[count];
    //         }
    //         if (model4.children[count].name == "Human02") {
    //             console.log("Human02 LV1");
    //             human4_2 = model4.children[count];
    //         }
    //         if (model4.children[count].name == "Human03") {
    //             console.log("Human03 LV1");
    //             human4_3 = model4.children[count];
    //         }
    //         if (model4.children[count].name == "Human04") {
    //             console.log("Human04 LV1");
    //             human4_4 = model4.children[count];
    //         }
    //         if (model4.children[count].name == "Human05") {
    //             console.log("Human05 LV1");
    //             human4_5 = model4.children[count];
    //         }
    //         if (model4.children[count].name == "Icon") {
    //             console.log("Icon LV1");
    //             icon4_1 = model4.children[count];
    //         }
    //     }

    //     // tree 1.
    //     if (tree4_1 != undefined) {
    //         tree4_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/tree01.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
    //         tree4_1.material.needsUpdate = true;

    //         tree4_1.rotation.y = 180 * 0.0174532925;
    //         tree4_1.rotation.z = 180 * 0.0174532925;
    //     }

    //     // tree 2.
    //     if (tree4_2 != undefined) {
    //         tree4_2.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/tree02.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
    //         tree4_2.material.needsUpdate = true;

    //         tree4_2.rotation.y = 180 * 0.0174532925;
    //         tree4_2.rotation.z = 180 * 0.0174532925;
    //     }

    //     // BG.
    //     if (bg4_1 != undefined) {
    //         bg4_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/bg.png'), opacity: 1, depthTest: false, transparent: false, side: THREE.DoubleSide });
    //         bg4_1.material.needsUpdate = true;

    //         bg4_1.rotation.y = 180 * 0.0174532925;
    //         bg4_1.rotation.z = 180 * 0.0174532925;
    //     }

    //     // lamppost 1.
    //     if (lamppost4_1 != undefined) {
    //         lamppost4_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost01_light.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
    //         lamppost4_1.material.needsUpdate = true;

    //         lamppost4_1.rotation.y = 180 * 0.0174532925;
    //         lamppost4_1.rotation.z = 180 * 0.0174532925;
    //     }

    //     // lamppost 2a.
    //     if (lamppost4_2a != undefined) {
    //         lamppost4_2a.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost02_light.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
    //         lamppost4_2a.material.needsUpdate = true;

    //         lamppost4_2a.rotation.y = 180 * 0.0174532925;
    //         lamppost4_2a.rotation.z = 180 * 0.0174532925;
    //     }

    //     // lamppost 2b.
    //     if (lamppost4_2b != undefined) {
    //         lamppost4_2b.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost02_light.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
    //         lamppost4_2b.material.needsUpdate = true;

    //         lamppost4_2b.rotation.y = 180 * 0.0174532925;
    //         lamppost4_2b.rotation.z = 180 * 0.0174532925;
    //     }

    //     // floor.
    //     if (floor4_1 != undefined) {
    //         floor4_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/floor.png'), opacity: 1, depthTest: true, transparent: false, side: THREE.DoubleSide });
    //         floor4_1.material.needsUpdate = true;
    //     }

    //     // Human.
    //     if (human4_1 != undefined) {
    //         human4_1.material = p3_human1_material;
    //         human4_1.material.needsUpdate = true;

    //         human4_1.rotation.y = 180 * 0.0174532925;
    //         human4_1.rotation.z = 180 * 0.0174532925;
    //     }

    //     if (human4_2 != undefined) {
    //         human4_2.material = p3_human2_material;
    //         human4_2.material.needsUpdate = true;

    //         human4_2.rotation.y = 180 * 0.0174532925;
    //         human4_2.rotation.z = 180 * 0.0174532925;
    //     }

    //     if (human4_3 != undefined) {
    //         human4_3.material = p3_human4_material;
    //         human4_3.material.needsUpdate = true;

    //         human4_3.rotation.y = 180 * 0.0174532925;
    //         human4_3.rotation.z = 180 * 0.0174532925;
    //     }

    //     if (human4_4 != undefined) {
    //         human4_4.material = p3_human4_material;
    //         human4_4.material.needsUpdate = true;

    //         human4_4.rotation.y = 180 * 0.0174532925;
    //         human4_4.rotation.z = 180 * 0.0174532925;
    //     }

    //     if (human4_5 != undefined) {
    //         human4_5.material = p3_human5_material;
    //         human4_5.material.needsUpdate = true;

    //         human4_5.rotation.y = 180 * 0.0174532925;
    //         human4_5.rotation.z = 180 * 0.0174532925;
    //     }

    //     if (icon4_1 != undefined) {
    //         icon4_1.material = p3_icon_material;
    //         icon4_1.material.needsUpdate = true;

    //         icon4_1.rotation.y = 180 * 0.0174532925;
    //         icon4_1.rotation.z = 180 * 0.0174532925;
    //     }

    //     root.add(model4);
    // });

    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 8, 8),
        new THREE.MeshNormalMaterial()
    );
    //root.add(sphere);
    // scene.add(sphere);

    /* sphere.material.flatShading;
      sphere.position.z = 0;
      sphere.position.x = 100;
      sphere.position.y = 100;
      sphere.scale.set(200, 200, 200);
  
      root.matrixAutoUpdate = false;
      root.add(sphere);*/

    //rotate model

    var three = THREE;
    var isDragging = false;
    var previousMousePosition = {
        x: 0,
        y: 0
    };
    //desktop
    document.addEventListener('mousedown', downScreen, false);
    document.addEventListener('mousemove', moveScreen, false);
    document.addEventListener('mouseup', upScreen, false);
    //
    document.addEventListener('touchstart', downScreen, false);
    document.addEventListener('touchmove', moveScreen2, false);
    document.addEventListener('touchend', upScreen, false);

    function downScreen(e) {
        console.log("downscreen");
        isDragging = true;

        p1_bicycle_video.play();
        p1_human2_video.play();
        p1_human3_video.play();
    }

    function moveScreen(e) {
        console.log("movescreen");

        //console.log(e);
        var deltaMove = {
            x: e.offsetX - previousMousePosition.x,
            y: e.offsetY - previousMousePosition.y
        };
        //toRadians(deltaMove.y * 1)
        if (isDragging) {

            var deltaRotationQuaternion = new three.Quaternion()
                .setFromEuler(new three.Euler(
                    0,
                    toRadians(deltaMove.x * 1),
                    0,
                    'XYZ'
                ));

            model.quaternion.multiplyQuaternions(deltaRotationQuaternion, model.quaternion);
        }
        previousMousePosition = {
            x: e.offsetX,
            y: e.offsetY
        };
    }
    function moveScreen2(e) {
        console.log("movescreen");

        //console.log(e);
        var deltaMove = {
            x: e.touches[0].offsetX - previousMousePosition.x,
            y: e.touches[0].offsetY - previousMousePosition.y
        };
        //toRadians(deltaMove.y * 1)
        if (isDragging) {

            var deltaRotationQuaternion = new three.Quaternion()
                .setFromEuler(new three.Euler(
                    0,
                    toRadians(deltaMove.x * 1),
                    0,
                    'XYZ'
                ));

            model.quaternion.multiplyQuaternions(deltaRotationQuaternion, model.quaternion);
        }
        previousMousePosition = {
            x: e.touches[0].offsetX,
            y: e.touches[0].offsetY
        };
    }
    function upScreen(e) {
        console.log("upscreen");
        isDragging = false;
    }

    var load = function () {
        vw = input_width;
        vh = input_height;

        pscale = 320 / Math.max(vw, vh / 3 * 4);
        //pscale = 1;
        //sscale = isMobile() ? window.outerWidth / input_width : 1;
        sscale = window.outerWidth / input_width;
        console.log("pscale: " + pscale);
        console.log("sscale: " + sscale);

        sw = vw * sscale;
        sh = vh * sscale;
        //sw = 1080;
        // sh = 1920;

        console.log("sw: " + sw);
        console.log(" sh: " + sh);

        //ake config for full screen on mobile
        //video.style.width = sw + "px";
        //video.style.height = sh + "px";
        //container.style.width = sw + "px";
        //container.style.height = sh + "px";
        //canvas_draw.style.clientWidth = sw + "px";
        //canvas_draw.style.clientHeight = sh + "px";
        canvas_draw.width = sw;
        canvas_draw.height = sh;
        w = vw * pscale;
        h = vh * pscale;
        pw = Math.max(w, h / 3 * 4);
        ph = Math.max(h, w / 4 * 3);
        ox = (pw - w) / 2;
        oy = (ph - h) / 2;
        canvas_process.style.clientWidth = pw + "px";
        canvas_process.style.clientHeight = ph + "px";
        canvas_process.width = pw;
        canvas_process.height = ph;

        renderer.setSize(sw, sh);

        console.log("marker url" + marker.url);

        worker.postMessage({ type: "load", pw: pw, ph: ph, camera_para: camera_para, marker: '../' + marker.url });

        worker.onmessage = function (ev) {
            var msg = ev.data;
            switch (msg.type) {
                case "loaded": {
                    var proj = JSON.parse(msg.proj);
                    var ratioW = pw / w;
                    var ratioH = ph / h;
                    proj[0] *= ratioW;
                    proj[4] *= ratioW;
                    proj[8] *= ratioW;
                    proj[12] *= ratioW;
                    proj[1] *= ratioH;
                    proj[5] *= ratioH;
                    proj[9] *= ratioH;
                    proj[13] *= ratioH;
                    setMatrix(camera.projectionMatrix, proj);
                    break;
                }

                case "endLoading": {
                    if (msg.end == true)
                        // removing loader page if present
                        document.body.classList.remove("loading");
                    document.getElementById("loading").remove();
                    break;
                }

                case "found": {
                    found(msg);
                    break;
                }

                case "not found": {
                    found(null);
                    break;
                }
            }

            track_update();
            process();
        };
    };

    var world;

    var found = function (msg) {
        if (!msg) {
            world = null;
        } else {
            world = JSON.parse(msg.matrixGL_RH);
        }
    };

    var lasttime = Date.now();
    var time = 0;

    var draw = function () {
        render_update();
        var now = Date.now();
        var dt = now - lasttime;
        time += dt;
        lasttime = now;

        /* //adjust model
         if (model != undefined || model != null) {
             model.scale.x = model.scale.y = model.scale.z = adjust_scale;
             //console.log("adjust px: "+adjust_px);
             model.position.x = 50 + adjust_px;
             model.position.y = 30 + adjust_py;
 
             model.rotation.x = adjust_angle*0.0174532925;
         }*/

        if (!world) {
            //sphere.visible = false;
            //root.visible = false;
            //console.log("not found");
        } else {
            console.log("found");
            /*  root.visible = true;
              //sphere.visible = true;
              // interpolate matrix
             for (var i = 0; i < 16; i++) {
                  trackedMatrix.delta[i] = world[i] - trackedMatrix.interpolated[i];
                  trackedMatrix.interpolated[i] =
                      trackedMatrix.interpolated[i] +
                      trackedMatrix.delta[i] / interpolationFactor;
              }
  
              // set matrix of 'root' by detected 'world' matrix
              setMatrix(root.matrix, trackedMatrix.interpolated);*/

            root.visible = true;
        }

        if (model1 !== undefined) {

            /* console.log("modelX:" + model.position.x);
             console.log("modelY:" + model.position.y);
             console.log("modelZ:" + model.position.z);*/
            //model.rotation.y = 45 * 0.0174532925;

        }
        if (model2 !== undefined) {
            //
        }
        if (model3 !== undefined) {
            //
        }
        if (model4 !== undefined) {
            //
        }

        root.visible = true;

        renderer.render(scene, camera);
        SpriteAnimator.update(clock.getDelta());

        p1_human3_video_texture.update(clock.getDelta(), now);

        // p1_bicycle_material.map = p1_bicycle1_textures[p1_bicycle1_frame];
        // p1_bicycle_duration += clock.getDelta();
        // if (p1_bicycle_duration >= (1 / 24)) {
        //     console.log(p1_bicycle1_duration);
        //     p1_bicycle1_duration = 0;

        //     // bicycle1_frame++;
        //     // if (bicycle1_frame >= 500) {
        //     //     bicycle1_frame = 0;
        //     // }
        // }

        // // P1.
        // p1_bicycle_material.map = p1_bicycle_textures[p1_bicycle_frame];
        // p1_bicycle_frame++;
        // if (p1_bicycle_frame >= 500) {
        //     p1_bicycle_frame = 0;
        // }
        // p1_human2_material.map = p1_human2_textures[p1_human2_frame];
        // p1_human2_frame++;
        // if (p1_human2_frame >= 500) {
        //     p1_human2_frame = 0;
        // }
        // p1_human3_material.map = p1_human3_textures[p1_human3_frame];
        // p1_human3_frame++;
        // if (p1_human3_frame >= 500) {
        //     p1_human3_frame = 0;
        // }
        // p1_human4_material.map = p1_human4_textures[p1_human4_frame];
        // p1_human4_frame++;
        // if (p1_human4_frame >= 500) {
        //     p1_human4_frame = 0;
        // }
        // p1_human5_material.map = p1_human5_textures[p1_human5_frame];
        // p1_human5_frame++;
        // if (p1_human5_frame >= 500) {
        //     p1_human5_frame = 0;
        // }
        // p1_human6_material.map = p1_human6_textures[p1_human6_frame];
        // p1_human6_frame++;
        // if (p1_human6_frame >= 500) {
        //     p1_human6_frame = 0;
        // }
        // p1_icon_material.map = p1_icon_textures[p1_icon_frame];
        // p1_icon_frame++;
        // if (p1_icon_frame >= 500) {
        //     p1_icon_frame = 0;
        // }
        // // P2.
        // p2_human1_material.map = p2_human1_textures[p2_human1_frame];
        // p2_human1_frame++;
        // if (p2_human1_frame >= 500) {
        //     p2_human1_frame = 0;
        // }
        // p2_human2_material.map = p2_human2_textures[p2_human2_frame];
        // p2_human2_frame++;
        // if (p2_human2_frame >= 500) {
        //     p2_human2_frame = 0;
        // }
        // p2_human3_material.map = p2_human3_textures[p2_human3_frame];
        // p2_human3_frame++;
        // if (p2_human3_frame >= 500) {
        //     p2_human3_frame = 0;
        // }
        // p2_human4_material.map = p2_human4_textures[p2_human4_frame];
        // p2_human4_frame++;
        // if (p2_human4_frame >= 500) {
        //     p2_human4_frame = 0;
        // }
        // p2_human5_material.map = p2_human5_textures[p2_human5_frame];
        // p2_human5_frame++;
        // if (p2_human5_frame >= 500) {
        //     p2_human5_frame = 0;
        // }
        // p2_rain_material.map = p2_rain_textures[p2_rain_frame];
        // p2_rain_frame++;
        // if (p2_rain_frame >= 500) {
        //     p2_rain_frame = 0;
        // }
        // p2_icon_material.map = p2_icon_textures[p2_icon_frame];
        // p2_icon_frame++;
        // if (p2_icon_frame >= 500) {
        //     p2_icon_frame = 0;
        // }
        // // P3.
        // p3_human1_material.map = p3_human1_textures[p3_human1_frame];
        // p3_human1_frame++;
        // if (p3_human1_frame >= 500) {
        //     p3_human1_frame = 0;
        // }
        // p3_human2_material.map = p3_human2_textures[p3_human2_frame];
        // p3_human2_frame++;
        // if (p3_human2_frame >= 500) {
        //     p3_human2_frame = 0;
        // }
        // p3_human3_material.map = p3_human3_textures[p3_human3_frame];
        // p3_human3_frame++;
        // if (p3_human3_frame >= 500) {
        //     p3_human3_frame = 0;
        // }
        // p3_human4_material.map = p3_human4_textures[p3_human4_frame];
        // p3_human4_frame++;
        // if (p3_human4_frame >= 500) {
        //     p3_human4_frame = 0;
        // }
        // p3_human5_material.map = p3_human5_textures[p3_human5_frame];
        // p3_human5_frame++;
        // if (p3_human5_frame >= 500) {
        //     p3_human5_frame = 0;
        // }
        // p3_icon_material.map = p3_icon_textures[p3_icon_frame];
        // p3_icon_frame++;
        // if (p3_icon_frame >= 500) {
        //     p3_icon_frame = 0;
        // }
    };

    function process() {
        /* console.log("process...");
         console.log("vw: "+vw);
         console.log("vh: "+vh);
         console.log("ox: "+ox);
         console.log("oy: "+oy);
         console.log("w: "+w);
         console.log("h: "+h);
         console.log("pw: "+pw);
         console.log("ph: "+ph);*/

        context_process.fillStyle = "black";
        context_process.fillRect(0, 0, pw, ph);
        context_process.drawImage(video, 0, 0, vw, vh, ox, oy, w, h);

        var imageData = context_process.getImageData(0, 0, pw, ph);
        worker.postMessage({ type: "process", imagedata: imageData }, [
            imageData.data.buffer
        ]);
    }
    var tick = function () {
        draw();
        requestAnimationFrame(tick);
    };

    load();
    tick();
    process();

    function toRadians(angle) {
        return angle * (Math.PI / 180);
    }

    function toDegrees(angle) {
        return angle * (180 / Math.PI);
    }
}

// function choice1_worker() {
//     p1_bicycle_frame = 0;
//     p1_human2_frame = 0;
//     p1_human3_frame = 0;
//     p1_human4_frame = 0;
//     p1_human5_frame = 0;
//     p1_human6_frame = 0;
//     p1_icon_frame = 0;

//     model1.visible = false;
//     model2.visible = true;
//     model3.visible = false;
//     model4.visible = false;
// }

// function choice2_worker() {
//     p2_human1_frame = 0;
//     p2_human2_frame = 0;
//     p2_human3_frame = 0;
//     p2_human4_frame = 0;
//     p2_human5_frame = 0;
//     p2_rain_frame = 0;
//     p2_icon_frame = 0;

//     model1.visible = false;
//     model2.visible = false;
//     model3.visible = true;
//     model4.visible = false;
// }

// function choice3_worker() {
//     p2_human1_frame = 0;
//     p2_human2_frame = 0;
//     p2_human3_frame = 0;
//     p2_human4_frame = 0;
//     p2_human5_frame = 0;
//     p2_icon_frame = 0;

//     model1.visible = false;
//     model2.visible = false;
//     model3.visible = false;
//     model4.visible = true;
// }
