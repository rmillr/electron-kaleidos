var qs = function(s, all) {
  return (all === true) ? document.querySelectorAll(s) : document.querySelector(s)
}

var canvas, context, camera, scene, raycaster, renderer, texture;

var mouse = new THREE.Vector2(), INTERSECTED;
var radius = 100, amout = 400, size = 20, theta = 0;

init();
animate();

function init() {

  canvas = document.createElement('canvas')
  context = canvas.getContext('2d')
  
  canvas.setAttribute('class','sample')
  canvas.setAttribute('width','400')
  canvas.setAttribute('height','400')
  canvas.style.display = 'none'

  context.drawImage(qs('.kaleidoscope'),-600,-600)

  qs('body').appendChild(canvas)

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

  scene = new THREE.Scene();

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 1, 1, 1 ).normalize();
  scene.add( light );

  var geometry = new THREE.BoxGeometry( size, size, size );
  // var material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } )
  texture = new THREE.Texture(qs('.sample'))
  texture.minFilter = THREE.NearestFilter
  var material = new THREE.MeshBasicMaterial( { map: texture } )
  
  for ( var i = 0; i < amout; i ++ ) {

    var object = new THREE.Mesh( geometry, material );

    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;

    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;

    object.scale.x = Math.random() + 0.5;
    object.scale.y = Math.random() + 0.5;
    object.scale.z = Math.random() + 0.5;

    scene.add( object );

  }

  // raycaster = new THREE.Raycaster();

  renderer = new THREE.WebGLRenderer({alpha: true});
  // renderer.setClearColor( 0xf0f0f0 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.sortObjects = false;
  qs('.three').appendChild(renderer.domElement);

  // stats = new Stats();
  // stats.domElement.style.position = 'absolute';
  // stats.domElement.style.top = '0px';
  // container.appendChild( stats.domElement );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  //

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

  event.preventDefault();

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

//

function animate() {

  requestAnimationFrame( animate );

  render();
  // stats.update();

}

function render() {

  theta += 0.1;

  camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
  camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
  camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
  camera.lookAt( scene.position );

  camera.updateMatrixWorld();

  // find intersections

  // raycaster.setFromCamera( mouse, camera );
  texture.needsUpdate = true;

  // if ( texture ) texture.needsUpdate = true;

  /*
  var intersects = raycaster.intersectObjects( scene.children );

  if ( intersects.length > 0 ) {

    if ( INTERSECTED != intersects[ 0 ].object ) {

      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

      INTERSECTED = intersects[ 0 ].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex( 0xff0000 );

    }

  } else {

    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

    INTERSECTED = null;

  }
  */

  context.drawImage(qs('.kaleidoscope'),-600,-600)
  renderer.render( scene, camera );

}
