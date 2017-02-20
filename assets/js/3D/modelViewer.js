$( document ).ready( function(){
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setSize( 500, 320);//window.innerWidth/3, window.innerHeight/3 );
	renderer.setClearColor( 0xffffff, 0);	// Together with "alpha:true" it makes the background transparent. This way the background color can be controlled through the CSS.
	
        scene.add(new THREE.AmbientLight('#aaaaaa'));
        var light = new THREE.DirectionalLight(0x888888);
        light.position.set(40, -100, 0);
        scene.add(light);
        
	// Creating the object
	/*var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x6B1F3C } );
	var cube = new THREE.Mesh( geometry, material );
	// Adding it to the scene and positioning the camera
	scene.add( cube );
        */
        
        var loader = new THREE.OBJLoader();
        var mirrorCamera = new THREE.CubeCamera( 0.1, 5000, 512 );
        scene.add(mirrorCamera);
        // Adding textures
        var texture = THREE.ImageUtils.loadTexture('3dModels/Texture_42.png');
        
        //var mirrorMaterial = new THREE.MeshBasicMaterial( { envMap: mirrorCamera.renderTarget } );
        //var material = new THREE.MeshBasicMaterial({color: 'red', side: THREE.DoubleSide});
        //var mirrorMaterial = new THREE.MeshPhongMaterial( { emissive: 0x111111, envMap: mirrorCamera.renderTarget } );
        var mirrorMaterial = new THREE.MeshPhongMaterial( { map: texture, envMap: mirrorCamera.renderTarget } );
        
        // when using the Server:
        //loader.load( 'http://localhost:8000/chair.obj', function ( object ){
        
        loader.load( '3dModels/Mark 42.obj', function ( obj ){
            obj.traverse(function (child) {

                if (child instanceof THREE.Mesh) {
                    child.material = mirrorMaterial;//mirrorMaterial;
                    //child.material.shininess = 10;
                }

            });
            scene.add(obj);
        });
        
        
        
	camera.position.z = 2.5;
	
	// Putting the view in the webpage:
	$(".modelViewer").append( renderer.domElement );
	
	/* Determining how the object will move in the view. */
	// Defining the flags adn variables that will determine the movements of the robot (and its background) in the view.
	var rightFlag=false, leftFlag=false, forwardFlag=false, backwardFlag=false, stopFlag=false;
	var backgroundPositionX = 0, backgroundPositionY = 0;
	var robotDegrees = 0;	// the degree at which the robot is bended towards, starting from upward. Range: [0, 360].
	var normZ;
	// Defining the animations (the operations that will be repeated 60 times per second).
	function render(){
		requestAnimationFrame( render );
		
		scene.traverse(function(child) {
                    if(child instanceof THREE.Mesh) {
                        child.rotation.y += 0.02;
                        //child.rotation.x += 0.01;
                    }
                });
		
		renderer.render( scene, camera ); // Defines which scene and camera to which we want to apply the modifications.
	}
	render();	// Starting the animation.
	
});