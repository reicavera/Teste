// Mapeamento de Texturas 

import * as THREE 			from '../resources/threejs/build/three.module.js';
import { OBJLoader } 		from '../resources/threejs/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls }	from '../resources/threejs/examples/jsm/controls/OrbitControls.js';

var renderer;
var scene;
var camera;
var cameraControl;

function main() {

	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);
	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

	var objectLoader = new OBJLoader();
	objectLoader.load("../resources/Models/cube.obj", loadMesh);

	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 100;
	camera.lookAt(scene.position);

	cameraControl = new OrbitControls(camera, renderer.domElement);

	render();
}

function render() {

	cameraControl.update();
	renderer.render(scene, camera);
	requestAnimationFrame(render);

}

function loadMesh(loadedMesh) {
	
	var textureLoader 	= new THREE.TextureLoader();
	var texture 		= textureLoader.load("../resources/Textures/ash_uvgrid01.jpg");
	texture.wrapS=THREE.RepeatWrapping;
	texture.wrapT=THREE.RepeatWrapping;
	texture.repeat.set(4,4)
	var material = new THREE.MeshBasicMaterial( { map : texture });
	
	loadedMesh.children.forEach(function (child) {
		child.material = material;
		});

	loadedMesh.scale.set(30.0, 30.0, 30.0);
	scene.add(loadedMesh);
}

main();
