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

var bicycle_texture = THREE.ImageUtils.loadTexture('assets/sprites/part1_bicycle.png');
SpriteAnimator.add({ texture: bicycle_texture, tilesHorizontal: 23, tilesVertical: 22, fps: 24, numberOfTiles: 500 });
var bicycle_animate = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial({ transparent: true, depthTest: false, map: bicycle_texture, side: THREE.DoubleSide }));

var human01_texture = THREE.ImageUtils.loadTexture('assets/sprites/human01.png');
SpriteAnimator.add({ texture: bicycle_texture, tilesHorizontal: 1, tilesVertical: 1, fps: 24, numberOfTiles: 1 });

var human02_texture = THREE.ImageUtils.loadTexture('assets/sprites/human02.png');
SpriteAnimator.add({ texture: bicycle_texture, tilesHorizontal: 1, tilesVertical: 1, fps: 24, numberOfTiles: 1 });

var human03_texture = THREE.ImageUtils.loadTexture('assets/sprites/human03.png');
SpriteAnimator.add({ texture: bicycle_texture, tilesHorizontal: 1, tilesVertical: 1, fps: 24, numberOfTiles: 1 });

var human04_texture = THREE.ImageUtils.loadTexture('assets/sprites/human04.png');
SpriteAnimator.add({ texture: bicycle_texture, tilesHorizontal: 1, tilesVertical: 1, fps: 24, numberOfTiles: 1 });

// P1.
var p1_bicycle_frame = 0;
var p1_bicycle_duration = 0;
var p1_bicycle_textures = [];
for (count = 0; count < 500; count++) {
    if (count < 10) {
        p1_bicycle_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/01_Bicycle/01_Bicycle_0000' + count + '.png');
    }
    else if (count >= 10 && count < 100) {
        p1_bicycle_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/01_Bicycle/01_Bicycle_000' + count + '.png');
    }
    else {
        p1_bicycle_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/01_Bicycle/01_Bicycle_00' + count + '.png');
    }
}
var p1_human2_frame = 0;
var p1_human2_duration = 0;
var p1_human2_textures = [];
for (count = 0; count < 500; count++) {
    if (count < 10) {
        p1_human2_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/02_Human/02_Human_0000' + count + '.png');
    }
    else if (count >= 10 && count < 100) {
        p1_human2_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/02_Human/02_Human_000' + count + '.png');
    }
    else {
        p1_human2_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/02_Human/02_Human_00' + count + '.png');
    }
}
var p1_human3_frame = 0;
var p1_human3_duration = 0;
var p1_human3_textures = [];
for (count = 0; count < 500; count++) {
    if (count < 10) {
        p1_human3_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/03_Human/03_Human_0000' + count + '.png');
    }
    else if (count >= 10 && count < 100) {
        p1_human3_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/03_Human/03_Human_000' + count + '.png');
    }
    else {
        p1_human3_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/03_Human/03_Human_00' + count + '.png');
    }
}
var p1_human4_frame = 0;
var p1_human4_duration = 0;
var p1_human4_textures = [];
for (count = 0; count < 500; count++) {
    if (count < 10) {
        p1_human4_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/04_Human/04_Human_0000' + count + '.png');
    }
    else if (count >= 10 && count < 100) {
        p1_human4_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/04_Human/04_Human_000' + count + '.png');
    }
    else {
        p1_human4_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/04_Human/04_Human_00' + count + '.png');
    }
}
var p1_human5_frame = 0;
var p1_human5_duration = 0;
var p1_human5_textures = [];
for (count = 0; count < 500; count++) {
    if (count < 10) {
        p1_human5_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/05_Human/05_Human_0000' + count + '.png');
    }
    else if (count >= 10 && count < 100) {
        p1_human5_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/05_Human/05_Human_000' + count + '.png');
    }
    else {
        p1_human5_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/05_Human/05_Human_00' + count + '.png');
    }
}
var p1_human6_frame = 0;
var p1_human6_duration = 0;
var p1_human6_textures = [];
for (count = 0; count < 500; count++) {
    if (count < 10) {
        p1_human6_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/06_Human/06_Human_0000' + count + '.png');
    }
    else if (count >= 10 && count < 100) {
        p1_human6_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/06_Human/06_Human_000' + count + '.png');
    }
    else {
        p1_human6_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/06_Human/06_Human_00' + count + '.png');
    }
}
var p1_icon_frame = 0;
var p1_icon_duration = 0;
var p1_icon_textures = [];
for (count = 0; count < 500; count++) {
    if (count < 10) {
        p1_icon_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/Part01_Icon/Part01_Icon_0000' + count + '.png');
    }
    else if (count >= 10 && count < 100) {
        p1_icon_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/Part01_Icon/Part01_Icon_000' + count + '.png');
    }
    else {
        p1_icon_textures[count] = THREE.ImageUtils.loadTexture('assets/sprites/1/Part01_Icon/Part01_Icon_00' + count + '.png');
    }
}

