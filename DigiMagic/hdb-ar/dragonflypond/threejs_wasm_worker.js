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

var model1_move = 0;
var model2_move = 0;
var model3_move = 0;

var model1_move_up = 0;
var model2_move_up = 0;
var model3_move_up = 0;

// target.
var model1_tx = 0;
var model2_tx = 0;
var model3_tx = 0;

var model1_ty = 0;
var model2_ty = 0;
var model3_ty = 0;

var model1_tz = 0;
var model2_tz = 0;
var model3_tz = 0;

var model1_dx = 0;
var model2_dx = 0;
var model3_dx = 0;

var model1_dy = 0;
var model2_dy = 0;
var model3_dy = 0;

var model1_dz = 0;
var model2_dz = 0;
var model3_dz = 0;

//tools
//var adjust_scale = 0.095;
var adjust_scale1 = 50;
var adjust_scale2 = 10;
var adjust_scale3 = 1;
//var adjust_scale3 = 0.25;
var adjust_px = 380 / 10;
var adjust_py = 0;
var adjust_angle = 30;
var adjust_angle_y = -45;
var adjust_angle_z = 0;
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
        model1.position.y = 0;
        model1.position.z = 0;

        model1.scale.x = model1.scale.y = model1.scale.z = adjust_scale1;
        model1.rotation.x = adjust_angle * 0.0174532925;
        model1.rotation.z = adjust_angle_y * 0.0174532925;
        model1.rotation.z = adjust_angle_z * 0.0174532925;

        model1.visible = false;

        var material_dragonfly = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/dragonfly_red.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
        // var material_dragonfly = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/dragonfly_red.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });

        mixer_model1 = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
            mixer_model1.clipAction(clip).play();
        });

        console.log("model1");
        console.log(mixer_model1);

        for (count = 0; count < model1.children.length; count++) {
            //console.log(model1.children[count]);
            // Dragonfly.
            if (model1.children[count].name == "Dragonfly_Subdivision") {
                //console.log("Dragonfly_Subdivision");
                //console.log(model1.children[count].children.length);

                model1.children[count].children[0].children[0].material = material_dragonfly;
                model1.children[count].children[0].children[0].material.needsUpdate = true;
            }
        }

        root.add(model1);
    });
    var threeGLTFLoader2 = new THREE.GLTFLoader();
    threeGLTFLoader2.load("Data/models/butterfly.gltf", function (gltf) {
        model2 = gltf.scene;

        model2.position.x = 0;
        model2.position.y = 0;
        model2.position.z = 0;

        model2.scale.x = model2.scale.y = model2.scale.z = adjust_scale2;
        model2.rotation.x = adjust_angle * 0.0174532925;
        model2.rotation.y = adjust_angle_y * 0.0174532925;
        model2.rotation.z = adjust_angle_z * 0.0174532925;

        model2.visible = false;

        var material_butterfly = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/butterfly.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
        // var material_butterfly = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/butterfly.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
        var material_butterfly_wing = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/butterfly_wing.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
        // var material_butterfly_wing = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/butterfly_wing.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });

        mixer_model2 = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
            mixer_model2.clipAction(clip).play();

            console.log(mixer_model2.clipAction(clip));
            console.log(clip);
        });

        console.log("model2");
        console.log(mixer_model2);

        for (count = 0; count < model2.children.length; count++) {
            //console.log(model2.children[count]);
            // Butterfly.
            if (model2.children[count].name == "Argynnis_hyperbius_Antenna") {
                //console.log("Argynnis_hyperbius_Antenna");
                //console.log(model2.children[count].children.length);

                model2.children[count].children[0].material = material_butterfly;
                model2.children[count].children[0].material.needsUpdate = true;
            }
            if (model2.children[count].name == "Argynnis_hyperbius_Body") {
                // console.log("Argynnis_hyperbius_Body");
                // console.log(model2.children[count].children.length);

                model2.children[count].children[0].material = material_butterfly;
                model2.children[count].children[0].material.needsUpdate = true;
            }
            if (model2.children[count].name == "Argynnis_hyperbius_Leg") {
                // console.log("Argynnis_hyperbius_Leg");
                // console.log(model2.children[count].children.length);

                model2.children[count].children[0].material = material_butterfly;
                model2.children[count].children[0].material.needsUpdate = true;
            }
            if (model2.children[count].name == "Argynnis_hyperbius_Wing") {
                // console.log("Argynnis_hyperbius_Wing");
                // console.log(model2.children[count].children.length);

                model2.children[count].children[0].material = material_butterfly_wing;
                model2.children[count].children[0].material.needsUpdate = true;
            }
        }

        root.add(model2);
    });
    var threeGLTFLoader3 = new THREE.GLTFLoader();
    threeGLTFLoader3.load("Data/models/bird.gltf", function (gltf) {
        model3 = gltf.scene;

        model3.position.x = 0;
        model3.position.y = 0;
        model3.position.z = 0;

        model3.scale.x = model3.scale.y = model3.scale.z = adjust_scale3;
        model3.rotation.x = adjust_angle * 0.0174532925;
        model3.rotation.y = adjust_angle_y * 0.0174532925;
        model3.rotation.z = adjust_angle_z * 0.0174532925;

        model3.visible = false;

        mixer_model3 = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
            mixer_model3.clipAction(clip).play();

            console.log(mixer_model3.clipAction(clip));
            console.log(clip.name);
        });

        console.log("model3");
        console.log(mixer_model3);

        var bird_material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/bird.png'), opacity: 1, side: THREE.DoubleSide, skinning: true, morphTargets: true });
        //var bird_material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/bird.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
        var bird2_material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/bird2.png'), opacity: 1, side: THREE.DoubleSide, skinning: true, morphTargets: true });
        //var bird2_material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/bird2.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
        var bird3_material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/bird3.png'), opacity: 1, side: THREE.DoubleSide, skinning: true, morphTargets: true });
        //var bird3_material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/bird3.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });

        for (count = 0; count < model3.children.length; count++) {
            //console.log(model3.children[count]);
            // Bird.
            if (model3.children[count].name == "Bird_geo") {
                //console.log("Bird_geo");
                //console.log(model3.children[count].children.length);

                for (lv1 = 0; lv1 < model3.children[count].children.length; lv1++) {
                    //console.log(model3.children[count].children[lv1].name);
                    if (model3.children[count].children[lv1].name == "bodyShape") {
                        model3.children[count].children[lv1].children[0].material = bird_material;
                        model3.children[count].children[lv1].children[0].needsUpdate = true;
                    }
                    else if (model3.children[count].children[lv1].name == "wingback_sm") {
                        //console.log(model3.children[count].children[lv1].children.length);
                        for (lv2 = 0; lv2 < model3.children[count].children[lv1].children.length; lv2++) {
                            //console.log(model3.children[count].children[lv1].children[lv2].children.length);
                            for (lv3 = 0; lv3 < model3.children[count].children[lv1].children[lv2].children.length; lv3++) {
                                //console.log(model3.children[count].children[lv1].children[lv2].children[lv3].name);
                                model3.children[count].children[lv1].children[lv2].children[lv3].children[0].material = bird2_material;
                                model3.children[count].children[lv1].children[lv2].children[lv3].children[0].needsUpdate = true;
                            }
                        }
                    }
                    else if (model3.children[count].children[lv1].name == "Tails") {
                        //console.log(model3.children[count].children[lv1].children.length);
                        for (lv2 = 0; lv2 < model3.children[count].children[lv1].children.length; lv2++) {
                            //console.log(model3.children[count].children[lv1].children[lv2].name);
                            model3.children[count].children[lv1].children[lv2].children[0].material = bird2_material;
                            model3.children[count].children[lv1].children[lv2].children[0].needsUpdate = true;
                        }
                    }
                    else if (model3.children[count].children[lv1].name == "Wing_l_") {
                        //console.log(model3.children[count].children[lv1].children.length);
                        for (lv2 = 0; lv2 < model3.children[count].children[lv1].children.length; lv2++) {
                            if (model3.children[count].children[lv1].children[lv2].children[0].material !== undefined) {
                                model3.children[count].children[lv1].children[lv2].children[0].material = bird2_material;
                                model3.children[count].children[lv1].children[lv2].children[0].needsUpdate = true;
                            }
                            else {
                                //console.log(model3.children[count].children[lv1].children[lv2].children.length);
                                for (lv3 = 0; lv3 < model3.children[count].children[lv1].children[lv2].children.length; lv3++) {
                                    //console.log(model3.children[count].children[lv1].children[lv2].children[lv3].name);
                                    model3.children[count].children[lv1].children[lv2].children[lv3].children[0].material = bird2_material;
                                    model3.children[count].children[lv1].children[lv2].children[lv3].children[0].needsUpdate = true;
                                }
                            }
                        }
                    }
                    else if (model3.children[count].children[lv1].name == "Wing_207") {
                        model3.children[count].children[lv1].children[0].material = bird2_material;
                        model3.children[count].children[lv1].children[0].needsUpdate = true;
                    }
                    else if (model3.children[count].children[lv1].name == "Wing_209") {
                        model3.children[count].children[lv1].children[0].material = bird2_material;
                        model3.children[count].children[lv1].children[0].needsUpdate = true;
                    }
                    else if (model3.children[count].children[lv1].name == "Wing_r_") {
                        //console.log(model3.children[count].children[lv1].children.length);
                        for (lv2 = 0; lv2 < model3.children[count].children[lv1].children.length; lv2++) {
                            if (model3.children[count].children[lv1].children[lv2].children[0].material !== undefined) {
                                model3.children[count].children[lv1].children[lv2].children[0].material = bird2_material;
                                model3.children[count].children[lv1].children[lv2].children[0].needsUpdate = true;
                            }
                            else {
                                //console.log(model3.children[count].children[lv1].children[lv2].children.length);
                                for (lv3 = 0; lv3 < model3.children[count].children[lv1].children[lv2].children.length; lv3++) {
                                    //console.log(model3.children[count].children[lv1].children[lv2].children[lv3].name);
                                    model3.children[count].children[lv1].children[lv2].children[lv3].children[0].material = bird2_material;
                                    model3.children[count].children[lv1].children[lv2].children[lv3].children[0].needsUpdate = true;
                                }
                            }
                        }
                    }
                    else if (model3.children[count].children[lv1].name == "Symmetry") {
                        //console.log(model3.children[count].children[lv1].children.length);
                        for (lv2 = 0; lv2 < model3.children[count].children[lv1].children.length; lv2++) {
                            //console.log(model3.children[count].children[lv1].children[lv2].name);
                            model3.children[count].children[lv1].children[lv2].children[0].material = bird3_material;
                            model3.children[count].children[lv1].children[lv2].children[0].needsUpdate = true;
                        }
                    }
                }
            }
        }

        root.add(model3);
    });
    // var threeGLTFLoader3 = new THREE.GLTFLoader();
    // threeGLTFLoader3.load("Data/models/bird.gltf", function (gltf) {
    //     model3 = gltf.scene;

    //     model3.position.x = 0;
    //     model3.position.y = -50;
    //     model3.position.z = 0;

    //     model3.scale.x = model3.scale.y = model3.scale.z = adjust_scale3;
    //     model3.rotation.x = adjust_angle * 0.0174532925;
    //     model3.rotation.y = adjust_angle_y * 0.0174532925;
    //     model3.rotation.z = adjust_angle_z * 0.0174532925;

    //     model3.visible = false;

    //     mixer_model3 = new THREE.AnimationMixer(gltf.scene);
    //     gltf.animations.forEach((clip) => {
    //         mixer_model3.clipAction(clip).play();

    //         console.log(mixer_model3.clipAction(clip));
    //         console.log(clip.name);
    //     });

    //     console.log("model3");
    //     console.log(mixer_model3);

    //     var bird_material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/bird.png'), opacity: 1, side: THREE.DoubleSide, skinning: true, morphTargets: true });
    //     //var bird_material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/bird.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
    //     var bird2_material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/bird2.png'), opacity: 1, side: THREE.DoubleSide, skinning: true, morphTargets: true });
    //     //var bird2_material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/bird2.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
    //     var bird3_material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/bird3.png'), opacity: 1, side: THREE.DoubleSide, skinning: true, morphTargets: true });
    //     //var bird3_material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/bird3.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
    //     var tree_material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/tree_bark.png'), opacity: 1, side: THREE.DoubleSide, skinning: true, morphTargets: true });
    //     //var tree_material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/tree_bark.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
    //     var tree2_material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/tree_leaf.png'), opacity: 1, side: THREE.DoubleSide, skinning: true, morphTargets: true });
    //     //var tree2_material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/tree_leaf.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });
    //     var tree3_material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('Data/textures/tree_petal.png'), opacity: 1, side: THREE.DoubleSide, skinning: true, morphTargets: true });
    //     //var tree3_material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Data/textures/tree_petal.png'), opacity: 1, side: THREE.DoubleSide, skinning: true });

    //     for (count = 0; count < model3.children.length; count++) {
    //         //console.log(model3.children[count]);
    //         // Bird.
    //         if (model3.children[count].name == "Bird_geo") {
    //             //console.log("Bird_geo");
    //             //console.log(model3.children[count].children.length);

    //             for (lv1 = 0; lv1 < model3.children[count].children.length; lv1++) {
    //                 //console.log(model3.children[count].children[lv1].name);
    //                 if (model3.children[count].children[lv1].name == "bodyShape") {
    //                     model3.children[count].children[lv1].children[0].material = bird_material;
    //                     model3.children[count].children[lv1].children[0].needsUpdate = true;
    //                 }
    //                 else if (model3.children[count].children[lv1].name == "wingback_sm") {
    //                     //console.log(model3.children[count].children[lv1].children.length);
    //                     for (lv2 = 0; lv2 < model3.children[count].children[lv1].children.length; lv2++) {
    //                         //console.log(model3.children[count].children[lv1].children[lv2].children.length);
    //                         for (lv3 = 0; lv3 < model3.children[count].children[lv1].children[lv2].children.length; lv3++) {
    //                             //console.log(model3.children[count].children[lv1].children[lv2].children[lv3].name);
    //                             model3.children[count].children[lv1].children[lv2].children[lv3].children[0].material = bird2_material;
    //                             model3.children[count].children[lv1].children[lv2].children[lv3].children[0].needsUpdate = true;
    //                         }
    //                     }
    //                 }
    //                 else if (model3.children[count].children[lv1].name == "Tails") {
    //                     //console.log(model3.children[count].children[lv1].children.length);
    //                     for (lv2 = 0; lv2 < model3.children[count].children[lv1].children.length; lv2++) {
    //                         //console.log(model3.children[count].children[lv1].children[lv2].name);
    //                         model3.children[count].children[lv1].children[lv2].children[0].material = bird2_material;
    //                         model3.children[count].children[lv1].children[lv2].children[0].needsUpdate = true;
    //                     }
    //                 }
    //                 else if (model3.children[count].children[lv1].name == "Wing_l_") {
    //                     //console.log(model3.children[count].children[lv1].children.length);
    //                     for (lv2 = 0; lv2 < model3.children[count].children[lv1].children.length; lv2++) {
    //                         if (model3.children[count].children[lv1].children[lv2].children[0].material !== undefined) {
    //                             model3.children[count].children[lv1].children[lv2].children[0].material = bird2_material;
    //                             model3.children[count].children[lv1].children[lv2].children[0].needsUpdate = true;
    //                         }
    //                         else {
    //                             //console.log(model3.children[count].children[lv1].children[lv2].children.length);
    //                             for (lv3 = 0; lv3 < model3.children[count].children[lv1].children[lv2].children.length; lv3++) {
    //                                 //console.log(model3.children[count].children[lv1].children[lv2].children[lv3].name);
    //                                 model3.children[count].children[lv1].children[lv2].children[lv3].children[0].material = bird2_material;
    //                                 model3.children[count].children[lv1].children[lv2].children[lv3].children[0].needsUpdate = true;
    //                             }
    //                         }
    //                     }
    //                 }
    //                 else if (model3.children[count].children[lv1].name == "Wing_207") {
    //                     model3.children[count].children[lv1].children[0].material = bird2_material;
    //                     model3.children[count].children[lv1].children[0].needsUpdate = true;
    //                 }
    //                 else if (model3.children[count].children[lv1].name == "Wing_209") {
    //                     model3.children[count].children[lv1].children[0].material = bird2_material;
    //                     model3.children[count].children[lv1].children[0].needsUpdate = true;
    //                 }
    //                 else if (model3.children[count].children[lv1].name == "Wing_r_") {
    //                     //console.log(model3.children[count].children[lv1].children.length);
    //                     for (lv2 = 0; lv2 < model3.children[count].children[lv1].children.length; lv2++) {
    //                         if (model3.children[count].children[lv1].children[lv2].children[0].material !== undefined) {
    //                             model3.children[count].children[lv1].children[lv2].children[0].material = bird2_material;
    //                             model3.children[count].children[lv1].children[lv2].children[0].needsUpdate = true;
    //                         }
    //                         else {
    //                             //console.log(model3.children[count].children[lv1].children[lv2].children.length);
    //                             for (lv3 = 0; lv3 < model3.children[count].children[lv1].children[lv2].children.length; lv3++) {
    //                                 //console.log(model3.children[count].children[lv1].children[lv2].children[lv3].name);
    //                                 model3.children[count].children[lv1].children[lv2].children[lv3].children[0].material = bird2_material;
    //                                 model3.children[count].children[lv1].children[lv2].children[lv3].children[0].needsUpdate = true;
    //                             }
    //                         }
    //                     }
    //                 }
    //                 else if (model3.children[count].children[lv1].name == "Symmetry") {
    //                     //console.log(model3.children[count].children[lv1].children.length);
    //                     for (lv2 = 0; lv2 < model3.children[count].children[lv1].children.length; lv2++) {
    //                         //console.log(model3.children[count].children[lv1].children[lv2].name);
    //                         model3.children[count].children[lv1].children[lv2].children[0].material = bird3_material;
    //                         model3.children[count].children[lv1].children[lv2].children[0].needsUpdate = true;
    //                     }
    //                 }
    //             }
    //         }

    //         // Tree.
    //         if (model3.children[count].name == "Delonix_Regia_FBX_v02:Tree") {
    //         }
    //     }

    //     root.add(model3);
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

            if (model1 !== undefined && model2 !== undefined && model3 !== undefined) {
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

                    choice1_worker();
                }
            }
        }

        // if (model0 !== undefined) {
        //     // console.log("modelX:" + model1.position.x);
        //     // console.log("modelY:" + model1.position.y);
        //     // console.log("modelZ:" + model1.position.z);
        //     // model1.rotation.y = 45 * 0.0174532925;
        // }
        if (model1 !== undefined) {
            if (model1.visible) {
                if (model1_move == 0) {
                    model1_dx += 0.5;
                    if (model1_dx >= 50) {
                        model1_dx = 50;
                    }
                    model1_dz += 0.5;
                    if (model1_dz >= 50) {
                        model1_dz = 50;
                    }

                    if (model1_dx == 50 && model1_dz == 50) {
                        model1_move = 1;
                    }
                }
                else if (model1_move == 1) {
                    model1_dx -= 0.5;
                    if (model1_dx <= -50) {
                        model1_dx = -50;
                    }

                    if (model1_dx == -50) {
                        model1_move = 2;
                    }
                }
                else if (model1_move == 2) {
                    model1_dx += 0.5;
                    if (model1_dx >= 50) {
                        model1_dx = 50;
                    }
                    model1_dz -= 0.5;
                    if (model1_dz <= -50) {
                        model1_dz = -50;
                    }

                    if (model1_dx == 50 && model1_dz == -50) {
                        model1_move = 3;
                    }
                }
                else if (model1_move == 3) {
                    model1_dx -= 0.5;
                    if (model1_dx <= -50) {
                        model1_dx = -50;
                    }

                    if (model1_dx == -50) {
                        model1_move = 0;
                    }
                }

                if (model1_move_up == 1) {
                    model1_dy += 0.25;
                    if (model1_dy >= 50) {
                        model1_dy = 50;

                        model1_move_up = 0;
                    }
                }
                else if (model1_move_up == 0) {
                    model1_dy -= 0.25;
                    if (model1_dy <= 0) {
                        model1_dy = 0;

                        model1_move_up = 1;
                    }
                }

                model1.position.x = model1_dx;
                model1.position.y = model1_dy;
                model1.position.z = model1_dz;
            }

            // model1.rotation.x = adjust_angle * 0.0174532925;
            // model1.rotation.y = adjust_angle_y * 0.0174532925;
            // model1.rotation.z = adjust_angle_z * 0.0174532925;
        }
        if (model2 !== undefined) {
            if (model2.visible) {
                if (model2_move == 0) {
                    model2_dx += 0.5;
                    if (model2_dx >= 50) {
                        model2_dx = 50;
                    }
                    model2_dz += 0.5;
                    if (model2_dz >= 50) {
                        model2_dz = 50;
                    }

                    if (model2_dx == 50 && model2_dz == 50) {
                        model2_move = 1;
                    }
                }
                else if (model2_move == 1) {
                    model2_dx -= 0.5;
                    if (model2_dx <= -50) {
                        model2_dx = -50;
                    }

                    if (model2_dx == -50) {
                        model2_move = 2;
                    }
                }
                else if (model2_move == 2) {
                    model2_dx += 0.5;
                    if (model2_dx >= 50) {
                        model2_dx = 50;
                    }
                    model2_dz -= 0.5;
                    if (model2_dz <= -50) {
                        model2_dz = -50;
                    }

                    if (model2_dx == 50 && model2_dz == -50) {
                        model2_move = 3;
                    }
                }
                else if (model2_move == 3) {
                    model2_dx -= 0.5;
                    if (model2_dx <= -50) {
                        model2_dx = -50;
                    }

                    if (model2_dx == -50) {
                        model2_move = 0;
                    }
                }

                if (model2_move_up == 1) {
                    model2_dy += 0.25;
                    if (model2_dy >= 50) {
                        model2_dy = 50;

                        model2_move_up = 0;
                    }
                }
                else if (model2_move_up == 0) {
                    model2_dy -= 0.25;
                    if (model2_dy <= 0) {
                        model2_dy = 0;

                        model2_move_up = 1;
                    }
                }

                model2.position.x = model2_dx;
                model2.position.y = model2_dy;
                model2.position.z = model2_dz;
            }
        }
        if (model3 !== undefined) {
            // if (model3.visible) {
            //     if (model3_move == 0)
            //     {
            //         model3_dx += 0.5;
            //         if (model3_dx >= 50) {
            //             model3_dx = 50;
            //         }
            //         model3_dz += 0.5;
            //         if (model3_dz >= 50) {
            //             model3_dz = 50;
            //         }

            //         if (model3_dx == 50 && model3_dz == 50)
            //         {
            //             model3_move = 1;
            //         }
            //     }
            //     else if (model3_move == 1)
            //     {
            //         model3_dx -= 0.5;
            //         if (model3_dx <= -50) {
            //             model3_dx = -50;
            //         }

            //         if (model3_dx == -50)
            //         {
            //             model3_move = 2;
            //         }
            //     }
            //     else if (model3_move == 2)
            //     {
            //         model3_dx += 0.5;
            //         if (model3_dx >= 50) {
            //             model3_dx = 50;
            //         }
            //         model3_dz -= 0.5;
            //         if (model3_dz <= -50) {
            //             model3_dz = -50;
            //         }

            //         if (model3_dx == 50 && model3_dz == -50)
            //         {
            //             model3_move = 3;
            //         }
            //     }
            //     else if (model3_move == 3)
            //     {
            //         model3_dx -= 0.5;
            //         if (model3_dx <= -50) {
            //             model3_dx = -50;
            //         }

            //         if (model3_dx == -50)
            //         {
            //             model3_move = 0;
            //         }
            //     }

            //     if (model3_move_up == 1) {
            //         model3_dy += 1.0;
            //         if (model3_dy >= 10) {
            //             model3_dy = 10;

            //             model3_move_up = 0;
            //         }
            //     }
            //     else if (model3_move_up == 0) {
            //         model3_dy -= 1.0;
            //         if (model3_dy <= 0) {
            //             model3_dy = 0;

            //             model3_move_up = 1;
            //         }
            //     }

            //     model3.position.x = model3_dx;
            //     model3.position.y = model3_dy;
            //     model2.position.z = model3_dz;
            // }
        }

        if (model1 !== undefined && model2 !== undefined && model3 !== undefined) {
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

                choice1_worker();
            }
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
    if (model1 == undefined) {
        return;
    }
    if (model2 == undefined) {
        return;
    }
    if (model3 == undefined) {
        return;
    }

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

    model1_move = 0;
    model2_move = 0;
    model3_move = 0;

    model1_move_up = 1;
    model2_move_up = 1;
    model3_move_up = 1;

    model1_tx = 0;
    model2_tx = 0;
    model3_tx = 0;

    model1_ty = 0;
    model2_ty = 0;
    model3_ty = 0;

    model1_tz = 0;
    model2_tz = 0;
    model3_tz = 0;

    model1_dx = 0;
    model2_dx = 0;
    model3_dx = 0;

    model1_dy = 0;
    model2_dy = 0;
    model3_dy = 0;

    model1_dz = 0;
    model2_dz = 0;
    model3_dz = 0;
}

