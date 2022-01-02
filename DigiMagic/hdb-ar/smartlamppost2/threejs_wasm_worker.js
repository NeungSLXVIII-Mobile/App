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

var show_button = false;

var human_base_y = 30;

var p1_show = false;
var p2_show = false;
var p3_show = false;

// P1.
var p1_bicycle_texture = new THREE.TextureLoader().load('assets/sprites/dummy.png');
var p1_human2_texture = new THREE.TextureLoader().load('assets/sprites/dummy.png');
var p1_human3_texture = new THREE.TextureLoader().load('assets/sprites/dummy.png');
var p1_human4_texture = new THREE.TextureLoader().load('assets/sprites/dummy.png');
var p1_human5_texture = new THREE.TextureLoader().load('assets/sprites/dummy.png');
var p1_human6_texture = new THREE.TextureLoader().load('assets/sprites/dummy.png');
var p1_icon_texture = new THREE.TextureLoader().load('assets/sprites/dummy.png');
// P2.
var p2_human1_texture = new THREE.TextureLoader().load('assets/sprites/dummy.png');
var p2_human2_texture = new THREE.TextureLoader().load('assets/sprites/dummy.png');
var p2_human3_texture = new THREE.TextureLoader().load('assets/sprites/dummy.png');
var p2_human4_texture = new THREE.TextureLoader().load('assets/sprites/dummy.png');
var p2_human5_texture = new THREE.TextureLoader().load('assets/sprites/dummy.png');
var p2_icon_texture = new THREE.TextureLoader().load('assets/sprites/dummy.png');
// P3.
var p3_icon_texture = new THREE.TextureLoader().load('assets/sprites/dummy.png');

// P1.
var p1_bicycle_material = new THREE.MeshBasicMaterial({ map: p1_bicycle_texture, opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });
var p1_human2_material = new THREE.MeshBasicMaterial({ map: p1_human2_texture, opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });
var p1_human3_material = new THREE.MeshBasicMaterial({ map: p1_human3_texture, opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });
var p1_human4_material = new THREE.MeshBasicMaterial({ map: p1_human4_texture, opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });
var p1_human5_material = new THREE.MeshBasicMaterial({ map: p1_human5_texture, opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });
var p1_human6_material = new THREE.MeshBasicMaterial({ map: p1_human6_texture, opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });
var p1_icon_material = new THREE.MeshBasicMaterial({ map: p1_icon_texture, opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });
// P2.
var p2_human1_material = new THREE.MeshBasicMaterial({ map: p2_human1_texture, opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });
var p2_human2_material = new THREE.MeshBasicMaterial({ map: p2_human2_texture, opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });
var p2_human3_material = new THREE.MeshBasicMaterial({ map: p2_human3_texture, opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });
var p2_human4_material = new THREE.MeshBasicMaterial({ map: p2_human4_texture, opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });
var p2_human5_material = new THREE.MeshBasicMaterial({ map: p2_human5_texture, opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });
var p2_icon_material = new THREE.MeshBasicMaterial({ map: p2_icon_texture, opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });
// P3.
var p3_human1_material = p2_human1_material;
var p3_human2_material = p2_human2_material;
var p3_human3_material = p2_human3_material;
var p3_human4_material = p2_human4_material;
var p3_human5_material = p2_human5_material;
var p3_icon_material = new THREE.MeshBasicMaterial({ map: p3_icon_texture, opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });

// P1.
var p1_bicycle_animation;
var p1_human2_animation;
var p1_human3_animation;
var p1_human4_animation;
var p1_human5_animation;
var p1_human6_animation;
var p1_icon_animation;
// P2.
var p2_human1_animation;
var p2_human2_animation;
var p2_human3_animation;
var p2_human4_animation;
var p2_human5_animation;
var p2_icon_animation;
// P3.
var p3_icon_animation;

// P1.
var p1_bicycle_move;
var p1_human2_move;
var p1_human3_move;
var p1_human4_move;
var p1_human5_move;
var p1_human6_move;
var p1_icon_move;
// P2.
var p2_human1_move;
var p2_human2_move;
var p2_human3_move;
var p2_human4_move;
var p2_human5_move;
var p2_icon_move;
// P3.
var p3_human1_move;
var p3_human2_move;
var p3_human3_move;
var p3_human4_move;
var p3_human5_move;
var p3_icon_move;

// P1.
var p1_bicycle_wait_time;
var p1_human2_wait_time;
var p1_human3_wait_time;
var p1_human4_wait_time;
var p1_human5_wait_time;
var p1_human6_wait_time;
// P2.
var p2_human1_wait_time;
var p2_human2_wait_time;
var p2_human3_wait_time;
var p2_human4_wait_time;
var p2_human5_wait_time;
// P3.
var p3_human1_wait_time;
var p3_human2_wait_time;
var p3_human3_wait_time;
var p3_human4_wait_time;
var p3_human5_wait_time;

// P1.
var p1_bicycle_wait_time_value;
var p1_human2_wait_time_value;
var p1_human3_wait_time_value;
var p1_human4_wait_time_value;
var p1_human5_wait_time_value;
var p1_human6_wait_time_value;
// P2.
var p2_human1_wait_time_value;
var p2_human2_wait_time_value;
var p2_human3_wait_time_value;
var p2_human4_wait_time_value;
var p2_human5_wait_time_value;
// P3.
var p3_human1_wait_time_value;
var p3_human2_wait_time_value;
var p3_human3_wait_time_value;
var p3_human4_wait_time_value;
var p3_human5_wait_time_value;

// P1.
var urls = [
    "assets/sprites/p1_bicycle_sprite_sheet.png",
    "assets/sprites/p1_human2_sprite_sheet.png",
    "assets/sprites/p1_human3_sprite_sheet.png",
    "assets/sprites/p1_human4_sprite_sheet.png",
    "assets/sprites/p1_human5_sprite_sheet.png",
    "assets/sprites/p1_human6_sprite_sheet.png",
    //"assets/sprites/p1_icon_sprite_sheet.png",
    "assets/sprites/p1_icon_sprite_sheet_4096.png",
    //"assets/sprites/p1_icon_sprite_sheet_2048.png",
];

loadTextures(urls, function (error, textures) {
    if (error) {
        console.log(error);
        return;
    }

    // P1.
    p1_bicycle_animation = SpriteAnimator.add({ texture: textures[0], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 70 });
    p1_bicycle_material.map = textures[0];
    p1_human2_animation = SpriteAnimator.add({ texture: textures[1], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 70 });
    p1_human2_material.map = textures[1];
    p1_human3_animation = SpriteAnimator.add({ texture: textures[2], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 39 });
    p1_human3_material.map = textures[2];
    p1_human4_animation = SpriteAnimator.add({ texture: textures[3], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 46 });
    p1_human4_material.map = textures[3];
    p1_human5_animation = SpriteAnimator.add({ texture: textures[4], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 35 });
    p1_human5_material.map = textures[4];
    p1_human6_animation = SpriteAnimator.add({ texture: textures[5], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 46 });
    p1_human6_material.map = textures[5];
    p1_icon_animation = SpriteAnimator.add({ texture: textures[6], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 79 });
    p1_icon_material.map = textures[6];
    // p1_icon_animation = SpriteAnimator.add({ texture: textures[6], tilesHorizontal: 14, tilesVertical: 14, fps: 24, numberOfTiles: 79 });
    // p1_icon_material.map = textures[6];

    textures[6].magFilter = THREE.NearestFilter;
    textures[6].minFilter = THREE.NearestFilter;

    p1_bicycle_move = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), p1_bicycle_material);
    p1_human2_move = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), p1_human2_material);
    p1_human3_move = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), p1_human3_material);
    p1_human4_move = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), p1_human4_material);
    p1_human5_move = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), p1_human5_material);
    p1_human6_move = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), p1_human6_material);
    p1_icon_move = new THREE.Mesh(new THREE.PlaneGeometry(150, 150), p1_icon_material);
});