var p1_bicycle_material = new THREE.MeshBasicMaterial({ map: p1_bicycle_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
var p1_human2_material = new THREE.MeshBasicMaterial({ map: p1_human2_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
var p1_human3_material = new THREE.MeshBasicMaterial({ map: p1_human3_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
var p1_human4_material = new THREE.MeshBasicMaterial({ map: p1_human4_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
var p1_human5_material = new THREE.MeshBasicMaterial({ map: p1_human5_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
var p1_human6_material = new THREE.MeshBasicMaterial({ map: p1_human6_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });
var p1_icon_material = new THREE.MeshBasicMaterial({ map: p1_icon_textures[0], depthTest: false, transparent: true, side: THREE.DoubleSide });

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
            bg1_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/bg.png'), opacity: 1, depthTest: false, transparent: false, side: THREE.DoubleSide });
            bg1_1.material.needsUpdate = true;

            bg1_1.rotation.y = 180 * 0.0174532925;
            bg1_1.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 1.
        if (lamppost1_1 != undefined) {
            lamppost1_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost01.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
            lamppost1_1.material.needsUpdate = true;

            lamppost1_1.rotation.y = 180 * 0.0174532925;
            lamppost1_1.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 2a.
        if (lamppost1_2a != undefined) {
            lamppost1_2a.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost02.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
            lamppost1_2a.material.needsUpdate = true;

            lamppost1_2a.rotation.y = 180 * 0.0174532925;
            lamppost1_2a.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 2b.
        if (lamppost1_2b != undefined) {
            lamppost1_2b.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost02.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
            lamppost1_2b.material.needsUpdate = true;

            lamppost1_2b.rotation.y = 180 * 0.0174532925;
            lamppost1_2b.rotation.z = 180 * 0.0174532925;
        }

        // floor.
        if (floor1_1 != undefined) {
            floor1_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/floor.png'), opacity: 1, depthTest: true, transparent: false, side: THREE.DoubleSide });
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

        model2.visible = false;

        var tree2_1;
        var tree2_2;
        var bg2_1;
        var floor2_1;
        var lamppost2_1;
        var lamppost2_2a;
        var lamppost2_2b;
        var bicycle2_1;
        var human2_2;
        var human2_3;
        var human2_4;
        var human2_5;
        var human2_6;
        var icon2_1;

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
            if (model2.children[count].name == "Cube") {
                console.log("Cube LV1");
                floor2_1 = model2.children[count];
            }
            if (model2.children[count].name == "Bicycle") {
                console.log("Bicycle LV1");
                bicycle2_1 = model2.children[count];
            }
            if (model2.children[count].name == "Human02") {
                console.log("Human02 LV1");
                human2_2 = model2.children[count];
            }
            if (model2.children[count].name == "Human03") {
                console.log("Human03 LV1");
                human2_3 = model2.children[count];
            }
            if (model2.children[count].name == "Human04") {
                console.log("Human04 LV1");
                human2_4 = model2.children[count];
            }
            if (model2.children[count].name == "Human05") {
                console.log("Human05 LV1");
                human2_5 = model2.children[count];
            }
            if (model2.children[count].name == "Human06") {
                console.log("Human06 LV1");
                human2_6 = model2.children[count];
            }
            if (model2.children[count].name == "Icon") {
                console.log("Icon LV1");
                icon2_1 = model2.children[count];
            }
        }

        // tree 1.
        if (tree2_1 != undefined) {
            tree2_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/tree01.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
            tree2_1.material.needsUpdate = true;

            tree2_1.rotation.y = 180 * 0.0174532925;
            tree2_1.rotation.z = 180 * 0.0174532925;
        }

        // tree 2.
        if (tree2_2 != undefined) {
            tree2_2.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/tree02.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
            tree2_2.material.needsUpdate = true;

            tree2_2.rotation.y = 180 * 0.0174532925;
            tree2_2.rotation.z = 180 * 0.0174532925;
        }

        // BG.
        if (bg2_1 != undefined) {
            bg2_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/bg.png'), opacity: 1, depthTest: false, transparent: false, side: THREE.DoubleSide });
            bg2_1.material.needsUpdate = true;

            bg2_1.rotation.y = 180 * 0.0174532925;
            bg2_1.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 1.
        if (lamppost2_1 != undefined) {
            lamppost2_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost01_light.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
            lamppost2_1.material.needsUpdate = true;

            lamppost2_1.rotation.y = 180 * 0.0174532925;
            lamppost2_1.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 2a.
        if (lamppost2_2a != undefined) {
            lamppost2_2a.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost02_light.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
            lamppost2_2a.material.needsUpdate = true;

            lamppost2_2a.rotation.y = 180 * 0.0174532925;
            lamppost2_2a.rotation.z = 180 * 0.0174532925;
        }

        // lamppost 2b.
        if (lamppost2_2b != undefined) {
            lamppost2_2b.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost02_light.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
            lamppost2_2b.material.needsUpdate = true;

            lamppost2_2b.rotation.y = 180 * 0.0174532925;
            lamppost2_2b.rotation.z = 180 * 0.0174532925;
        }

        // floor.
        if (floor2_1 != undefined) {
            floor2_1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/floor.png'), opacity: 1, depthTest: true, transparent: false, side: THREE.DoubleSide });
            floor2_1.material.needsUpdate = true;
        }

        // bicycle.
        if (bicycle2_1 != undefined) {
            bicycle2_1.material = p1_bicycle_material;
            bicycle2_1.material.needsUpdate = true;

            bicycle2_1.rotation.y = 180 * 0.0174532925;
            bicycle2_1.rotation.z = 180 * 0.0174532925;
        }

        if (human2_2 != undefined) {
            human2_2.material = p1_human2_material;
            human2_2.material.needsUpdate = true;

            human2_2.rotation.y = 180 * 0.0174532925;
            human2_2.rotation.z = 180 * 0.0174532925;
        }

        if (human2_3 != undefined) {
            human2_3.material = p1_human3_material;
            human2_3.material.needsUpdate = true;

            human2_3.rotation.y = 180 * 0.0174532925;
            human2_3.rotation.z = 180 * 0.0174532925;
        }

        if (human2_4 != undefined) {
            human2_4.material = p1_human4_material;
            human2_4.material.needsUpdate = true;

            human2_4.rotation.y = 180 * 0.0174532925;
            human2_4.rotation.z = 180 * 0.0174532925;
        }

        if (human2_5 != undefined) {
            human2_5.material = p1_human5_material;
            human2_5.material.needsUpdate = true;
        }

        if (human2_6 != undefined) {
            human2_6.material = p1_human6_material;
            human2_6.material.needsUpdate = true;

            human2_6.rotation.y = 180 * 0.0174532925;
            human2_6.rotation.z = 180 * 0.0174532925;
        }

        if (icon2_1 != undefined) {
            icon2_1.material = p1_icon_material;
            icon2_1.material.needsUpdate = true;

            icon2_1.rotation.y = 180 * 0.0174532925;
            icon2_1.rotation.z = 180 * 0.0174532925;
        }

        root.add(model2);
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

        p1_bicycle_material.map = p1_bicycle_textures[p1_bicycle_frame];
        p1_bicycle_frame++;
        if (p1_bicycle_frame >= 500) {
            p1_bicycle_frame = 0;
        }
        p1_human2_material.map = p1_human2_textures[p1_human2_frame];
        p1_human2_frame++;
        if (p1_human2_frame >= 500) {
            p1_human2_frame = 0;
        }
        p1_human3_material.map = p1_human3_textures[p1_human3_frame];
        p1_human3_frame++;
        if (p1_human3_frame >= 500) {
            p1_human3_frame = 0;
        }
        p1_human4_material.map = p1_human4_textures[p1_human4_frame];
        p1_human4_frame++;
        if (p1_human4_frame >= 500) {
            p1_human4_frame = 0;
        }
        p1_human5_material.map = p1_human5_textures[p1_human5_frame];
        p1_human5_frame++;
        if (p1_human5_frame >= 500) {
            p1_human5_frame = 0;
        }
        p1_human6_material.map = p1_human6_textures[p1_human6_frame];
        p1_human6_frame++;
        if (p1_human6_frame >= 500) {
            p1_human6_frame = 0;
        }
        p1_icon_material.map = p1_icon_textures[p1_icon_frame];
        p1_icon_frame++;
        if (p1_icon_frame >= 500) {
            p1_icon_frame = 0;
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
    model1.visible = false;
    model2.visible = true;
    // model3.visible = false;
    // model4.visible = false;
}

function choice2_worker() {
    model1.visible = false;
    model2.visible = false;
    // model3.visible = true;
    // model4.visible = false;
}

function choice3_worker() {
    model1.visible = false;
    model2.visible = false;
    // model3.visible = false;
    // model4.visible = true;
}
