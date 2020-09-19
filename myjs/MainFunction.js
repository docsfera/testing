import {ObjectMouseDown} from './MyObjects.js';
	

	


	//alert('innerWidth: ' + window.innerWidth + 'innerHeight: ' + innerHeight);
    const geometry = new THREE.TorusKnotGeometry(10, 1.3, 500, 6, 6, 20);
    const geometry2 = new THREE.SphereGeometry( 20, 64, 64 );

	const scene = new THREE.Scene();

	scene.background = new THREE.Color(0x282c34);
	const camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 10000);

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('threejs').appendChild(renderer.domElement);



	var planeGeometry = new THREE.PlaneGeometry(window.innerWidth,window.innerHeight,1,1);
	var Texture = new THREE.ImageUtils.loadTexture( './shop.jpg' );

	var planeMaterial =  new THREE.MeshBasicMaterial( { map: Texture } );
	var plane = new THREE.Mesh(planeGeometry,planeMaterial);


	plane.position.z = -20;
	//plane.rotation.z = 3.14;
	scene.add(plane);








const material = new THREE.MeshNormalMaterial();

const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 50), material);
const cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 50), material);


cylinder.position.set(1657/3  , 50, 0);
cylinder2.position.set(-550, 50, 0);

scene.add(cylinder);
scene.add(cylinder2);





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


ObjectMouseDown(camera, objects, plane);


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


var convecter = (px) => {
	console.log('work')
}



const animate = function () {

	if(document.querySelector("canvas")){
		var canvas = document.querySelector("canvas");
		var gl = canvas.getContext("webgl2");

		//console.log(gl);
		var div = document.getElementById('fff');

		//console.log(Number(div.style.width.split('px')[0]) / 2)

    	var pixelX = (1) * gl.canvas.width - Number(div.style.width.split('px')[0]) / 2;  //1657
    	var pixelY = (0.4 * -0.5 + 0.5) * gl.canvas.height; // 0.4 * -0.5 + 0.5


    	div.style.left = Math.floor(pixelX) + "px";
    	div.style.top  = Math.floor(pixelY) + "px";
	}
  requestAnimationFrame(animate);

  cylinder.rotation.x += 0.005;
  cylinder.rotation.y += 0.005;
  cylinder.rotation.z += 0.005;

  cylinder2.rotation.x += 0.005;
  cylinder2.rotation.y += 0.005;
  cylinder2.rotation.z += 0.005;
  renderer.render(scene, camera);
};

animate();