// P2.
var urls = [
    "assets/sprites/p1_human2_sprite_sheet.png",
    "assets/sprites/p1_human3_sprite_sheet.png",
    "assets/sprites/p1_human4_sprite_sheet.png",
    "assets/sprites/p1_human5_sprite_sheet.png",
    "assets/sprites/p1_human6_sprite_sheet.png",
    //"assets/sprites/p2_icon_sprite_sheet.png",
    "assets/sprites/p2_icon_sprite_sheet_4096.png",
    //"assets/sprites/p2_icon_sprite_sheet_2048.png",
];

loadTextures(urls, function (error, textures) {
    if (error) {
        console.log(error);
        return;
    }

    p2_human1_animation = SpriteAnimator.add({ texture: textures[0], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 70 });
    p2_human1_material.map = textures[0];
    p2_human2_animation = SpriteAnimator.add({ texture: textures[1], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 39 });
    p2_human2_material.map = textures[1];
    p2_human3_animation = SpriteAnimator.add({ texture: textures[2], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 46 });
    p2_human3_material.map = textures[2];
    p2_human4_animation = SpriteAnimator.add({ texture: textures[3], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 35 });
    p2_human4_material.map = textures[3];
    p2_human5_animation = SpriteAnimator.add({ texture: textures[4], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 46 });
    p2_human5_material.map = textures[4];
    p2_icon_animation = SpriteAnimator.add({ texture: textures[5], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 79 });
    p2_icon_material.map = textures[5];
    // p2_icon_animation = SpriteAnimator.add({ texture: textures[5], tilesHorizontal: 14, tilesVertical: 14, fps: 24, numberOfTiles: 79 });
    // p2_icon_material.map = textures[5];

    textures[5].magFilter = THREE.NearestFilter;
    textures[5].minFilter = THREE.NearestFilter;

    p2_human1_move = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), p2_human1_material);
    p2_human2_move = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), p2_human2_material);
    p2_human3_move = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), p2_human3_material);
    p2_human4_move = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), p2_human4_material);
    p2_human5_move = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), p2_human5_material);
    p2_icon_move = new THREE.Mesh(new THREE.PlaneGeometry(150, 150), p2_icon_material);
});

// P3.
var urls = [
    "assets/sprites/p1_human2_sprite_sheet.png",
    "assets/sprites/p1_human3_sprite_sheet.png",
    "assets/sprites/p1_human4_sprite_sheet.png",
    "assets/sprites/p1_human5_sprite_sheet.png",
    "assets/sprites/p1_human6_sprite_sheet.png",
    //"assets/sprites/p3_icon_sprite_sheet.png",
    "assets/sprites/p3_icon_sprite_sheet_4096.png",
    //"assets/sprites/p3_icon_sprite_sheet_2048.png",
];

loadTextures(urls, function (error, textures) {
    if (error) {
        console.log(error);
        return;
    }

    p2_human1_animation = SpriteAnimator.add({ texture: textures[0], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 70 });
    p2_human1_material.map = textures[0];
    p2_human2_animation = SpriteAnimator.add({ texture: textures[1], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 39 });
    p2_human2_material.map = textures[1];
    p2_human3_animation = SpriteAnimator.add({ texture: textures[2], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 46 });
    p2_human3_material.map = textures[2];
    p2_human4_animation = SpriteAnimator.add({ texture: textures[3], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 35 });
    p2_human4_material.map = textures[3];
    p2_human5_animation = SpriteAnimator.add({ texture: textures[4], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 46 });
    p2_human5_material.map = textures[4];
    p3_icon_animation = SpriteAnimator.add({ texture: textures[5], tilesHorizontal: 9, tilesVertical: 9, fps: 24, numberOfTiles: 79 });
    p3_icon_material.map = textures[5];
    // p3_icon_animation = SpriteAnimator.add({ texture: textures[5], tilesHorizontal: 14, tilesVertical: 14, fps: 24, numberOfTiles: 79 });
    // p3_icon_material.map = textures[5];

    textures[5].magFilter = THREE.NearestFilter;
    textures[5].minFilter = THREE.NearestFilter;

    p3_human1_move = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), p3_human1_material);
    p3_human2_move = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), p3_human2_material);
    p3_human3_move = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), p3_human3_material);
    p3_human4_move = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), p3_human4_material);
    p3_human5_move = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), p3_human5_material);
    p3_icon_move = new THREE.Mesh(new THREE.PlaneGeometry(150, 150), p3_icon_material);
});

var tree1_material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/dummy.png'), opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });
var tree2_material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/dummy.png'), opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });
var bg_material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/dummy.png'), opacity: 1, depthTest: false, depthWrite: false, transparent: false, side: THREE.DoubleSide });
var floor_material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/dummy.png'), opacity: 1, depthTest: true, transparent: false, side: THREE.DoubleSide });
var lamppost1_material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/dummy.png'), opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });
var lamppost2_material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/dummy.png'), opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });
var lamppost1_light_material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/dummy.png'), opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });
var lamppost2_light_material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/dummy.png'), opacity: 1, depthTest: false, depthWrite: false, transparent: true, side: THREE.DoubleSide });

var tree1_texture = new THREE.TextureLoader().load('Data/textures/tree01.png',
    function (texture) {
        tree1_material.map = texture;
    },
    undefined,
    function (error) {
        console.error("error load texture.");
    });
var tree2_texture = new THREE.TextureLoader().load('Data/textures/tree02.png',
    function (texture) {
        tree2_material.map = texture;
    },
    undefined,
    function (error) {
        console.error("error load texture.");
    });
var bg_texture = new THREE.TextureLoader().load('Data/textures/bg.png',
    function (texture) {
        bg_material.map = texture;
    },
    undefined,
    function (error) {
        console.error("error load texture.");
    });
var floor_texture = new THREE.TextureLoader().load('Data/textures/floor.png',
    function (texture) {
        floor_material.map = texture;
    },
    undefined,
    function (error) {
        console.error("error load texture.");
    });
var lamppost1_texture = new THREE.TextureLoader().load('Data/textures/lamppost01.png',
    function (texture) {
        lamppost1_material.map = texture;
    },
    undefined,
    function (error) {
        console.error("error load texture.");
    });
var lamppost2_texture = new THREE.TextureLoader().load('Data/textures/lamppost02.png',
    function (texture) {
        lamppost2_material.map = texture;
    },
    undefined,
    function (error) {
        console.error("error load texture.");
    });
var lamppost1_light_texture = new THREE.TextureLoader().load('Data/textures/lamppost01_light.png',
    function (texture) {
        lamppost1_light_material.map = texture;
    },
    undefined,
    function (error) {
        console.error("error load texture.");
    });
var lamppost2_light_texture = new THREE.TextureLoader().load('Data/textures/lamppost02_light.png',
    function (texture) {
        lamppost2_light_material.map = texture;
    },
    undefined,
    function (error) {
        console.error("error load texture.");
    });

// P1.
var p1_bicycle_plane;
var p1_human1_plane;
var p1_human2_plane;
var p1_human3_plane;
var p1_human4_plane;
var p1_human5_plane;
var p1_icon_plane;
// P2.
var p2_human1_plane;
var p2_human2_plane;
var p2_human3_plane;
var p2_human4_plane;
var p2_human5_plane;
var p2_icon_plane;
// P3.
var p3_human1_plane;
var p3_human2_plane;
var p3_human3_plane;
var p3_human4_plane;
var p3_human5_plane;
var p3_icon_plane;

