//import {ObjectMouseDown} from './MyObjects.js';
	
let CreateBox = () =>{
	let textureBox = new THREE.ImageUtils.loadTexture( './cardboard-texture.jpg' );
	let boxMaterial = new THREE.MeshPhongMaterial( { map: textureBox } );
	let cube = new THREE.Mesh(new THREE.BoxGeometry(80, 80, 80), new THREE.MeshNormalMaterial() );
	let cube2 = new THREE.Mesh(new THREE.BoxGeometry(90, 90, 90), new THREE.MeshNormalMaterial() );
	cube2.position.x = 10;
	let cube2BSP = new ThreeBSP(cube);
	let cube1BSP = new ThreeBSP(cube2);
	let resultBSP = cube1BSP.subtract(cube2BSP);

	/*let gggg = new THREE.BoxGeometry(90, 90, 90);
	console.log(gggg);
	console.log(resultBSP.toGeometry());*/


	let result = new Physijs.BoxMesh(resultBSP.toGeometry(), Physijs.createMaterial(new THREE.MeshPhongMaterial(
	{
		map: textureBox, 
		transparent:true
	})),0);

	result.__dirtyRotation = true;

	//let result = resultBSP.toMesh(boxMaterial);
    result.geometry.computeFaceNormals();
    result.geometry.computeVertexNormals();
    return result;
}

	
	//var cube1BSP = new ThreeBSP(cube);
	//sphere1BSP.subtract(sphere2BSP);

	//alert('innerWidth: ' + window.innerWidth + 'innerHeight: ' + innerHeight);
    const geometry = new THREE.TorusKnotGeometry(10, 1.3, 500, 6, 6, 20);
    const geometry2 = new THREE.SphereGeometry( 20, 64, 64 );

	const scene = new Physijs.Scene({ reportsize: 50, fixedTimeStep: 1 / 20 }); // для работы rotation
	/*scene.addEventListener( 'update', function() {
    	// the scene's physics have finished updating
	});*/

	//scene.background = new THREE.Color(0x282c34);

	// Try to add orbitcamera

	const camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 10000);

	



	const renderer = new THREE.WebGLRenderer({antialias: true}); // зачем?
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('threejs').appendChild(renderer.domElement);

	var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
	orbitControls.autoRotate = true;
	var clock = new THREE.Clock();




	var planeGeometry = new THREE.PlaneGeometry(window.innerWidth,window.innerHeight,1,1);
	var Texture = new THREE.ImageUtils.loadTexture( './shop.jpg' );

	var planeMaterial =  new THREE.MeshBasicMaterial( { map: Texture } );
	var plane = new THREE.Mesh(planeGeometry,planeMaterial);


	plane.position.z = -20;

	scene.add(plane);

	let box = CreateBox()
	box.position.z = 40;
    scene.add( box );
  


const material = new THREE.MeshNormalMaterial();

const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 50), material);
const cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 50), material);


cylinder.position.set(1677/3  , 50, 40);
cylinder2.position.set(-550, 50, 40);

scene.add(cylinder);
scene.add(cylinder2);

Physijs.scripts.worker = './js/physijs_worker.js';
Physijs.scripts.ammo = './js/ammo.js';

var stoneGeom = new THREE.CubeGeometry(6,6,2);
var stone = new Physijs.BoxMesh(stoneGeom, Physijs.createMaterial(new THREE.MeshPhongMaterial(
	{
		color: 0xff0000,
		transparent:true,
		opacity:0.8
	})),0);

var stone2 = new Physijs.BoxMesh(stoneGeom, Physijs.createMaterial(new THREE.MeshPhongMaterial(
	{
		color: 0xff0000,
		transparent:true,
		opacity:0.8
	})),5);

stone2.position.x = 0;
stone2.position.y = 240;
stone2.position.z = 20;
stone.position.x = 200;
console.log(stone);
stone.__dirtyRotation = true;
stone2.__dirtyRotation = true;
stone2.__dirtyPosition = true;
stone.__dirtyPosition = true;
console.log(stone.__dirtyPosition);
scene.add(stone);
scene.add(stone2);

scene.setGravity(new THREE.Vector3(0, -15, 0));


var gltfStore = {};


camera.position.z = 2000;

const frontSpot = new THREE.SpotLight(0xeeeece);
frontSpot.position.set(1000, 1000, 1000);
scene.add(frontSpot);

const frontSpot2 = new THREE.SpotLight(0xddddce);
scene.add(frontSpot2);

var objects = [];
objects.push(cylinder);
objects.push(cylinder2);


//ObjectMouseDown(camera, objects, plane);


var fontloader = new THREE.FontLoader();



fontloader.load( 'fonts/helvetiker_regular.typeface.js', function ( font ) {

	var geometry = new THREE.TextGeometry( 'Sergay are a gay', {
		font: font,
		size: 3,
		height: 0,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 0,
		bevelSize: 0,
		bevelOffset: 0,
		bevelSegments: 0
	} );
	var geometry2 = new THREE.TextGeometry( 'Volodya', {
		font: font,
		size: 3,
		height: 0,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 0,
		bevelSize: 0,
		bevelOffset: 0,
		bevelSegments: 0
	} );

	var gggg = new THREE.Mesh(geometry,material);
	var gggg2 = new THREE.Mesh(geometry2,material);
	gggg.position.set(100, 36, 0);
	gggg2.position.set(100, 36, 0);
	scene.add(gggg);
	scene.add(gggg2);


} );


var convecterX = (gl, div, x) => {
	let a = 1110 / gl.canvas.width;
	return gl.canvas.width / 2 + 1/a * x - Number(div.style.width.split('px')[0]) / 2;
}

var convecterY = (gl, div, x) => {
	let a = 255 * 2 / gl.canvas.height;
	return gl.canvas.height / 2 - 1/a * x - Number(div.style.height.split('px')[0]) / 2;
}



const animate = function () {

	if(document.querySelector("canvas")){
		var canvas = document.querySelector("canvas");
		var gl = canvas.getContext("webgl2");

		var div = document.getElementById('fff');


    	var pixelX = convecterX(gl, div, -555);
    	var pixelY = convecterY(gl, div, 250);


    	div.style.left = Math.floor(pixelX) + "px";
    	div.style.top  = Math.floor(pixelY) + "px";

    	cylinder.position.set(0, 0, 40);
		cylinder2.position.set(-555, 250, 0);

	}
  requestAnimationFrame(animate);

  /*cylinder.rotation.x += 0.005;
  cylinder.rotation.y += 0.005;
  cylinder.rotation.z += 0.005;

  cylinder2.rotation.x += 0.005;
  cylinder2.rotation.y += 0.005;
  cylinder2.rotation.z += 0.005;*/

  	//result.rotation.x += 0.005;

  	var delta = clock.getDelta();
	orbitControls.update(delta);

  	box.__dirtyRotation = true;
    box.rotation.z += -0.003;
    stone.__dirtyPosition = true;
    stone.__dirtyRotation = true;
    stone.rotation.y += 0.095;

    //stone2.__dirtyRotation = true;
	//stone2.__dirtyPosition = true;

    //console.log(stone.__dirtyPosition);
    //console.log(box.rotation);
   // result.rotation.z += 0.005;
  

  renderer.render(scene, camera);
  scene.simulate();
};

animate();