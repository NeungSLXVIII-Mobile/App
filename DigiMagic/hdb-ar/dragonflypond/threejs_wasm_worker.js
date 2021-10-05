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
//var model0;
var model1;
var model2;
var model3;

//var mixer_model0;
var mixer_model1;
var mixer_model2;
var mixer_model3;

//tools
//var adjust_scale = 0.095;
var adjust_scale = 50;
var adjust_px = 380 / 10;
var adjust_py = 0;
var adjust_angle = 60;
var adjust_angle_z = 5;
//, side: THREE.DoubleSide

var show_button = false;

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

    //renderer.setClearColor(0xff0000, 1);

    var scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 350);
    scene.add(camera);
    //var camera = new THREE.Camera();
    //camera.matrixAutoUpdate = false;

    // var light = new THREE.AmbientLight(0xffffff);
    // scene.add(light);
    var light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    var direct_light = new THREE.DirectionalLight(0xffffff, 1);
    direct_light.position.set(1, 1, 2);
    scene.add(direct_light);

    // var point_light = new THREE.PointLight(0x0000ff, 100, 0);
    // point_light.position.set(0, 2, 5);
    // scene.add(point_light);

    ///
    var step = 1;

    var root = new THREE.Object3D();
    scene.add(root);
    root.visible = false;

    /* Load Model */
    // var threeGLTFLoader0 = new THREE.GLTFLoader();
    // threeGLTFLoader0.load("Data/models/dragonfly.gltf", function (gltf) {
    //     model0 = gltf.scene;

    //     model0.position.x = 0;
    //     model0.position.y = 0;
    //     model0.position.z = 0;

    //     model0.scale.x = model0.scale.y = model0.scale.z = adjust_scale;
    //     model0.rotation.x = adjust_angle * 0.0174532925;
    //     model0.rotation.z = adjust_angle_z * 0.0174532925;

    //     model0.visible = true;

    //     var dragonfly;

    //     mixer_model0 = new THREE.AnimationMixer(gltf.scene);
    //     gltf.animations.forEach((clip) => {
    //         mixer_model0.clipAction(clip).play();
    //     });

    //     console.log("model0");

    //     for (count = 0; count < model0.children.length; count++) {
    //         console.log(model0.children[count]);
    //         // Dragonfly.
    //         if (model0.children[count].name == "Dragonfly_Subdivision") {
    //             console.log("Dragonfly_Subdivision");
    //             console.log(model0.children[count].children.length);
    //             console.log(model0.children[count].children[0].children[0].material);

    //             dragonfly = model0.children[count].children[0].children[0];
    //         }
    //     }

    //     if (dragonfly != undefined) {
    //         dragonfly.material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/dragonfly_red.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
    //         dragonfly.material.needsUpdate = true;
    //         // dragonfly.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/dragonfly_red.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
    //         // dragonfly.material.needsUpdate = true;
    //     }

    //     root.add(model0);
    // });
    var threeGLTFLoader1 = new THREE.GLTFLoader();
    threeGLTFLoader1.load("Data/models/dragonfly.gltf", function (gltf) {
        model1 = gltf.scene;

        model1.position.x = 0;
        model1.position.y = 25;
        model1.position.z = 0;

        model1.scale.x = model1.scale.y = model1.scale.z = adjust_scale;
        model1.rotation.x = adjust_angle * 0.0174532925;
        model1.rotation.z = adjust_angle_z * 0.0174532925;

        model1.visible = false;

        var dragonfly1;

        mixer_model1 = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
            mixer_model1.clipAction(clip).play();
        });

        console.log("model1");

        for (count = 0; count < model1.children.length; count++) {
            //console.log(model1.children[count]);
            // Dragonfly.
            if (model1.children[count].name == "Dragonfly_Subdivision") {
                console.log("Dragonfly_Subdivision");
                console.log(model1.children[count].children.length);
                console.log(model1.children[count].children[0].children[0].material);

                dragonfly1 = model1.children[count].children[0].children[0];
            }
        }

        if (dragonfly1 != undefined) {
            dragonfly1.material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/dragonfly_red.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
            dragonfly1.material.needsUpdate = true;
            // dragonfly1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/dragonfly_red.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
            // dragonfly1.material.needsUpdate = true;
        }

        root.add(model1);
    });
    var threeGLTFLoader2 = new THREE.GLTFLoader();
    threeGLTFLoader2.load("Data/models/butterfly.gltf", function (gltf) {
        model2 = gltf.scene;

        model2.position.x = 0;
        model2.position.y = 0;
        model2.position.z = 0;

        model2.scale.x = model2.scale.y = model2.scale.z = (adjust_scale / 2);
        model2.rotation.x = adjust_angle * 0.0174532925;
        model2.rotation.z = adjust_angle_z * 0.0174532925;

        model2.visible = false;

        var butterfly2_antenna;
        var butterfly2_body;
        var butterfly2_leg;
        var butterfly2_wing;

        mixer_model2 = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
            mixer_model2.clipAction(clip).play();
        });

        console.log("model2");

        for (count = 0; count < model2.children.length; count++) {
            //console.log(model2.children[count]);
            // Butterfly.
            if (model2.children[count].name == "Argynnis_hyperbius_Antenna") {
                console.log("Argynnis_hyperbius_Antenna");
                console.log(model2.children[count].children.length);
                console.log(model2.children[count].children[0].material);

                butterfly2_antenna = model2.children[count].children[0];
            }
            if (model2.children[count].name == "Argynnis_hyperbius_Body") {
                console.log("Argynnis_hyperbius_Body");
                console.log(model2.children[count].children.length);
                console.log(model2.children[count].children[0].material);

                butterfly2_body = model2.children[count].children[0];
            }
            if (model2.children[count].name == "Argynnis_hyperbius_Leg") {
                console.log("Argynnis_hyperbius_Leg");
                console.log(model2.children[count].children.length);
                console.log(model2.children[count].children[0].material);

                butterfly2_leg = model2.children[count].children[0];
            }
            if (model2.children[count].name == "Argynnis_hyperbius_Wing") {
                console.log("Argynnis_hyperbius_Wing");
                console.log(model2.children[count].children.length);
                console.log(model2.children[count].children[0].material);

                butterfly2_wing = model2.children[count].children[0];
            }
        }

        if (butterfly2_antenna != undefined) {
            butterfly2_antenna.material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/butterfly.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
            butterfly2_antenna.material.needsUpdate = true;
            // butterfly2_antenna.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/butterfly.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
            // butterfly2_antenna.material.needsUpdate = true;
        }
        if (butterfly2_body != undefined) {
            butterfly2_body.material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/butterfly.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
            butterfly2_body.material.needsUpdate = true;
            // butterfly2_body.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/butterfly.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
            // butterfly2_body.material.needsUpdate = true;
        }
        if (butterfly2_leg != undefined) {
            butterfly2_leg.material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/butterfly.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
            butterfly2_leg.material.needsUpdate = true;
            // butterfly2_leg.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/butterfly.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
            // butterfly2_leg.material.needsUpdate = true;
        }
        if (butterfly2_wing != undefined) {
            butterfly2_wing.material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/butterfly_wing.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
            butterfly2_wing.material.needsUpdate = true;
            // butterfly2_wing.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/butterfly_wing.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
            // butterfly2_wing.material.needsUpdate = true;
        }

        root.add(model2);
    });
    var threeGLTFLoader3 = new THREE.GLTFLoader();
    threeGLTFLoader3.load("Data/models/dragonfly.gltf", function (gltf) {
        model3 = gltf.scene;

        model3.position.x = 0;
        model3.position.y = 25;
        model3.position.z = 0;

        model3.scale.x = model3.scale.y = model3.scale.z = adjust_scale;
        model3.rotation.x = adjust_angle * 0.0174532925;
        model3.rotation.z = adjust_angle_z * 0.0174532925;

        model3.visible = false;

        var bird3;

        mixer_model3 = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
            mixer_model3.clipAction(clip).play();
        });

        console.log("model3");

        for (count = 0; count < model3.children.length; count++) {
            //console.log(model3.children[count]);
            // Bird.
            if (model3.children[count].name == "Dragonfly_Subdivision") {
                console.log("Dragonfly_Subdivision");
                console.log(model3.children[count].children.length);
                console.log(model3.children[count].children[0].children[0].material);

                bird3 = model3.children[count].children[0].children[0];
            }
        }

        if (bird3 != undefined) {
            bird3.material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/dragonfly_red.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
            bird3.material.needsUpdate = true;
            // bird3.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/dragonfly_red.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
            // bird3.material.needsUpdate = true;
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

            //model0.quaternion.multiplyQuaternions(deltaRotationQuaternion, model0.quaternion);
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

            //model0.quaternion.multiplyQuaternions(deltaRotationQuaternion, model0.quaternion);
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

            if (!show_button) {
                show_button = true;

                document.getElementById("text-tap").style.display = "block";
                document.getElementById("text-1").style.display = "none";
                document.getElementById("text-2").style.display = "none";
                document.getElementById("text-3").style.display = "none";

                document.getElementById("choice1-btn").style.display = "block";
                document.getElementById("choice2-btn").style.display = "block";
                document.getElementById("choice3-btn").style.display = "block";
            }
        }

        // if (model0 !== undefined) {
        //     // console.log("modelX:" + model1.position.x);
        //     // console.log("modelY:" + model1.position.y);
        //     // console.log("modelZ:" + model1.position.z);
        //     // model1.rotation.y = 45 * 0.0174532925;
        // }
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

        if (!show_button) {
            show_button = true;

            document.getElementById("text-tap").style.display = "block";
            document.getElementById("text-1").style.display = "none";
            document.getElementById("text-2").style.display = "none";
            document.getElementById("text-3").style.display = "none";

            document.getElementById("choice1-btn").style.display = "block";
            document.getElementById("choice2-btn").style.display = "block";
            document.getElementById("choice3-btn").style.display = "block";
        }

        renderer.render(scene, camera);

        var delta = clock.getDelta();

        // if (mixer_model0 !== undefined) {
        //     mixer_model0.update(delta);
        // }
        if (mixer_model1 !== undefined) {
            mixer_model1.update(delta);
        }
        if (mixer_model2 !== undefined) {
            mixer_model2.update(delta);
        }
        if (mixer_model3 !== undefined) {
            mixer_model3.update(delta);
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

    //model0.visible = false;
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

    //model0.visible = false;
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

    //model0.visible = false;
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