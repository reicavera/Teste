// Mapeamento de Texturas 

import * as THREE 			from '../resources/threejs/build/three.module.js';
import { OBJLoader } 		from '../resources/threejs/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls }	from '../resources/threejs/examples/jsm/controls/OrbitControls.js';

var renderer;
var scene;
var camera;
var cameraControl;

var phongMat=null;
function main() {

	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);
	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	phongMat = new THREE.MeshPhongMaterial({color: 0xFFFFAA,
		specular 	: 0xFFFFFF,
		reflectivity: 50,
		shininess 	: 100 
	});

	const path          = "../resources/Textures/Cubemaps/";
    const textCubeMap   =    [  path + "posx.jpg", 
                                path + "negx.jpg",
                                path + "posy.jpg", 
                                path + "negy.jpg",
                                path + "posz.jpg", 
                                path + "negz.jpg"
                            ];

    const textureCube   = new THREE.CubeTextureLoader().load( textCubeMap );
    scene.background    = textureCube;

	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 300;

	var objectLoader = new OBJLoader();
	objectLoader.load("../resources/Models/bunny.obj", loadMesh);

	const light = new THREE.AmbientLight( 0xFFFFFF,0.5 );
	scene.add( light );
	
	const dirLight 			= new THREE.DirectionalLight( 0xFFAAAA, 1.0 ); 
	dirLight.name 			= "dirLight";
	dirLight.visible 		= true;
	dirLight.position.set( 0.0, 300.0, 0.0 );
	scene.add( dirLight );

	cameraControl = new OrbitControls(camera, renderer.domElement);

	render();
}

function render() {
	window.addEventListener('deviceorientation', function(event) {
		var vector = camera.position.clone();
		camera.lookAt(new THREE.Vector3(vector.x+event.alpha, vector.y+event.beta, vector.z+event.gamma))
	  });
	cameraControl.update();
	renderer.render(scene, camera);
	requestAnimationFrame(render);

}

function loadMesh(loadedMesh) {
	
	var textureLoader 	= new THREE.TextureLoader();
	var texture 		= textureLoader.load("../resources/Textures/Wood.jpg");
	loadedMesh.scale.set(70, 70, 70);
	texture.wrapS=THREE.RepeatWrapping;
	texture.wrapT=THREE.RepeatWrapping;
	var material = phongMat
	material.map=texture
	loadedMesh.children.forEach(function (child) {
		child.material = material;
		});

	scene.add(loadedMesh);
}

main();
