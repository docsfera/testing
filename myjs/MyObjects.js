const ObjectMouseDown = (camera, objects, plane) => {
	var projector = new THREE.Projector();
	var isclicked = false;
	var intersects;
document.querySelector('html').addEventListener('mousedown', event => {
	var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1,- ( event.clientY / window.innerHeight ) * 2 + 1,0.5 );
	projector.unprojectVector( vector, camera );

	var raycaster = new THREE.Raycaster(camera.position, vector.sub( camera.position ).normalize() );
	intersects = raycaster.intersectObjects( objects );
	//isclicked = true;
	if ( intersects.length> 0 ) 
	{
		isclicked = true;
		
	}

})



document.querySelector('html').addEventListener('mouseup', event => {
	isclicked = false;
})

document.querySelector('html').addEventListener('mousemove', event => {
	if(isclicked){

		var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1,- ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
		projector.unprojectVector( vector, camera );
		var raycaster = new THREE.Raycaster(camera.position, vector.sub( camera.position ).normalize() );
		var intersects2 = raycaster.intersectObject( plane );
		intersects[0].object.position.x =  intersects2[0].point.x;
		intersects[0].object.position.y =  intersects2[0].point.y;

	}
})



}
/*let loader = new THREE.OBJLoader();
loader.load('fdfadf111111111111111111111.obj', function(gltf){
          const mesh3 = new THREE.Mesh(gltf.scene, material);

          gltfStore.obj =  gltf;
          gltf.children[0].material = material;

          car = gltf;

          renderer.render(scene, camera);
          
          scene.add(gltf);

          return gltf;
          animate();
        });*/


/*cylinder.scale.x = 0.6;
cylinder.scale.y = 0.2;
cylinder.scale.z = 0.2;*/

export {ObjectMouseDown};