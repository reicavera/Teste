// Mapeamento de Texturas 

import * as THREE 			from '../resources/threejs/build/three.module.js';
import { OBJLoader } 		from '../resources/threejs/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls }	from '../resources/threejs/examples/jsm/controls/OrbitControls.js';

var renderer;
var scene;
var camera;
var cameraControl;

var gouraudMat=null;
function main() {

	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);
	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

	gouraudMat		= new THREE.MeshLambertMaterial		( 	{	color 		: 0x708090 } );
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
	
	var objectLoader = new OBJLoader();
	objectLoader.load("../resources/Models/teapot.obj", loadMesh);

	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 300;
	camera.lookAt(0,0,0);
	const light = new THREE.AmbientLight( 0xFFFFFF,0.5 );
	scene.add( light );
	
	const dirLight 			= new THREE.DirectionalLight( 0xFFAAAA, 2.0 ); 
	dirLight.name 			= "dirLight";
	dirLight.visible 		= true;
	dirLight.position.set( 0.0, 0.0, 300 );
	scene.add( dirLight );
	const dirLightHelper 	= new THREE.DirectionalLightHelper( dirLight, 4.0 );
	dirLightHelper.name 	= "dirLightHlpr";
	dirLightHelper.visible 	= true;
	scene.add( dirLightHelper );

	var obj = scene.getObjectByName("teapot");
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
	var texture 		= textureLoader.load("../resources/Textures/brick_diffuse.jpg");
	texture.wrapS=THREE.RepeatWrapping;
	texture.wrapT=THREE.RepeatWrapping;
	texture.repeat.set(4,4)
	var material = gouraudMat
	material.map=texture
	loadedMesh.children.forEach(function (child) {
		child.material = material;
		});

	scene.add(loadedMesh);
}

main();
