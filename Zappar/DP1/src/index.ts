import * as THREE from 'three';
import * as ZapparThree from '@zappar/zappar-threejs';
import './index.sass';

import Dummy from '../assets/favicon.png';

import tap_and_hold_png from '../assets/images/tap_and_hold.png';
import header_png from '../assets/images/header.png';
import button_back_png from '../assets/images/button_back.png';
import title_1_png from '../assets/images/title_1.png';
import title_2_png from '../assets/images/title_2.png';
import title_3_png from '../assets/images/title_3.png';
import button_battle_box_png from '../assets/images/button_battle_box.png';
import popup_bg_png from '../assets/images/popup_bg.png';
import button_popup_close_png from '../assets/images/button_popup_close.png';
import popup_title_1_png from '../assets/images/popup_title_1.png';
import popup_title_2_png from '../assets/images/popup_title_2.png';
import popup_title_3_png from '../assets/images/popup_title_3.png';
import popup_image_1_png from '../assets/images/popup_image_1.png';
import popup_image_2_png from '../assets/images/popup_image_2.png';
import popup_image_3_png from '../assets/images/popup_image_3.png';
import popup_1_png from '../assets/images/popup_1.png';
import popup_2_png from '../assets/images/popup_2.png';
import popup_3_png from '../assets/images/popup_3.png';
import button_1_png from '../assets/images/button_1.png';
import button_2_png from '../assets/images/button_2.png';
import button_3_png from '../assets/images/button_3.png';
import button_1_red_png from '../assets/images/button_1_red.png';
import button_2_red_png from '../assets/images/button_2_red.png';
import button_3_red_png from '../assets/images/button_3_red.png';

if (ZapparThree.browserIncompatible()) {
  ZapparThree.browserIncompatibleUI();

  throw new Error('Unsupported browser');
}

const manager = new ZapparThree.LoadingManager();

const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
document.body.appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const camera = new ZapparThree.Camera();

ZapparThree.permissionRequestUI().then((granted) => {
  if (granted) camera.start();
  else ZapparThree.permissionDeniedUI();
});

ZapparThree.glContextSet(renderer.getContext());

scene.background = camera.backgroundTexture;

const root = new THREE.Mesh();

scene.add(root);

const directionalLight = new THREE.DirectionalLight('white', 0.8);
directionalLight.position.set(0, 5, 0);
directionalLight.lookAt(0, 0, 0);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight('white', 0.4);
scene.add(ambientLight);

const test_video_canvas = document.getElementById('test_video_canvas') as HTMLCanvasElement;
const test_video_canvas_alpha = document.getElementById('test_video_canvas_alpha') as HTMLCanvasElement;

if (test_video_canvas == null || test_video_canvas_alpha == null) {
  console.log("test_video_canvas or test_video_canvas_alpha is null");
}

const test_video = document.getElementById('test_video') as HTMLVideoElement;
const test_video_alpha = document.getElementById('test_video_alpha') as HTMLVideoElement;

var test_video_texture: THREE.CanvasTexture;
var test_video_texture_alpha: THREE.CanvasTexture;

test_video_texture = new THREE.CanvasTexture(test_video_canvas);
test_video_texture.minFilter = THREE.LinearFilter;
test_video_texture.magFilter = THREE.LinearFilter;
test_video_texture.format = THREE.RGBAFormat;

test_video_texture_alpha = new THREE.CanvasTexture(test_video_canvas_alpha);
test_video_texture_alpha.minFilter = THREE.LinearFilter;
test_video_texture_alpha.magFilter = THREE.LinearFilter;
test_video_texture_alpha.format = THREE.RGBAFormat;

//var test_video_material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(Dummy), depthTest: false, transparent: true, side: THREE.DoubleSide, opacity: 1 });
var test_video_material = new THREE.MeshBasicMaterial({ map: test_video_texture, alphaMap: test_video_texture_alpha, depthTest: false, transparent: true, side: THREE.DoubleSide, opacity: 1 });

const source_canvas = document.getElementById('source_canvas') as HTMLCanvasElement;

// Plane.
const testVideoPlane = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), test_video_material);
testVideoPlane.position.set(0, 0, -5);
testVideoPlane.rotation.set(0, 0, 0);
root.add(testVideoPlane);

root.visible = false;

let hasPlaced = false;

const pointer = new THREE.Vector2();

function onPointerMove(event: { clientX: number; clientY: number; }) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

function onClick() {
  //
}

var show_button = false;

