import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

if (!WebGL.isWebGL2Available()) {
	const warning = WebGL.getWebGL2ErrorMessage();
	document.body.appendChild( warning );
} else {
	createLine();
}

function createLine() {
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 500 );
	camera.position.set( 0, 0, 100 );
	camera.lookAt( 0, 0, 0 );

	const scene = new THREE.Scene();

	const material = new THREE.LineBasicMaterial({ color: 0xcbcbff});

	const points = [];
	points.push( new THREE.Vector3( - 10, 0, 0 ) );
	points.push( new THREE.Vector3( 0, 10, 0 ) );
	points.push( new THREE.Vector3( 10, 0, 0 ) );

	const geometry = new THREE.BufferGeometry().setFromPoints( points );
	const line = new THREE.Line( geometry, material );

	scene.add( line );
	renderer.render( scene, camera );
}