var tree1_1;
var tree1_2;
var bg1_1;
var floor1_1;
var lamppost1_1;
var lamppost1_2a;
var lamppost1_2b;

var tree2_1;
var tree2_2;
var bg2_1;
var floor2_1;
var lamppost2_1;
var lamppost2_2a;
var lamppost2_2b;

var tree3_1;
var tree3_2;
var bg3_1;
var floor3_1;
var lamppost3_1;
var lamppost3_2a;
var lamppost3_2b;

var tree4_1;
var tree4_2;
var bg4_1;
var floor4_1;
var lamppost4_1;
var lamppost4_2a;
var lamppost4_2b;

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

    //renderer.setClearColor(0x0000ff, 1);

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

    /* Load Model */
    var threeGLTFLoader1 = new THREE.GLTFLoader();
    threeGLTFLoader1.load("Data/models/smartlamppost1.gltf", function (gltf) {
        model1 = gltf.scene;

        model1.position.x = 0;
        model1.position.y = 0;
        model1.position.z = 0;

        model1.scale.x = model1.scale.y = model1.scale.z = 0.5;
        model1.rotation.x = adjust_angle * 0.0174532925;

        model1.visible = true;

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
            tree1_1.material = tree1_material;
            tree1_1.material.needsUpdate = true;

            tree1_1.rotation.y = 180 * 0.0174532925;
            tree1_1.rotation.z = 180 * 0.0174532925;
        }

        // tree 2.
        if (tree1_2 != undefined) {
            tree1_2.material = tree2_material;
            tree1_2.material.needsUpdate = true;

            tree1_2.rotation.y = 180 * 0.0174532925;
            tree1_2.rotation.z = 180 * 0.0174532925;
        }

        // BG.
        if (bg1_1 != undefined) {
            bg1_1.material = bg_material;
            bg1_1.material.needsUpdate = true;

            bg1_1.rotation.y = 180 * 0.0174532925;
            bg1_1.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 1.
        if (lamppost1_1 != undefined) {
            lamppost1_1.material = lamppost1_material;
            lamppost1_1.material.needsUpdate = true;

            lamppost1_1.rotation.y = 180 * 0.0174532925;
            lamppost1_1.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 2a.
        if (lamppost1_2a != undefined) {
            lamppost1_2a.material = lamppost2_material;
            lamppost1_2a.material.needsUpdate = true;

            lamppost1_2a.rotation.y = 180 * 0.0174532925;
            lamppost1_2a.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 2b.
        if (lamppost1_2b != undefined) {
            lamppost1_2b.material = lamppost2_material;
            lamppost1_2b.material.needsUpdate = true;

            lamppost1_2b.rotation.y = 180 * 0.0174532925;
            lamppost1_2b.rotation.z = 180 * 0.0174532925;
        }

        // floor.
        if (floor1_1 != undefined) {
            floor1_1.material = floor_material;
            floor1_1.material.needsUpdate = true;
        }

        root.add(model1);
    });

    var threeGLTFLoader2 = new THREE.GLTFLoader();
    threeGLTFLoader2.load("Data/models/smartlamppost2.gltf", function (gltf) {
        model2 = gltf.scene;

        model2.position.x = 0;
        model2.position.y = 0;
        model2.position.z = 0;

        model2.scale.x = model2.scale.y = model2.scale.z = 0.5;
        model2.rotation.x = adjust_angle * 0.0174532925;

        model2.visible = false;

        console.log("model2");
        console.log(model2);
        for (count = 0; count < model2.children.length; count++) {
            console.log(model2.children[count]);
            if (model2.children[count].name == "Tree01") {
                console.log("Tree01 LV1");
                tree2_1 = model2.children[count];
            }
            if (model2.children[count].name == "Tree02") {
                console.log("Tree02 LV1");
                tree2_2 = model2.children[count];
            }
            if (model2.children[count].name == "BG") {
                console.log("BG LV1");
                bg2_1 = model2.children[count];
            }
            if (model2.children[count].name == "Lamppost01") {
                console.log("Lamppost01 LV1");
                lamppost2_1 = model2.children[count];
            }
            if (model2.children[count].name == "Lamppost02a") {
                console.log("Lampost01a LV1");
                lamppost2_2a = model2.children[count];
            }
            if (model2.children[count].name == "Lamppost02b") {
                console.log("Lampost02b LV1");
                lamppost2_2b = model2.children[count];
            }
            if (model2.children[count].name == "Cube1") {
                console.log("Cube LV1");
                floor2_1 = model2.children[count];
            }
            if (model2.children[count].name == "Bicycle") {
                console.log("Bicycle LV1");
                p1_bicycle_plane = model2.children[count];
            }
            if (model2.children[count].name == "Human01") {
                console.log("Human01 LV1");
                p1_human1_plane = model2.children[count];
            }
            if (model2.children[count].name == "Human02") {
                console.log("Human02 LV1");
                p1_human2_plane = model2.children[count];
            }
            if (model2.children[count].name == "Human03") {
                console.log("Human03 LV1");
                p1_human3_plane = model2.children[count];
            }
            if (model2.children[count].name == "Human04") {
                console.log("Human04 LV1");
                p1_human4_plane = model2.children[count];
            }
            if (model2.children[count].name == "Human05") {
                console.log("Human05 LV1");
                p1_human5_plane = model2.children[count];
            }
            if (model2.children[count].name == "Icon") {
                console.log("Icon LV1");
                p1_icon_plane = model2.children[count];
            }
        }

        // tree 1.
        if (tree2_1 != undefined) {
            tree2_1.material = tree1_material;
            tree2_1.material.needsUpdate = true;

            tree2_1.rotation.y = 180 * 0.0174532925;
            tree2_1.rotation.z = 180 * 0.0174532925;
        }

        // tree 2.
        if (tree2_2 != undefined) {
            tree2_2.material = tree2_material;
            tree2_2.material.needsUpdate = true;

            tree2_2.rotation.y = 180 * 0.0174532925;
            tree2_2.rotation.z = 180 * 0.0174532925;
        }

        // BG.
        if (bg2_1 != undefined) {
            bg2_1.material = bg_material;
            bg2_1.material.needsUpdate = true;

            bg2_1.rotation.y = 180 * 0.0174532925;
            bg2_1.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 1.
        if (lamppost2_1 != undefined) {
            lamppost2_1.material = lamppost1_light_material;
            lamppost2_1.material.needsUpdate = true;

            lamppost2_1.rotation.y = 180 * 0.0174532925;
            lamppost2_1.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 2a.
        if (lamppost2_2a != undefined) {
            lamppost2_2a.material = lamppost2_light_material;
            lamppost2_2a.material.needsUpdate = true;

            lamppost2_2a.rotation.y = 180 * 0.0174532925;
            lamppost2_2a.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 2b.
        if (lamppost2_2b != undefined) {
            lamppost2_2b.material = lamppost2_light_material;
            lamppost2_2b.material.needsUpdate = true;

            lamppost2_2b.rotation.y = 180 * 0.0174532925;
            lamppost2_2b.rotation.z = 180 * 0.0174532925;
        }

        // floor.
        if (floor2_1 != undefined) {
            floor2_1.material = floor_material;
            floor2_1.material.needsUpdate = true;
        }

        // P1.
        if (p1_bicycle_plane != undefined) {
            // p1_bicycle_plane.material = p1_bicycle_material;
            // p1_bicycle_plane.material.needsUpdate = true;

            // p1_bicycle_plane.rotation.y = 180 * 0.0174532925;
            // p1_bicycle_plane.rotation.z = 180 * 0.0174532925;

            p1_bicycle_plane.visible = false;

            p1_bicycle_move.position.x = -100;
            p1_bicycle_move.position.y = human_base_y;
            p1_bicycle_move.position.z = p1_bicycle_plane.position.z;

            p1_bicycle_move.renderOrder = 1;

            model2.add(p1_bicycle_move);
        }

        if (p1_human1_plane != undefined) {
            // p1_human1_plane.material = p1_human2_material;
            // p1_human1_plane.material.needsUpdate = true;

            // p1_human1_plane.rotation.y = 180 * 0.0174532925;
            // p1_human1_plane.rotation.z = 180 * 0.0174532925;

            p1_human1_plane.visible = false;

            p1_human2_move.position.x = -100;
            p1_human2_move.position.y = human_base_y;
            p1_human2_move.position.z = p1_human1_plane.position.z;

            p1_human2_move.renderOrder = 1;

            model2.add(p1_human2_move);
        }

        if (p1_human2_plane != undefined) {
            // p1_human2_plane.material = p1_human3_material;
            // p1_human2_plane.material.needsUpdate = true;

            // p1_human2_plane.rotation.y = 180 * 0.0174532925;
            // p1_human2_plane.rotation.z = 180 * 0.0174532925;

            p1_human2_plane.visible = false;

            p1_human3_move.position.x = -100;
            p1_human3_move.position.y = 25 + 20;
            p1_human3_move.position.z = p1_human2_plane.position.z;

            p1_human3_move.renderOrder = 1;

            model2.add(p1_human3_move);
        }

        if (p1_human3_plane != undefined) {
            // p1_human3_plane.material = p1_human4_material;
            // p1_human3_plane.material.needsUpdate = true;

            // p1_human3_plane.rotation.y = 180 * 0.0174532925;
            // p1_human3_plane.rotation.z = 180 * 0.0174532925;

            p1_human3_plane.visible = false;

            p1_human4_move.position.x = -100;
            p1_human4_move.position.y = human_base_y;
            p1_human4_move.position.z = p1_human3_plane.position.z;

            p1_human4_move.renderOrder = 1;

            model2.add(p1_human4_move);
        }

        if (p1_human4_plane != undefined) {
            // p1_human4_plane.material = p1_human5_material;
            // p1_human4_plane.material.needsUpdate = true;

            // p1_human4_plane.rotation.y = 180 * 0.0174532925;
            // p1_human4_plane.rotation.z = 180 * 0.0174532925;

            p1_human4_plane.visible = false;

            p1_human5_move.position.x = -100;
            p1_human5_move.position.y = human_base_y;
            p1_human5_move.position.z = p1_human4_plane.position.z;

            p1_human5_move.renderOrder = 1;

            model2.add(p1_human5_move);
        }

        if (p1_human5_plane != undefined) {
            // p1_human5_plane.material = p1_human6_material;
            // p1_human5_plane.material.needsUpdate = true;

            // p1_human5_plane.rotation.y = 180 * 0.0174532925;
            // p1_human5_plane.rotation.z = 180 * 0.0174532925;

            p1_human5_plane.visible = false;

            p1_human6_move.position.x = -100;
            p1_human6_move.position.y = human_base_y;
            p1_human6_move.position.z = p1_human5_plane.position.z;

            p1_human6_move.renderOrder = 1;

            model2.add(p1_human6_move);
        }

        if (p1_icon_plane != undefined) {
            // p1_icon_plane.material = p1_icon_material;
            // p1_icon_plane.material.needsUpdate = true;

            // p1_icon_plane.rotation.y = 180 * 0.0174532925;
            // p1_icon_plane.rotation.z = 180 * 0.0174532925;

            p1_icon_plane.visible = false;

            p1_icon_move.position.x = p1_icon_plane.position.x + 50;
            p1_icon_move.position.y = p1_icon_plane.position.y - 25;
            p1_icon_move.position.z = p1_icon_plane.position.z + 5;

            p1_icon_move.renderOrder = 1;

            model2.add(p1_icon_move);
        }

        root.add(model2);
    });

    var threeGLTFLoader3 = new THREE.GLTFLoader();
    threeGLTFLoader3.load("Data/models/smartlamppost3.gltf", function (gltf) {
        model3 = gltf.scene;

        model3.position.x = 0;
        model3.position.y = 0;
        model3.position.z = 0;

        model3.scale.x = model3.scale.y = model3.scale.z = 0.5;
        model3.rotation.x = adjust_angle * 0.0174532925;

        model3.visible = false;

        console.log("model3");
        console.log(model3);
        for (count = 0; count < model3.children.length; count++) {
            console.log(model3.children[count]);
            if (model3.children[count].name == "Tree01") {
                console.log("Tree01 LV1");
                tree3_1 = model3.children[count];
            }
            if (model3.children[count].name == "Tree02") {
                console.log("Tree02 LV1");
                tree3_2 = model3.children[count];
            }
            if (model3.children[count].name == "BG") {
                console.log("BG LV1");
                bg3_1 = model3.children[count];
            }
            if (model3.children[count].name == "Lamppost01") {
                console.log("Lamppost01 LV1");
                lamppost3_1 = model3.children[count];
            }
            if (model3.children[count].name == "Lamppost02a") {
                console.log("Lampost01a LV1");
                lamppost3_2a = model3.children[count];
            }
            if (model3.children[count].name == "Lamppost02b") {
                console.log("Lampost02b LV1");
                lamppost3_2b = model3.children[count];
            }
            if (model3.children[count].name == "Cube") {
                console.log("Cube LV1");
                floor3_1 = model3.children[count];
            }
            if (model3.children[count].name == "Human01") {
                console.log("Human01 LV1");
                p2_human1_plane = model3.children[count];
            }
            if (model3.children[count].name == "Human02") {
                console.log("Human02 LV1");
                p2_human2_plane = model3.children[count];
            }
            if (model3.children[count].name == "Human03") {
                console.log("Human03 LV1");
                p2_human3_plane = model3.children[count];
            }
            if (model3.children[count].name == "Human04") {
                console.log("Human04 LV1");
                p2_human4_plane = model3.children[count];
            }
            if (model3.children[count].name == "Human05") {
                console.log("Human05 LV1");
                p2_human5_plane = model3.children[count];
            }
            if (model3.children[count].name == "Icon") {
                console.log("Icon LV1");
                p2_icon_plane = model3.children[count];
            }
        }

        // tree 1.
        if (tree3_1 != undefined) {
            tree3_1.material = tree1_material;
            tree3_1.material.needsUpdate = true;

            tree3_1.rotation.y = 180 * 0.0174532925;
            tree3_1.rotation.z = 180 * 0.0174532925;
        }

        // tree 2.
        if (tree3_2 != undefined) {
            tree3_2.material = tree2_material;
            tree3_2.material.needsUpdate = true;

            tree3_2.rotation.y = 180 * 0.0174532925;
            tree3_2.rotation.z = 180 * 0.0174532925;
        }

        // BG.
        if (bg3_1 != undefined) {
            bg3_1.material = bg_material;
            bg3_1.material.needsUpdate = true;

            bg3_1.rotation.y = 180 * 0.0174532925;
            bg3_1.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 1.
        if (lamppost3_1 != undefined) {
            lamppost3_1.material = lamppost1_light_material;
            lamppost3_1.material.needsUpdate = true;

            lamppost3_1.rotation.y = 180 * 0.0174532925;
            lamppost3_1.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 2a.
        if (lamppost3_2a != undefined) {
            lamppost3_2a.material = lamppost2_light_material;
            lamppost3_2a.material.needsUpdate = true;

            lamppost3_2a.rotation.y = 180 * 0.0174532925;
            lamppost3_2a.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 2b.
        if (lamppost3_2b != undefined) {
            lamppost3_2b.material = lamppost2_light_material;
            lamppost3_2b.material.needsUpdate = true;

            lamppost3_2b.rotation.y = 180 * 0.0174532925;
            lamppost3_2b.rotation.z = 180 * 0.0174532925;
        }

        // floor.
        if (floor3_1 != undefined) {
            floor3_1.material = floor_material;
            floor3_1.material.needsUpdate = true;
        }

        // P2.
        if (p2_human1_plane != undefined) {
            // p2_human1_plane.material = p2_human1_material;
            // p2_human1_plane.material.needsUpdate = true;

            // p2_human1_plane.rotation.y = 180 * 0.0174532925;
            // p2_human1_plane.rotation.z = 180 * 0.0174532925;

            p2_human1_plane.visible = false;

            p2_human1_move.position.x = -100;
            p2_human1_move.position.y = human_base_y;
            p2_human1_move.position.z = p2_human1_plane.position.z;

            p2_human1_move.renderOrder = 1;

            model3.add(p2_human1_move);
        }

        if (p2_human2_plane != undefined) {
            // p2_human2_plane.material = p2_human2_material;
            // p2_human2_plane.material.needsUpdate = true;

            // p2_human2_plane.rotation.y = 180 * 0.0174532925;
            // p2_human2_plane.rotation.z = 180 * 0.0174532925;

            p2_human2_plane.visible = false;

            p2_human2_move.position.x = -100;
            p2_human2_move.position.y = human_base_y;
            p2_human2_move.position.z = p2_human2_plane.position.z;

            p2_human2_move.renderOrder = 1;

            model3.add(p2_human2_move);
        }

        if (p2_human3_plane != undefined) {
            // p2_human3_plane.material = p2_human3_material;
            // p2_human3_plane.material.needsUpdate = true;

            // p2_human3_plane.rotation.y = 180 * 0.0174532925;
            // p2_human3_plane.rotation.z = 180 * 0.0174532925;

            p2_human3_plane.visible = false;

            p2_human3_move.position.x = -100;
            p2_human3_move.position.y = human_base_y;
            p2_human3_move.position.z = p2_human3_plane.position.z;

            p2_human3_move.renderOrder = 1;

            model3.add(p2_human3_move);
        }

        if (p2_human4_plane != undefined) {
            // p2_human4_plane.material = p2_human4_material;
            // p2_human4_plane.material.needsUpdate = true;

            // p2_human4_plane.rotation.y = 180 * 0.0174532925;
            // p2_human4_plane.rotation.z = 180 * 0.0174532925;

            p2_human4_plane.visible = false;

            p2_human4_move.position.x = -100;
            p2_human4_move.position.y = 12.5 + 20;
            p2_human4_move.position.z = p2_human4_plane.position.z;

            p2_human4_move.renderOrder = 1;

            model3.add(p2_human4_move);
        }

        if (p2_human5_plane != undefined) {
            // p2_human5_plane.material = p2_human5_material;
            // p2_human5_plane.material.needsUpdate = true;

            // p2_human5_plane.rotation.y = 180 * 0.0174532925;
            // p2_human5_plane.rotation.z = 180 * 0.0174532925;

            p2_human5_plane.visible = false;

            p2_human5_move.position.x = -100;
            p2_human5_move.position.y = human_base_y;
            p2_human5_move.position.z = p2_human5_plane.position.z;

            p2_human5_move.renderOrder = 1;

            model3.add(p2_human5_move);
        }

        if (p2_icon_plane != undefined) {
            // p2_icon_plane.material = p2_icon_material;
            // p2_icon_plane.material.needsUpdate = true;

            // p2_icon_plane.rotation.y = 180 * 0.0174532925;
            // p2_icon_plane.rotation.z = 180 * 0.0174532925;

            p2_icon_plane.visible = false;

            p2_icon_move.position.x = p2_icon_plane.position.x + 50;
            p2_icon_move.position.y = p2_icon_plane.position.y - 25;
            p2_icon_move.position.z = p2_icon_plane.position.z + 5;

            p2_icon_move.renderOrder = 1;

            model3.add(p2_icon_move);
        }

        root.add(model3);
    });

    var threeGLTFLoader4 = new THREE.GLTFLoader();
    threeGLTFLoader4.load("Data/models/smartlamppost4.gltf", function (gltf) {
        model4 = gltf.scene;

        model4.position.x = 0;
        model4.position.y = 0;
        model4.position.z = 0;

        model4.scale.x = model4.scale.y = model4.scale.z = 0.5;
        model4.rotation.x = adjust_angle * 0.0174532925;

        model4.visible = false;

        console.log("model4");
        console.log(model4);
        for (count = 0; count < model4.children.length; count++) {
            console.log(model4.children[count]);
            if (model4.children[count].name == "Tree01") {
                console.log("Tree01 LV1");
                tree4_1 = model4.children[count];
            }
            if (model4.children[count].name == "Tree02") {
                console.log("Tree02 LV1");
                tree4_2 = model4.children[count];
            }
            if (model4.children[count].name == "BG") {
                console.log("BG LV1");
                bg4_1 = model4.children[count];
            }
            if (model4.children[count].name == "Lamppost01") {
                console.log("Lamppost01 LV1");
                lamppost4_1 = model4.children[count];
            }
            if (model4.children[count].name == "Lamppost02a") {
                console.log("Lampost01a LV1");
                lamppost4_2a = model4.children[count];
            }
            if (model4.children[count].name == "Lamppost02b") {
                console.log("Lampost02b LV1");
                lamppost4_2b = model4.children[count];
            }
            if (model4.children[count].name == "Cube") {
                console.log("Cube LV1");
                floor4_1 = model4.children[count];
            }
            if (model4.children[count].name == "Human01") {
                console.log("Human01 LV1");
                p3_human1_plane = model4.children[count];
            }
            if (model4.children[count].name == "Human02") {
                console.log("Human02 LV1");
                p3_human2_plane = model4.children[count];
            }
            if (model4.children[count].name == "Human03") {
                console.log("Human03 LV1");
                p3_human3_plane = model4.children[count];
            }
            if (model4.children[count].name == "Human04") {
                console.log("Human04 LV1");
                p3_human4_plane = model4.children[count];
            }
            if (model4.children[count].name == "Human05") {
                console.log("Human05 LV1");
                p3_human5_plane = model4.children[count];
            }
            if (model4.children[count].name == "Icon") {
                console.log("Icon LV1");
                p3_icon_plane = model4.children[count];
            }
        }

        // tree 1.
        if (tree4_1 != undefined) {
            tree4_1.material = tree1_material;
            tree4_1.material.needsUpdate = true;

            tree4_1.rotation.y = 180 * 0.0174532925;
            tree4_1.rotation.z = 180 * 0.0174532925;
        }

        // tree 2.
        if (tree4_2 != undefined) {
            tree4_2.material = tree2_material;
            tree4_2.material.needsUpdate = true;

            tree4_2.rotation.y = 180 * 0.0174532925;
            tree4_2.rotation.z = 180 * 0.0174532925;
        }

        // BG.
        if (bg4_1 != undefined) {
            bg4_1.material = bg_material;
            bg4_1.material.needsUpdate = true;

            bg4_1.rotation.y = 180 * 0.0174532925;
            bg4_1.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 1.
        if (lamppost4_1 != undefined) {
            lamppost4_1.material = lamppost1_light_material;
            lamppost4_1.material.needsUpdate = true;

            lamppost4_1.rotation.y = 180 * 0.0174532925;
            lamppost4_1.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 2a.
        if (lamppost4_2a != undefined) {
            lamppost4_2a.material = lamppost2_light_material;
            lamppost4_2a.material.needsUpdate = true;

            lamppost4_2a.rotation.y = 180 * 0.0174532925;
            lamppost4_2a.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 2b.
        if (lamppost4_2b != undefined) {
            lamppost4_2b.material = lamppost2_light_material;
            lamppost4_2b.material.needsUpdate = true;

            lamppost4_2b.rotation.y = 180 * 0.0174532925;
            lamppost4_2b.rotation.z = 180 * 0.0174532925;
        }

        // floor.
        if (floor4_1 != undefined) {
            floor4_1.material = floor_material;
            floor4_1.material.needsUpdate = true;
        }

        // P3.
        if (p3_human1_plane != undefined) {
            // p3_human1_plane.material = p2_human1_material;
            // p3_human1_plane.material.needsUpdate = true;

            // p3_human1_plane.rotation.y = 180 * 0.0174532925;
            // p3_human1_plane.rotation.z = 180 * 0.0174532925;

            p3_human1_plane.visible = false;

            p3_human1_move.position.x = -100;
            p3_human1_move.position.y = human_base_y;
            p3_human1_move.position.z = p3_human1_plane.position.z;

            p3_human1_move.renderOrder = 1;

            model4.add(p3_human1_move);
        }

        if (p3_human2_plane != undefined) {
            // p3_human2_plane.material = p2_human2_material;
            // p3_human2_plane.material.needsUpdate = true;

            // p3_human2_plane.rotation.y = 180 * 0.0174532925;
            // p3_human2_plane.rotation.z = 180 * 0.0174532925;

            p3_human2_plane.visible = false;

            p3_human2_move.position.x = -100;
            p3_human2_move.position.y = human_base_y;
            p3_human2_move.position.z = p3_human2_plane.position.z;

            p3_human2_move.renderOrder = 1;

            model4.add(p3_human2_move);
        }

        if (p3_human3_plane != undefined) {
            // p3_human3_plane.material = p2_human3_material;
            // p3_human3_plane.material.needsUpdate = true;

            // p3_human3_plane.rotation.y = 180 * 0.0174532925;
            // p3_human3_plane.rotation.z = 180 * 0.0174532925;

            p3_human3_plane.visible = false;

            p3_human3_move.position.x = -100;
            p3_human3_move.position.y = human_base_y;
            p3_human3_move.position.z = p3_human3_plane.position.z;

            p3_human3_move.renderOrder = 1;

            model4.add(p3_human3_move);
        }

        if (p3_human4_plane != undefined) {
            // p3_human4_plane.material = p2_human4_material;
            // p3_human4_plane.material.needsUpdate = true;

            // p3_human4_plane.rotation.y = 180 * 0.0174532925;
            // p3_human4_plane.rotation.z = 180 * 0.0174532925;

            p3_human4_plane.visible = false;

            p3_human4_move.position.x = -100;
            p3_human4_move.position.y = human_base_y;
            p3_human4_move.position.z = p3_human4_plane.position.z;

            p3_human4_move.renderOrder = 1;

            model4.add(p3_human4_move);
        }

        if (p3_human5_plane != undefined) {
            // p3_human5_plane.material = p2_human5_material;
            // p3_human5_plane.material.needsUpdate = true;

            // p3_human5_plane.rotation.y = 180 * 0.0174532925;
            // p3_human5_plane.rotation.z = 180 * 0.0174532925;

            p3_human5_plane.visible = false;

            p3_human5_move.position.x = -100;
            p3_human5_move.position.y = human_base_y;
            p3_human5_move.position.z = p3_human5_plane.position.z;

            p3_human5_move.renderOrder = 1;

            model4.add(p3_human5_move);
        }

        if (p3_icon_plane != undefined) {
            // p3_icon_plane.material = p3_icon_material;
            // p3_icon_plane.material.needsUpdate = true;

            // p3_icon_plane.rotation.y = 180 * 0.0174532925;
            // p3_icon_plane.rotation.z = 180 * 0.0174532925;

            p3_icon_plane.visible = false;

            // p3_icon_move.position.x = p3_icon_plane.position.x - 75;
            // p3_icon_move.position.y = p3_icon_plane.position.y - 25;
            // p3_icon_move.position.z = p3_icon_plane.position.z + 75;
            p3_icon_move.position.x = p3_icon_plane.position.x + 25;
            p3_icon_move.position.y = p3_icon_plane.position.y;
            p3_icon_move.position.z = p3_icon_plane.position.z;

            p3_icon_move.renderOrder = 1;

            model4.add(p3_icon_move);
        }

        root.add(model4);
    });

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

            model1.quaternion.multiplyQuaternions(deltaRotationQuaternion, model1.quaternion);
            model2.quaternion.multiplyQuaternions(deltaRotationQuaternion, model2.quaternion);
            model3.quaternion.multiplyQuaternions(deltaRotationQuaternion, model3.quaternion);
            model4.quaternion.multiplyQuaternions(deltaRotationQuaternion, model4.quaternion);
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

            model1.quaternion.multiplyQuaternions(deltaRotationQuaternion, model1.quaternion);
            model2.quaternion.multiplyQuaternions(deltaRotationQuaternion, model2.quaternion);
            model3.quaternion.multiplyQuaternions(deltaRotationQuaternion, model3.quaternion);
            model4.quaternion.multiplyQuaternions(deltaRotationQuaternion, model4.quaternion);
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

            if (!show_button) {
                show_button = true;

                document.getElementById("text-tap").style.display = "block";
                document.getElementById("text-1").style.display = "none";
                document.getElementById("text-2").style.display = "none";
                document.getElementById("text-3").style.display = "none";

                document.getElementById("choice1-btn").style.display = "block";
                document.getElementById("choice2-btn").style.display = "block";
                document.getElementById("choice3-btn").style.display = "block";
                document.getElementById("choice4-btn").style.display = "block";
            }
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

        // root.visible = true;

        // if (!show_button) {
        //     show_button = true;

        //     document.getElementById("text-tap").style.display = "block";
        //     document.getElementById("text-1").style.display = "none";
        //     document.getElementById("text-2").style.display = "none";
        //     document.getElementById("text-3").style.display = "none";

        //     document.getElementById("choice1-btn").style.display = "block";
        //     document.getElementById("choice2-btn").style.display = "block";
        //     document.getElementById("choice3-btn").style.display = "block";
        //     document.getElementById("choice4-btn").style.display = "block";
        // }

        var delta = clock.getDelta();

        renderer.render(scene, camera);
        SpriteAnimator.update(delta);

        if (p1_show) {
            p1_bicycle_wait_time -= (1 / 24);
            if (p1_bicycle_wait_time <= 0) {
                p1_bicycle_wait_time = 0;

                p1_bicycle_move.visible = true;

                p1_bicycle_move.position.x = -100 + (200 / 79) * p1_icon_animation.currentTile;
                if (p1_bicycle_move.position.x > 100) {
                    p1_bicycle_move.position.x = -100;
                    p1_bicycle_move.visible = false;

                    p1_bicycle_wait_time = p1_bicycle_wait_time_value;
                }
            }
            // p1_bicycle_wait_time -= (1 / 24);
            // if (p1_bicycle_wait_time <= 0) {
            //     p1_bicycle_wait_time = 0;

            //     p1_bicycle_move.visible = true;

            //     p1_bicycle_move.position.x += 40 * (1 / 24);
            //     if (p1_bicycle_move.position.x > 100) {
            //         p1_bicycle_move.position.x = -100;
            //         p1_bicycle_move.visible = false;

            //         p1_bicycle_wait_time = p1_bicycle_wait_time_value;
            //     }
            // }
            p1_human2_wait_time -= (1 / 24);
            if (p1_human2_wait_time <= 0) {
                p1_human2_wait_time = 0;

                p1_human2_move.visible = true;

                p1_human2_move.position.x += 10 * (1 / 24);
                if (p1_human2_move.position.x > 100) {
                    p1_human2_move.position.x = -100;
                    p1_human2_move.visible = false;

                    p1_human2_wait_time = p1_human2_wait_time_value;
                }
            }
            p1_human3_wait_time -= (1 / 24);
            if (p1_human3_wait_time <= 0) {
                p1_human3_wait_time = 0;

                p1_human3_move.visible = true;

                p1_human3_move.position.x += 12.5 * (1 / 24);
                if (p1_human3_move.position.x > 100) {
                    p1_human3_move.position.x = -100;
                    p1_human3_move.visible = false;

                    p1_human3_wait_time = p1_human3_wait_time_value;
                }
            }
            p1_human4_wait_time -= (1 / 24);
            if (p1_human4_wait_time <= 0) {
                p1_human4_wait_time = 0;

                p1_human4_move.visible = true;

                p1_human4_move.position.x += 10 * (1 / 24);
                if (p1_human4_move.position.x > 100) {
                    p1_human4_move.position.x = -100;
                    p1_human4_move.visible = false;

                    p1_human4_wait_time = p1_human4_wait_time_value;
                }
            }
            p1_human5_wait_time -= (1 / 24);
            if (p1_human5_wait_time <= 0) {
                p1_human5_wait_time = 0;

                p1_human5_move.visible = true;

                p1_human5_move.position.x += 10 * (1 / 24);
                if (p1_human5_move.position.x > 100) {
                    p1_human5_move.position.x = -100;
                    p1_human5_move.visible = false;

                    p1_human5_wait_time = p1_human5_wait_time_value;
                }
            }
            p1_human6_wait_time -= (1 / 24);
            if (p1_human6_wait_time <= 0) {
                p1_human6_wait_time = 0;

                p1_human6_move.visible = true;

                p1_human6_move.position.x += 10 * (1 / 24);
                if (p1_human6_move.position.x > 100) {
                    p1_human6_move.position.x = -100;
                    p1_human6_move.visible = false;

                    p1_human6_wait_time = p1_human6_wait_time_value;
                }
            }
        }
        if (p2_show) {
            p2_human1_wait_time -= (1 / 24);
            if (p2_human1_wait_time <= 0) {
                p2_human1_wait_time = 0;

                p2_human1_move.visible = true;

                p2_human1_move.position.x += 10 * (1 / 24);
                if (p2_human1_move.position.x > 100) {
                    p2_human1_move.position.x = -100;
                    p2_human1_move.visible = false;

                    p2_human1_wait_time = p2_human1_wait_time_value;
                }
            }
            p2_human2_wait_time -= (1 / 24);
            if (p2_human2_wait_time <= 0) {
                p2_human2_wait_time = 0;

                p2_human2_move.visible = true;

                p2_human2_move.position.x += 12.5 * (1 / 24);
                if (p2_human2_move.position.x > 100) {
                    p2_human2_move.position.x = -100;
                    p2_human2_move.visible = false;

                    p2_human2_wait_time = p2_human2_wait_time_value;
                }
            }
            p2_human3_wait_time -= (1 / 24);
            if (p2_human3_wait_time <= 0) {
                p2_human3_wait_time = 0;

                p2_human3_move.visible = true;

                p2_human3_move.position.x += 10 * (1 / 24);
                if (p2_human3_move.position.x > 100) {
                    p2_human3_move.position.x = -100;
                    p2_human3_move.visible = false;

                    p2_human3_wait_time = p2_human3_wait_time_value;
                }
            }
            p2_human4_wait_time -= (1 / 24);
            if (p2_human4_wait_time <= 0) {
                p2_human4_wait_time = 0;

                p2_human4_move.visible = true;

                p2_human4_move.position.x += 10 * (1 / 24);
                if (p2_human4_move.position.x > 100) {
                    p2_human4_move.position.x = -100;
                    p2_human4_move.visible = false;

                    p2_human4_wait_time = p2_human4_wait_time_value;
                }
            }
            p2_human5_wait_time -= (1 / 24);
            if (p2_human5_wait_time <= 0) {
                p2_human5_wait_time = 0;

                p2_human5_move.visible = true;

                p2_human5_move.position.x += 10 * (1 / 24);
                if (p2_human5_move.position.x > 100) {
                    p2_human5_move.position.x = -100;
                    p2_human5_move.visible = false;

                    p2_human5_wait_time = p2_human5_wait_time_value;
                }
            }
        }
        if (p3_show) {
            p3_human1_wait_time -= (1 / 24);
            if (p3_human1_wait_time <= 0) {
                p3_human1_wait_time = 0;

                p3_human1_move.visible = true;

                p3_human1_move.position.x += 10 * (1 / 24);
                if (p3_human1_move.position.x > 100) {
                    p3_human1_move.position.x = -100;
                    p3_human1_move.visible = false;

                    p3_human1_wait_time = p3_human1_wait_time_value;
                }
            }
            p3_human2_wait_time -= (1 / 24);
            if (p3_human2_wait_time <= 0) {
                p3_human2_wait_time = 0;

                p3_human2_move.visible = true;

                p3_human2_move.position.x += 12.5 * (1 / 24);
                if (p3_human2_move.position.x > 100) {
                    p3_human2_move.position.x = -100;
                    p3_human2_move.visible = false;

                    p3_human2_wait_time = p3_human2_wait_time_value;
                }
            }
            p3_human3_wait_time -= (1 / 24);
            if (p3_human3_wait_time <= 0) {
                p3_human3_wait_time = 0;

                p3_human3_move.visible = true;

                p3_human3_move.position.x += 10 * (1 / 24);
                if (p3_human3_move.position.x > 100) {
                    p3_human3_move.position.x = -100;
                    p3_human3_move.visible = false;

                    p3_human3_wait_time = p3_human3_wait_time_value;
                }
            }
            p3_human4_wait_time -= (1 / 24);
            if (p3_human4_wait_time <= 0) {
                p3_human4_wait_time = 0;

                p3_human4_move.visible = true;

                p3_human4_move.position.x += 10 * (1 / 24);
                if (p3_human4_move.position.x > 100) {
                    p3_human4_move.position.x = -100;
                    p3_human4_move.visible = false;

                    p3_human4_wait_time = p3_human4_wait_time_value;
                }
            }
            p3_human5_wait_time -= (1 / 24);
            if (p3_human5_wait_time <= 0) {
                p3_human5_wait_time = 0;

                p3_human5_move.visible = true;

                p3_human5_move.position.x += 10 * (1 / 24);
                if (p3_human5_move.position.x > 100) {
                    p3_human5_move.position.x = -100;
                    p3_human5_move.visible = false;

                    p3_human5_wait_time = p3_human5_wait_time_value;
                }
            }
        }
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

function choice1_worker() {
    document.getElementById("text-1").style.display = "block";
    document.getElementById("text-2").style.display = "none";
    document.getElementById("text-3").style.display = "none";

    document.getElementById("choice1-btn").src = "assets/images/button_1_red.png";
    document.getElementById("choice2-btn").src = "assets/images/button_2.png";
    document.getElementById("choice3-btn").src = "assets/images/button_3.png";

    if (!p1_show) {
        model1.visible = false;
        model2.visible = true;
        model3.visible = false;
        model4.visible = false;

        // P1.
        p1_bicycle_move.position.x = -100;
        p1_bicycle_move.position.y = human_base_y;
        p1_bicycle_move.position.z = p1_bicycle_plane.position.z;
        p1_bicycle_move.visible = false;

        p1_human2_move.position.x = 0;
        p1_human2_move.position.y = human_base_y;
        p1_human2_move.position.z = p1_human2_plane.position.z;
        p1_human2_move.visible = true;

        p1_human3_move.position.x = -100;
        p1_human3_move.position.y = human_base_y;
        p1_human3_move.position.z = p1_human5_plane.position.z;
        p1_human3_move.visible = false;

        p1_human4_move.position.x = 40;
        p1_human4_move.position.y = human_base_y;
        p1_human4_move.position.z = p1_human1_plane.position.z;
        p1_human4_move.visible = true;

        p1_human5_move.position.x = -40;
        p1_human5_move.position.y = human_base_y;
        p1_human5_move.position.z = p1_human3_plane.position.z;
        p1_human5_move.visible = true;

        p1_human6_move.position.x = -80;
        p1_human6_move.position.y = human_base_y;
        p1_human6_move.position.z = p1_human4_plane.position.z;
        p1_human6_move.visible = true;

        p1_human3_move.renderOrder = 1;
        p1_human6_move.renderOrder = 2;
        lamppost2_1.renderOrder = 3;
        lamppost2_2a.renderOrder = 4;
        p1_bicycle_move.renderOrder = 5;
        p1_human5_move.renderOrder = 6;
        p1_human2_move.renderOrder = 7;
        p1_human4_move.renderOrder = 8;
        lamppost2_2b.renderOrder = 9;
        p1_icon_move.renderOrder = 10;

        p1_bicycle_wait_time_value = 0;
        p1_human2_wait_time_value = 0;
        p1_human3_wait_time_value = 1;
        p1_human4_wait_time_value = 0;
        p1_human5_wait_time_value = 0;
        p1_human6_wait_time_value = 0;

        p1_bicycle_wait_time = p1_bicycle_wait_time_value;
        p1_human2_wait_time = p1_human2_wait_time_value;
        p1_human3_wait_time = p1_human3_wait_time_value;
        p1_human4_wait_time = p1_human4_wait_time_value;
        p1_human5_wait_time = p1_human5_wait_time_value;
        p1_human6_wait_time = p1_human6_wait_time_value;

        SpriteAnimator.resetFrame(p1_icon_animation);

        p1_show = true;
        p2_show = false;
        p3_show = false;
    }
}

function choice2_worker() {
    document.getElementById("text-1").style.display = "none";
    document.getElementById("text-2").style.display = "block";
    document.getElementById("text-3").style.display = "none";

    document.getElementById("choice1-btn").src = "assets/images/button_1.png";
    document.getElementById("choice2-btn").src = "assets/images/button_2_red.png";
    document.getElementById("choice3-btn").src = "assets/images/button_3.png";

    if (!p2_show) {
        model1.visible = false;
        model2.visible = false;
        model3.visible = true;
        model4.visible = false;

        // P2.
        p2_human1_move.position.x = 0;
        p2_human1_move.position.y = human_base_y;
        p2_human1_move.position.z = p2_human5_plane.position.z;
        p2_human1_move.visible = true;

        p2_human2_move.position.x = -100;
        p2_human2_move.position.y = human_base_y;
        p2_human2_move.position.z = p2_human2_plane.position.z;
        p2_human2_move.visible = false;

        p2_human3_move.position.x = 40;
        p2_human3_move.position.y = human_base_y;
        p2_human3_move.position.z = p2_human1_plane.position.z;
        p2_human3_move.visible = true;

        p2_human4_move.position.x = -40;
        p2_human4_move.position.y = human_base_y;
        p2_human4_move.position.z = p2_human3_plane.position.z;
        p2_human4_move.visible = true;

        p2_human5_move.position.x = -80;
        p2_human5_move.position.y = human_base_y;
        p2_human5_move.position.z = p2_human4_plane.position.z;
        p2_human5_move.visible = true;

        p2_human2_move.renderOrder = 1;
        p2_human5_move.renderOrder = 2;
        lamppost3_1.renderOrder = 3;
        lamppost3_2a.renderOrder = 4;
        p2_human4_move.renderOrder = 5;
        p2_human1_move.renderOrder = 6;
        p2_human3_move.renderOrder = 7;
        lamppost3_2b.renderOrder = 8;
        p2_icon_move.renderOrder = 9;

        p2_human1_wait_time_value = 0;
        p2_human2_wait_time_value = 1;
        p2_human3_wait_time_value = 0;
        p2_human4_wait_time_value = 0;
        p2_human5_wait_time_value = 0;

        p2_human1_wait_time = p2_human1_wait_time_value;
        p2_human2_wait_time = p2_human2_wait_time_value;
        p2_human3_wait_time = p2_human3_wait_time_value;
        p2_human4_wait_time = p2_human4_wait_time_value;
        p2_human5_wait_time = p2_human5_wait_time_value;

        SpriteAnimator.resetFrame(p2_icon_animation);

        p1_show = false;
        p2_show = true;
        p3_show = false;
    }
}

function choice3_worker() {
    document.getElementById("text-1").style.display = "none";
    document.getElementById("text-2").style.display = "none";
    document.getElementById("text-3").style.display = "block";

    document.getElementById("choice1-btn").src = "assets/images/button_1.png";
    document.getElementById("choice2-btn").src = "assets/images/button_2.png";
    document.getElementById("choice3-btn").src = "assets/images/button_3_red.png";

    if (!p3_show) {
        model1.visible = false;
        model2.visible = false;
        model3.visible = false;
        model4.visible = true;

        // P3.
        p3_human1_move.position.x = 0;
        p3_human1_move.position.y = human_base_y;
        p3_human1_move.position.z = p3_human2_plane.position.z;
        p3_human1_move.visible = true;

        p3_human2_move.position.x = -100;
        p3_human2_move.position.y = human_base_y;
        p3_human2_move.position.z = p3_human5_plane.position.z;
        p3_human2_move.visible = false;

        p3_human3_move.position.x = 40;
        p3_human3_move.position.y = human_base_y;
        p3_human3_move.position.z = p3_human1_plane.position.z;
        p3_human3_move.visible = true;

        p3_human4_move.position.x = -40;
        p3_human4_move.position.y = human_base_y;
        p3_human4_move.position.z = p3_human3_plane.position.z;
        p3_human4_move.visible = true;

        p3_human5_move.position.x = -80;
        p3_human5_move.position.y = human_base_y;
        p3_human5_move.position.z = p3_human4_plane.position.z;
        p3_human5_move.visible = true;

        p3_human2_move.renderOrder = 1;
        p3_human3_move.renderOrder = 2;
        lamppost4_1.renderOrder = 3;
        lamppost4_2a.renderOrder = 4;
        p3_human5_move.renderOrder = 5;
        p3_human4_move.renderOrder = 6;
        p3_human1_move.renderOrder = 7;
        lamppost4_2b.renderOrder = 8;
        p3_icon_move.renderOrder = 9;

        p3_human1_wait_time_value = 0;
        p3_human2_wait_time_value = 1;
        p3_human3_wait_time_value = 0;
        p3_human4_wait_time_value = 0;
        p3_human5_wait_time_value = 0;

        p3_human1_wait_time = p3_human1_wait_time_value;
        p3_human2_wait_time = p3_human2_wait_time_value;
        p3_human3_wait_time = p3_human3_wait_time_value;
        p3_human4_wait_time = p3_human4_wait_time_value;
        p3_human5_wait_time = p3_human5_wait_time_value;

        SpriteAnimator.resetFrame(p3_icon_animation);

        p1_show = false;
        p2_show = false;
        p3_show = true;
    }
}

function loadTextures(urls, callback) {
    var textures = [];

    var onLoad = function () {
        callback(null, textures);
    };

    var onProgress = function () { };

    var onError = function (url) {
        callback(new Error('Cannot load ' + url));
    };

    var manager = new THREE.LoadingManager(onLoad, onProgress, onError);

    var loader = new THREE.TextureLoader(manager);

    for (var i = 0; i < urls.length; i++) {
        textures.push(loader.load(urls[i]));
    }
}