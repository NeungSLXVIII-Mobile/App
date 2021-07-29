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

//gltf
var model0;
var model1;
var model2;
var model3;

//tools
var adjust_scale = 2;
var adjust_px = 380 / 10;
var adjust_py = 0;
var adjust_angle = 25;
//, side: THREE.DoubleSide

var sun_shade_texture = THREE.ImageUtils.loadTexture('assets/sprites/sun_shade.png');
var sun_shade_animate = SpriteAnimator.add({ texture: sun_shade_texture, tilesHorizontal: 13, tilesVertical: 13, fps: 24, numberOfTiles: 151 });

var solar_irradiance_texture = THREE.ImageUtils.loadTexture('assets/sprites/solar_irradiance.png');
var solar_irradiance_animate = SpriteAnimator.add({ texture: solar_irradiance_texture, tilesHorizontal: 16, tilesVertical: 16, fps: 24, numberOfTiles: 251 });

var wind_flow_texture = THREE.ImageUtils.loadTexture('assets/sprites/wind_flow.png');
var wind_flow_animate = SpriteAnimator.add({ texture: wind_flow_texture, tilesHorizontal: 12, tilesVertical: 12, fps: 24, numberOfTiles: 126 });

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

    var sun_shade_time = document.getElementById("sun_shade_time");

    ///
    var step = 1;

    var root = new THREE.Object3D();
    scene.add(root);
    root.visible = false;

    /* Load Model */
    var threeGLTFLoader0 = new THREE.GLTFLoader();
    threeGLTFLoader0.load("Data/models/environmental1.gltf", function (gltf) {
        model0 = gltf.scene;

        model0.position.x = 0;
        model0.position.y = 25;
        model0.position.z = 0;

        model0.scale.x = model0.scale.y = model0.scale.z = 0.1;
        model0.rotation.x = adjust_angle * 0.0174532925;

        model0.visible = true;

        console.log("model0");

        var building0;
        var building_floor0;

        for (count = 0; count < model0.children.length; count++) {
            console.log(model0.children[count]);
            // Building.
            if (model0.children[count].name == "Building") {
                console.log("Building LV1");
                building0 = model0.children[count];
            }

            // Floor.
            if (model0.children[count].name == "Cube") {
                console.log("Cube LV1");
                building_floor0 = model0.children[count];
            }

            // Plane.
            if (model0.children[count].name == "Plane") {
                console.log("Plane LV1");
                model0.children[count].visible = false;
            }

            for (count2 = 0; count2 < model0.children[count].children.length; count2++) {
                console.log(model0.children[count].children[count2]);

                // Building.
                if (model0.children[count].children[count2].name == "Building") {
                    console.log("Building LV2");
                    building0 = model0.children[count].children[count2];
                }

                // Floor.
                if (model0.children[count].children[count2].name == "Cube") {
                    console.log("Cube LV2");
                    building_floor0 = model0.children[count].children[count2];
                }

                // Plane.
                if (model0.children[count].name == "Plane") {
                    console.log("Plane LV2");
                    model0.children[count].children[count2].visible = false;
                }
            }
        }

        if (building0 != undefined) {
            building0.material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/building0.png'), opacity: 1, side: THREE.DoubleSide });
            building0.material.needsUpdate = true;
        }

        if (building_floor0 != undefined) {
            building_floor0.material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/building_floor0.png'), opacity: 1, transparent: true, side: THREE.DoubleSide });
            building_floor0.material.needsUpdate = true;
        }

        root.add(model0);
    });
    var threeGLTFLoader1 = new THREE.GLTFLoader();
    threeGLTFLoader1.load("Data/models/environmental1.gltf", function (gltf) {
        model1 = gltf.scene;

        model1.position.x = 0;
        model1.position.y = 25;
        model1.position.z = 0;

        model1.scale.x = model1.scale.y = model1.scale.z = 0.1;
        model1.rotation.x = adjust_angle * 0.0174532925;

        model1.visible = false;

        console.log("model1");

        var building1;
        var building_floor1;
        var building_plane1;

        for (count = 0; count < model1.children.length; count++) {
            console.log(model1.children[count]);
            // Building.
            if (model1.children[count].name == "Building") {
                console.log("Building LV1");
                building1 = model1.children[count];
            }

            // Floor.
            if (model1.children[count].name == "Cube") {
                console.log("Cube LV1");
                building_floor1 = model1.children[count];
            }

            // Plane.
            if (model1.children[count].name == "Plane") {
                console.log("Plane LV1");
                building_plane1 = model1.children[count];
            }

            for (count2 = 0; count2 < model1.children[count].children.length; count2++) {
                console.log(model1.children[count].children[count2]);

                // Building.
                if (model1.children[count].children[count2].name == "Building") {
                    console.log("Building LV2");
                    building1 = model1.children[count].children[count2];
                }

                // Floor.
                if (model1.children[count].children[count2].name == "Cube") {
                    console.log("Cube LV2");
                    building_floor1 = model1.children[count].children[count2];
                }

                // Plane.
                if (model1.children[count].name == "Plane") {
                    console.log("Plane LV2");
                    building_plane1 = model1.children[count].children[count2];
                }
            }
        }

        if (building1 != undefined) {
            building1.material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/building1.png'), opacity: 1, side: THREE.DoubleSide });
            building1.material.needsUpdate = true;
        }

        if (building_floor1 != undefined) {
            building_floor1.material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/building_floor1.png'), opacity: 1, side: THREE.DoubleSide });
            building_floor1.material.needsUpdate = true;
        }

        if (building_plane1 != undefined) {
            building_plane1.material = new THREE.MeshBasicMaterial({ transparent: true, depthTest: true, map: sun_shade_texture, side: THREE.DoubleSide });
            building_plane1.material.needsUpdate = true;
            building_plane1.rotation.x = -180 * 0.0174532925;
        }

        root.add(model1);
    });
    var threeGLTFLoader2 = new THREE.GLTFLoader();
    threeGLTFLoader2.load("Data/models/environmental2.gltf", function (gltf) {
        model2 = gltf.scene;

        model2.position.x = 0;
        model2.position.y = 25;
        model2.position.z = 0;

        model2.scale.x = model2.scale.y = model2.scale.z = 0.1;
        model2.rotation.x = adjust_angle * 0.0174532925;

        model2.visible = false;

        console.log("model2");

        var building2;
        var building_floor2;
        var building_plane2;

        for (count = 0; count < model2.children.length; count++) {
            console.log(model2.children[count]);
            // Building.
            if (model2.children[count].name == "Building") {
                console.log("Building LV1");
                building2 = model2.children[count];
            }

            // Floor.
            if (model2.children[count].name == "Cube") {
                console.log("Cube LV1");
                building_floor2 = model2.children[count];
            }

            // Plane.
            if (model2.children[count].name == "Plane") {
                console.log("Plane LV1");
                building_plane2 = model2.children[count];
            }

            for (count2 = 0; count2 < model2.children[count].children.length; count2++) {
                console.log(model2.children[count].children[count2]);

                // Building.
                if (model2.children[count].children[count2].name == "Building") {
                    console.log("Building LV2");
                    building2 = model2.children[count].children[count2];
                }

                // Floor.
                if (model2.children[count].children[count2].name == "Cube") {
                    console.log("Cube LV2");
                    building_floor2 = model2.children[count].children[count2];
                }

                // Plane.
                if (model2.children[count].name == "Plane") {
                    console.log("Plane LV2");
                    building_plane2 = model2.children[count].children[count2];
                }
            }
        }

        if (building2 != undefined) {
            building2.material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/building2.png'), opacity: 1, side: THREE.DoubleSide });
            building2.material.needsUpdate = true;
        }

        if (building_floor2 != undefined) {
            building_floor2.material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/building_floor2.png'), opacity: 1, side: THREE.DoubleSide });
            building_floor2.material.needsUpdate = true;
        }

        if (building_plane2 != undefined) {
            building_plane2.material = new THREE.MeshBasicMaterial({ transparent: true, depthTest: true, map: solar_irradiance_texture, side: THREE.DoubleSide });
            building_plane2.material.needsUpdate = true;
            building_plane2.rotation.x = -180 * 0.0174532925;
        }

        root.add(model2);
    });
    var threeGLTFLoader3 = new THREE.GLTFLoader();
    threeGLTFLoader3.load("Data/models/environmental3.gltf", function (gltf) {
        model3 = gltf.scene;

        model3.position.x = 0;
        model3.position.y = 25;
        model3.position.z = 0;

        model3.scale.x = model3.scale.y = model3.scale.z = 0.1;
        model3.rotation.x = adjust_angle * 0.0174532925;

        model3.visible = false;

        console.log("model3");

        var building3;
        var building_floor3;
        var building_plane3;

        for (count = 0; count < model3.children.length; count++) {
            console.log(model3.children[count]);
            // Building.
            if (model3.children[count].name == "Building") {
                console.log("Building LV1");
                building3 = model3.children[count];
            }

            // Floor.
            if (model3.children[count].name == "Cube") {
                console.log("Cube LV1");
                building_floor3 = model3.children[count];
            }

            // Plane.
            if (model3.children[count].name == "Plane1") {
                console.log("Plane1 LV1");
                building_plane3 = model3.children[count];
            }

            for (count2 = 0; count2 < model3.children[count].children.length; count2++) {
                console.log(model3.children[count].children[count2]);

                // Building.
                if (model3.children[count].children[count2].name == "Building") {
                    console.log("Building LV2");
                    building3 = model3.children[count].children[count2];
                }

                // Floor.
                if (model3.children[count].children[count2].name == "Cube") {
                    console.log("Cube LV2");
                    building_floor3 = model3.children[count].children[count2];
                }

                // Plane.
                if (model3.children[count].name == "Plane1") {
                    console.log("Plane1 LV2");
                    building_plane3 = model3.children[count].children[count2];
                }
            }
        }

        if (building3 != undefined) {
            building3.material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/building3.png'), opacity: 1, side: THREE.DoubleSide });
            building3.material.needsUpdate = true;
        }

        if (building_floor3 != undefined) {
            building_floor3.material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/building_floor3.png'), opacity: 1, side: THREE.DoubleSide });
            building_floor3.material.needsUpdate = true;
        }

        if (building_plane3 != undefined) {
            building_plane3.material = new THREE.MeshBasicMaterial({ transparent: true, depthTest: true, map: wind_flow_texture, side: THREE.DoubleSide });
            building_plane3.material.needsUpdate = true;
            building_plane3.rotation.x = -180 * 0.0174532925;
        }

        root.add(model3);
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

            model0.quaternion.multiplyQuaternions(deltaRotationQuaternion, model0.quaternion);
            model1.quaternion.multiplyQuaternions(deltaRotationQuaternion, model1.quaternion);
            model2.quaternion.multiplyQuaternions(deltaRotationQuaternion, model2.quaternion);
            model3.quaternion.multiplyQuaternions(deltaRotationQuaternion, model3.quaternion);
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

            model0.quaternion.multiplyQuaternions(deltaRotationQuaternion, model0.quaternion);
            model1.quaternion.multiplyQuaternions(deltaRotationQuaternion, model1.quaternion);
            model2.quaternion.multiplyQuaternions(deltaRotationQuaternion, model2.quaternion);
            model3.quaternion.multiplyQuaternions(deltaRotationQuaternion, model3.quaternion);
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

        if (model0 !== undefined) {
            // console.log("modelX:" + model1.position.x);
            // console.log("modelY:" + model1.position.y);
            // console.log("modelZ:" + model1.position.z);
            // model1.rotation.y = 45 * 0.0174532925;
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

        root.visible = true;

        renderer.render(scene, camera);
        SpriteAnimator.update(clock.getDelta());

        var current_frame = SpriteAnimator.currentTile(sun_shade_animate);
        //console.log("assets/images/time/TimerVer01" + zero_path(current_frame) + current_frame + ".png");
        sun_shade_time.src = "assets/images/time/TimerVer01" + zero_path(current_frame) + current_frame + ".png";

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

    sun_shade_time.style.display = "block";

    model0.visible = false;
    model1.visible = true;
    model2.visible = false;
    model3.visible = false;
}

function choice2_worker() {
    document.getElementById("text-1").style.display = "none";
    document.getElementById("text-2").style.display = "block";
    document.getElementById("text-3").style.display = "none";

    document.getElementById("choice1-btn").src = "assets/images/button_1.png";
    document.getElementById("choice2-btn").src = "assets/images/button_2_red.png";
    document.getElementById("choice3-btn").src = "assets/images/button_3.png";

    sun_shade_time.style.display = "none";

    model0.visible = false;
    model1.visible = false;
    model2.visible = true;
    model3.visible = false;
}

function choice3_worker() {
    document.getElementById("text-1").style.display = "none";
    document.getElementById("text-2").style.display = "none";
    document.getElementById("text-3").style.display = "block";

    document.getElementById("choice1-btn").src = "assets/images/button_1.png";
    document.getElementById("choice2-btn").src = "assets/images/button_2.png";
    document.getElementById("choice3-btn").src = "assets/images/button_3_red.png";

    sun_shade_time.style.display = "none";

    model0.visible = false;
    model1.visible = false;
    model2.visible = false;
    model3.visible = true;
}

function zero_path(count) {
    if (count < 10) {
        return '_0000';
    }
    else if (count >= 10 && count < 100) {
        return '_000';
    }
    else {
        return '_00';
    }
}