function render(): void {
  //console.log(camera.position.x + " " + camera.position.y + " " + camera.position.z);

  camera.updateFrame(renderer);

  renderer.render(scene, camera);

  if (hasPlaced) {
    if (!show_button) {
      root.visible = true;

      show_button = true;

      const choice1_button = document.getElementById("choice1-btn") as HTMLImageElement;
      const choice2_button = document.getElementById("choice2-btn") as HTMLImageElement;
      const choice3_button = document.getElementById("choice3-btn") as HTMLImageElement;

      choice1_button.style.display = "block";
      choice2_button.style.display = "block";
      choice3_button.style.display = "block";

      //console.log("XXXXX");
    }
  }

  requestAnimationFrame(render);

  testVideoTexture();
}

window.addEventListener('pointermove', onPointerMove);
window.addEventListener('click', onClick);

render();

const tap_and_hold = document.getElementById("tap-and-hold") as HTMLImageElement;
const header = document.getElementById("header") as HTMLImageElement;
const text_witness_history = document.getElementById("text-witness-history") as HTMLImageElement;
const button_back = document.getElementById("button-back") as HTMLImageElement;
const title = document.getElementById("title") as HTMLImageElement;
const button_battle_box = document.getElementById("button-battle-box") as HTMLImageElement;

tap_and_hold.src = tap_and_hold_png;
header.src = header_png;
button_back.src = button_back_png;
title.src = title_1_png;
button_battle_box.src = button_battle_box_png;

tap_and_hold.addEventListener('click', () => {
  console.log("click start btn...");

  const firstPage = document.getElementById("firstPage") as HTMLElement;
  const mainPage = document.getElementById("mainPage") as HTMLElement;
  const choice1_button = document.getElementById("choice1-btn") as HTMLElement;
  const choice2_button = document.getElementById("choice2-btn") as HTMLElement;
  const choice3_button = document.getElementById("choice3-btn") as HTMLElement;

  firstPage.style.display = "none";
  mainPage.style.display = "block";
  choice1_button.style.display = "none";
  choice2_button.style.display = "none";
  choice3_button.style.display = "none";

  start3D();
});

title.addEventListener('click', () => {
  const popupPage1 = document.getElementById("popupPage1") as HTMLElement;
  const popupPage2 = document.getElementById("popupPage2") as HTMLElement;
  const popupPage3 = document.getElementById("popupPage3") as HTMLElement;

  popupPage1.style.display = "none";
  popupPage2.style.display = "none";
  popupPage3.style.display = "none";

  console.log("Choice " + choiceIndex);
  if (choiceIndex == 0) {
    console.log("Choice " + choiceIndex);
    popupPage1.style.display = "block";
  } else if (choiceIndex == 1) {
    popupPage2.style.display = "block";
  } else {
    popupPage3.style.display = "block";
  }
});

button_back.addEventListener('click', () => {
  // const popupPage1 = document.getElementById("popupPage1") as HTMLElement;

  // popupPage1.style.display = "block";
});

button_battle_box.addEventListener('click', () => {
  window.location = <any>"https://www.battlebox.com.sg/";
});

function start3D() {
  hasPlaced = true;

  test_video.play();
}

// Popup 1.
const popup_bg_1 = document.getElementById("popup-bg-1") as HTMLImageElement;
const popup_1 = document.getElementById("popup-1") as HTMLImageElement;
const popup_title_1 = document.getElementById("popup-title-1") as HTMLImageElement;
const popup_image_1 = document.getElementById("popup-image-1") as HTMLImageElement;
const button_popup_close_1 = document.getElementById("button-popup-close-1") as HTMLImageElement;

popup_bg_1.src = popup_bg_png;
popup_1.src = popup_1_png;
popup_title_1.src = popup_title_1_png;
popup_image_1.src = popup_image_1_png;
button_popup_close_1.src = button_popup_close_png;

button_popup_close_1.addEventListener('click', () => {
  const popupPage1 = document.getElementById("popupPage1") as HTMLElement;

  popupPage1.style.display = "none";
});

// Popup 2.
const popup_bg_2 = document.getElementById("popup-bg-2") as HTMLImageElement;
const popup_2 = document.getElementById("popup-2") as HTMLImageElement;
const popup_title_2 = document.getElementById("popup-title-2") as HTMLImageElement;
const popup_image_2 = document.getElementById("popup-image-2") as HTMLImageElement;
const button_popup_close_2 = document.getElementById("button-popup-close-2") as HTMLImageElement;

popup_bg_2.src = popup_bg_png;
popup_2.src = popup_2_png;
popup_title_2.src = popup_title_2_png;
popup_image_2.src = popup_image_2_png;
button_popup_close_2.src = button_popup_close_png;

