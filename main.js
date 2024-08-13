import * as THREE from 'three';
import * as YUKA from 'yuka';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * set SCENE, CAMERA, RENDERER
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(6, 8, 14);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xFEFEFE);
document.body.appendChild(renderer.domElement);

/**
 * CONTROLS, HELPERS
 */
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// Creates a 12 by 12 grid helper.
const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);

// Creates an axes helper with an axis length of 4.
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

/**
 * OBJECTS
 */
const vehicleGeo = new THREE.ConeGeometry(0.1, 0.5, 8);
const vehicleMaterial = new THREE.MeshNormalMaterial();
const vehicleMesh = new THREE.Mesh(vehicleGeo, vehicleMaterial);
vehicleMesh.matrixAutoUpdate = false;
scene.add(vehicleMesh);

const vehicle = new YUKA.Vehicle();
vehicle.setRenderComponent(vehicleMesh, sync);

function sync(entity, renderComponent) {
  // make mesh copy all the matrix calculations needed for geometric transformations
  // from the vehicle like translations, scale, and rotations
  // aka make YUKA handle mesh animations instead of threejs
  renderComponent.matrix.copy(entity.worldMatrix);
}

// create path from YUKA
const path = 

/**
 * ANIMATE
 */
function animate() {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// window.addEventListener('resize', function() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });