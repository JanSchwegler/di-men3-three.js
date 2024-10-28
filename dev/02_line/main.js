import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

if (!WebGL.isWebGL2Available()) {
	const warning = WebGL.getWebGL2ErrorMessage();
	document.body.appendChild( warning );
} else {
	createLine();
}

function createBox() {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setAnimationLoop( animate );
	document.body.appendChild( renderer.domElement );

	const geometry = new THREE.BoxGeometry( 1, 1, 1 );
	const material = new THREE.MeshBasicMaterial( { color: 0x999999 } );
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	camera.position.z = 5;

	function animate() {
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

		renderer.render( scene, camera );
	}
}

function createLine() {
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 500 );
	camera.position.set( 0, 0, 100 );
	camera.lookAt( 0, 0, 0 );

	const scene = new THREE.Scene();

	const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

	const points = [];
	points.push( new THREE.Vector3( - 10, 0, 0 ) );
	points.push( new THREE.Vector3( 0, 10, 0 ) );
	points.push( new THREE.Vector3( 10, 0, 0 ) );

	const geometry = new THREE.BufferGeometry().setFromPoints( points );
	const line = new THREE.Line( geometry, material );

	scene.add( line );
	renderer.render( scene, camera );
}