button_popup_close_2.addEventListener('click', () => {
  const popupPage2 = document.getElementById("popupPage2") as HTMLElement;

  popupPage2.style.display = "none";
});

// Popup 3.
const popup_bg_3 = document.getElementById("popup-bg-3") as HTMLImageElement;
const popup_3 = document.getElementById("popup-3") as HTMLImageElement;
const popup_title_3 = document.getElementById("popup-title-3") as HTMLImageElement;
const popup_image_3 = document.getElementById("popup-image-3") as HTMLImageElement;
const button_popup_close_3 = document.getElementById("button-popup-close-3") as HTMLImageElement;

popup_bg_3.src = popup_bg_png;
popup_3.src = popup_3_png;
popup_title_3.src = popup_title_3_png;
popup_image_3.src = popup_image_3_png;
button_popup_close_3.src = button_popup_close_png;

button_popup_close_3.addEventListener('click', () => {
  const popupPage3 = document.getElementById("popupPage3") as HTMLElement;

  popupPage3.style.display = "none";
});

// Choice.
let choiceIndex = 0;

const choice1_button = document.getElementById("choice1-btn") as HTMLImageElement;
const choice2_button = document.getElementById("choice2-btn") as HTMLImageElement;
const choice3_button = document.getElementById("choice3-btn") as HTMLImageElement;

choice1_button.src = button_1_png;
choice2_button.src = button_2_png;
choice3_button.src = button_3_png;

choice1_button.addEventListener('click', () => {
  choice1Click();
});

choice2_button.addEventListener('click', () => {
  choice2Click();
});

choice3_button.addEventListener('click', () => {
  choice3Click();
});

function choice1Click() {
  if (!hasPlaced) {
    return;
  }

  choiceIndex = 0;

  const title = document.getElementById("title") as HTMLImageElement;

  title.src = title_1_png;

  const choice1_button = document.getElementById("choice1-btn") as HTMLImageElement;
  const choice2_button = document.getElementById("choice2-btn") as HTMLImageElement;
  const choice3_button = document.getElementById("choice3-btn") as HTMLImageElement;

  choice1_button.src = button_1_red_png;
  choice2_button.src = button_2_png;
  choice3_button.src = button_3_png;
}

function choice2Click() {
  if (!hasPlaced) {
    return;
  }

  choiceIndex = 1;

  const title = document.getElementById("title") as HTMLImageElement;

  title.src = title_2_png;

  const choice1_button = document.getElementById("choice1-btn") as HTMLImageElement;
  const choice2_button = document.getElementById("choice2-btn") as HTMLImageElement;
  const choice3_button = document.getElementById("choice3-btn") as HTMLImageElement;

  choice1_button.src = button_1_png;
  choice2_button.src = button_2_red_png;
  choice3_button.src = button_3_png;
}

function choice3Click() {
  if (!hasPlaced) {
    return;
  }

  choiceIndex = 2;

  const title = document.getElementById("title") as HTMLImageElement;

  title.src = title_3_png;

  const choice1_button = document.getElementById("choice1-btn") as HTMLImageElement;
  const choice2_button = document.getElementById("choice2-btn") as HTMLImageElement;
  const choice3_button = document.getElementById("choice3-btn") as HTMLImageElement;

  choice1_button.src = button_1_png;
  choice2_button.src = button_2_png;
  choice3_button.src = button_3_red_png;
}

function testVideoTexture() {
  var source_ctx;
  var source_width = 960;
  var source_height = 270;

  source_ctx = source_canvas.getContext("2d");
  if (source_ctx == null) {
    console.log("source_ctx is null");
  }

  var width = 0;
  var height = 0;

  width = 480;
  height = 270;

  var ctx;
  var ctx_alpha;

  // 1.
  ctx = test_video_canvas.getContext("2d");
  ctx_alpha = test_video_canvas_alpha.getContext("2d");
  if (ctx == null || ctx_alpha == null) {
    console.log("ctx or ctx_alpha is null");
  }

  source_ctx?.drawImage(test_video, 0, 0, source_width, source_height, 0, 0, source_width, source_height);

  ctx?.drawImage(source_canvas, 0, 0, width, height, 0, 0, width, height);
  ctx_alpha?.drawImage(source_canvas, width, 0, width, height, 0, 0, width, height);

  test_video_texture.needsUpdate = true;
  test_video_texture_alpha.needsUpdate = true;
  test_video_material.needsUpdate = true;
}