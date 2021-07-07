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

var model;//gltf

//tools
var adjust_scale = 2;
var adjust_px = 380 / 10;
var adjust_py = 0;
var adjust_angle = 25;
//, side: THREE.DoubleSide
var bicycle_texture = THREE.ImageUtils.loadTexture('assets/sprites/bicycle.png');
SpriteAnimator.add({ texture: bicycle_texture, tilesHorizontal: 1, tilesVertical: 1, fps: 24, numberOfTiles: 1 });

var human01_texture = THREE.ImageUtils.loadTexture('assets/sprites/human01.png');
SpriteAnimator.add({ texture: bicycle_texture, tilesHorizontal: 1, tilesVertical: 1, fps: 24, numberOfTiles: 1 });

var human02_texture = THREE.ImageUtils.loadTexture('assets/sprites/human02.png');
SpriteAnimator.add({ texture: bicycle_texture, tilesHorizontal: 1, tilesVertical: 1, fps: 24, numberOfTiles: 1 });

var human03_texture = THREE.ImageUtils.loadTexture('assets/sprites/human03.png');
SpriteAnimator.add({ texture: bicycle_texture, tilesHorizontal: 1, tilesVertical: 1, fps: 24, numberOfTiles: 1 });

var human04_texture = THREE.ImageUtils.loadTexture('assets/sprites/human04.png');
SpriteAnimator.add({ texture: bicycle_texture, tilesHorizontal: 1, tilesVertical: 1, fps: 24, numberOfTiles: 1 });
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


    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    ///
    var step = 1;

    var root = new THREE.Object3D();
    scene.add(root);
    root.visible = false;

    /* Load Model */
    var threeGLTFLoader = new THREE.GLTFLoader();
    threeGLTFLoader.load("Data/models/smartlamppost.gltf", function (gltf) {
        model = gltf.scene;

        model.position.x = 0;
        model.position.y = 0;
        model.position.z = 0;

        model.scale.x = model.scale.y = model.scale.z = 0.5;

        model.visible = true;

        console.log(model);
        for (count = 0; count < 14; count++) {
            console.log(model.children[count]);
        }

        // tree 1.
        var tree1 = model.children[12];

        tree1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/tree01.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
        tree1.material.needsUpdate = true;

        // tree 2.
        var tree2 = model.children[11];

        tree2.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/tree02.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
        tree2.material.needsUpdate = true;

        // bg.
        var bg = model.children[13];

        bg.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/bg.png'), opacity: 1, depthTest: false, transparent: false, side: THREE.DoubleSide });
        bg.material.needsUpdate = true;

        // floor.
        var floor = model.children[1];

        floor.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/floor.png'), opacity: 1, depthTest: true, transparent: false });
        floor.material.needsUpdate = true;

        // lamp post 1.
        var lamppost1 = model.children[10];

        lamppost1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost01_light.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
        lamppost1.material.needsUpdate = true;

        // lamp post 2.
        var lamppost2a = model.children[9];

        lamppost2a.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost02_light.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
        lamppost2a.material.needsUpdate = true;

        // lamp post 2.
        var lamppost2b = model.children[8];

        lamppost2b.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/lamppost02_light.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
        lamppost2b.material.needsUpdate = true;

        // icon 1.
        var icon1 = model.children[7];

        icon1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/icon01.png'), opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide });
        icon1.material.needsUpdate = true;

        // // bicycle.
        // var bicycle = model.children[10];
        // var video_bicycle = new THREE.VideoTexture(document.getElementById('video_bicycle'));

        // //bicycle.material = new THREE.MeshBasicMaterial({ map: video_bicycle, opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide});
        // bicycle.material = new THREE.MeshBasicMaterial({ map: video_bicycle, side: THREE.FrontSide, toneMapped: false });
        // bicycle.material.needsUpdate = true;

        // // human01.
        // var human01 = model.children[9];
        // var video_human01 = new THREE.VideoTexture(document.getElementById('video_human01'));

        // //human01.material = new THREE.MeshBasicMaterial({ map: video_human01 opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide});
        // human01.material = new THREE.MeshBasicMaterial({ map: video_human01, side: THREE.FrontSide, toneMapped: false });
        // human01.material.needsUpdate = true;

        // // human2.
        // var human02 = model.children[8];
        // var video_human02 = new THREE.VideoTexture(document.getElementById('video_human02'));

        // //human02.material = new THREE.MeshBasicMaterial({ map: video_human02 opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide});
        // human02.material = new THREE.MeshBasicMaterial({ map: video_human02, side: THREE.FrontSide, toneMapped: false });
        // human02.material.needsUpdate = true;

        // // human03.
        // var human03 = model.children[7];
        // var video_human03 = new THREE.VideoTexture(document.getElementById('video_human03'));

        // //human03.material = new THREE.MeshBasicMaterial({ map: video_human03 opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide});
        // human03.material = new THREE.MeshBasicMaterial({ map: video_human03, side: THREE.FrontSide, toneMapped: false });
        // human03.material.needsUpdate = true;

        // // human04.
        // var human04 = model.children[6];
        // var video_human04 = new THREE.VideoTexture(document.getElementById('video_human04'));

        // //human04.material = new THREE.MeshBasicMaterial({ map: video_human04 opacity: 1, depthTest: false, transparent: true, side: THREE.DoubleSide});
        // human04.material = new THREE.MeshBasicMaterial({ map: video_human04, side: THREE.FrontSide, toneMapped: false });
        // human04.material.needsUpdate = true;

        // bicycle.
        var bicycle = model.children[6];

        bicycle.material = new THREE.MeshBasicMaterial({ map: bicycle_texture, depthTest: false, transparent: true, side: THREE.DoubleSide});
        bicycle.material.needsUpdate = true;

        // human01.
        var human01 = model.children[5];

        human01.material = new THREE.MeshBasicMaterial({ map: human01_texture, depthTest: false, transparent: true, side: THREE.DoubleSide});
        human01.material.needsUpdate = true;

        // human2.
        var human02 = model.children[4];

        human02.material = new THREE.MeshBasicMaterial({ map: human02_texture, depthTest: false, transparent: true, side: THREE.DoubleSide});
        human02.material.needsUpdate = true;

        // human03.
        var human03 = model.children[3];

        human03.material = new THREE.MeshBasicMaterial({ map: human03_texture, depthTest: false, transparent: true, side: THREE.DoubleSide});
        human03.material.needsUpdate = true;

        // human04.
        var human04 = model.children[2];
       
        human04.material = new THREE.MeshBasicMaterial({ map: human04_texture, depthTest: false, transparent: true, side: THREE.DoubleSide});
        human04.material.needsUpdate = true;

        bg.rotation.y = 180 * 0.0174532925;
        tree1.rotation.y = 180 * 0.0174532925;
        tree2.rotation.y = 180 * 0.0174532925;
        lamppost1.rotation.y = 180 * 0.0174532925;
        lamppost2a.rotation.y = 180 * 0.0174532925;
        lamppost2b.rotation.y = 180 * 0.0174532925;
        icon1.rotation.y = 180 * 0.0174532925;
        bicycle.rotation.y = 180 * 0.0174532925;
        human01.rotation.y = 180 * 0.0174532925;
        human02.rotation.y = 180 * 0.0174532925;
        human03.rotation.y = 180 * 0.0174532925;
        human04.rotation.y = 180 * 0.0174532925;

        bg.rotation.z = 180 * 0.0174532925;
        tree1.rotation.z = 180 * 0.0174532925;
        tree2.rotation.z = 180 * 0.0174532925;
        lamppost1.rotation.z = 180 * 0.0174532925;
        lamppost2a.rotation.z = 180 * 0.0174532925;
        lamppost2b.rotation.z = 180 * 0.0174532925;
        icon1.rotation.z = 180 * 0.0174532925;
        bicycle.rotation.z = 180 * 0.0174532925;
        human01.rotation.z = 180 * 0.0174532925;
        human02.rotation.z = 180 * 0.0174532925;
        human03.rotation.z = 180 * 0.0174532925;
        human04.rotation.z = 180 * 0.0174532925;

        root.add(model);
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

        if (model !== undefined) {

            /* console.log("modelX:" + model.position.x);
             console.log("modelY:" + model.position.y);
             console.log("modelZ:" + model.position.z);*/
            //model.rotation.y = 45 * 0.0174532925;

        }

        root.visible = true;

        renderer.render(scene, camera);
        SpriteAnimator.update(clock.getDelta());



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