function choice2_worker() {
    if (model1 == undefined) {
        return;
    }
    if (model2 == undefined) {
        return;
    }
    if (model3 == undefined) {
        return;
    }

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

    model1_move = 0;
    model2_move = 0;
    model3_move = 0;

    model1_move_up = 1;
    model2_move_up = 1;
    model3_move_up = 1;

    model1_tx = 0;
    model2_tx = 0;
    model3_tx = 0;

    model1_ty = 0;
    model2_ty = 0;
    model3_ty = 0;

    model1_tz = 0;
    model2_tz = 0;
    model3_tz = 0;

    model1_dx = 0;
    model2_dx = 0;
    model3_dx = 0;

    model1_dy = 0;
    model2_dy = 0;
    model3_dy = 0;

    model1_dz = 0;
    model2_dz = 0;
    model3_dz = 0;
}

function choice3_worker() {
    if (model1 == undefined) {
        return;
    }
    if (model2 == undefined) {
        return;
    }
    if (model3 == undefined) {
        return;
    }

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

    model1_move = 0;
    model2_move = 0;
    model3_move = 0;

    model1_move_up = 1;
    model2_move_up = 1;
    model3_move_up = 1;

    model1_tx = 0;
    model2_tx = 0;
    model3_tx = 0;

    model1_ty = 0;
    model2_ty = 0;
    model3_ty = 0;

    model1_tz = 0;
    model2_tz = 0;
    model3_tz = 0;

    model1_dx = 0;
    model2_dx = 0;
    model3_dx = 0;

    model1_dy = 0;
    model2_dy = 0;
    model3_dy = 0;

    model1_dz = 0;
    model2_dz = 0;
    model3_dz = 0;
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