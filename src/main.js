import * as THREE from 'three'
import "./style.css"
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'lil-gui'

// Scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xff00ff);


/*
    Debug
*/ 
const gui = new dat.GUI({ width: 400 });
gui.hide()

const parameters = {
    color: 0xff0000,
}

gui.addColor(parameters, 'color')
    .onChange(() => {
        material.color.set(parameters.color)
})

const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / window.innerWidth - 0.5
    cursor.y = - (event.clientY / window.innerHeight - 0.5 )
})




// Objects
// const geometry = new THREE.BoxGeometry(2, 2, 2);
// const material = new THREE.MeshStandardMaterial({color: 0xffffff});
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh);
// console.log(mesh)

// mesh.position.set(3, -6, 0);


// const group = new THREE.Group()
// scene.add(group)

// Create mesh objects
// const mesh1 = new THREE.Mesh(
//     new THREE.BoxGeometry(2, 2, 2),
//     new THREE.MeshBasicMaterial({color: 0xffffff})
// )

// group.add(mesh1);

// const mesh2 = new THREE.Mesh(
//     new THREE.BoxGeometry(2, 2, 2),
//     new THREE.MeshBasicMaterial({color: 0x00ff00})
// )

// mesh2.position.x = -2
// mesh2.position.y = 4
// group.add(mesh2);

// const mesh3 = new THREE.Mesh(
//     new THREE.BoxGeometry(2, 2, 2),
//     new THREE.MeshBasicMaterial({color: 0xfa6aff})
// )

// mesh3.position.x = 4
// group.add(mesh3);


// OR
// Creating a buffer attribute for triangle

// const geometry = new THREE.BufferGeometry()

// const count = 500
// const positionArrays = new Float32Array(count * 3 * 3)

// for (let i = 0; i < count * 3 * 3; i++) {
//     positionArrays[i] =( Math.random() - 0.5) * 10
// }

// const positionsAttribute = new THREE.BufferAttribute(positionArrays, 3)
// geometry.setAttribute('position', positionsAttribute)

// const material = new THREE.MeshBasicMaterial({
//     color: 0xff0000,
//     wireframe: true
// })


/* 
Textures
*/

// const image = new Image()
// const texture = new THREE.Texture(image)
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {

}

loadingManager.onProgress = () => {

}

const textureLoader = new THREE.TextureLoader(loadingManager)
// One texture loader can load multiple textures
const colorTexture = textureLoader.load('static/textures/wood_floor_deck_diff_4k.jpg');
colorTexture.repeat.x = 2
colorTexture.repeat.y = 3
colorTexture.wrapS = THREE.RepeatWrapping
colorTexture.rotation= Math.PI / 4

colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.LinearFilter

// const aplhaTexture = textureLoader.load('static/textures/wood_floor_deck_diff_4k.jpg')
// const heightTexture = textureLoader.load('static/textures/wood_floor_deck_diff_4k.jpg')
// const normalTexture = textureLoader.load('static/textures/wood_floor_deck_diff_4k.jpg')
// const ambientTexture = textureLoader.load('static/textures/wood_floor_deck_diff_4k.jpg')
// const metalnessOcclusionTexture = textureLoader.load('static/textures/wood_floor_deck_diff_4k.jpg')
// const roughnessTexture = textureLoader.load('static/textures/wood_floor_deck_diff_4k.jpg')


// image.onload = () => {
//     // console.log('Image loading')
//     texture.needsUpdate = true
//     console.log(texture)
// }

// image.src = 'static/textures/wood_floor_deck_diff_4k.jpg'



/**
 * Object
 */
// const geometry = new THREE.SphereGeometry(1, 32, 32)
// const geometry = new THREE.TorusGeometry(1, 0.32, 32, 100)
// const geometry = new THREE.SphereGeometry(1, 32, 32)


// const material = new THREE.MeshStandardMaterial({ color: parameters.color })
const material = new THREE.MeshNormalMaterial({ map: colorTexture })
material.flatShading = true

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    material
)
sphere.position.set(2, -1)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.35, 32, 100),
    material
)

// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh);
scene.add(sphere, plane, torus)


// Debug
// Chaining
// gui.add(mesh.position, 'x').min(-7).max(7).step(0.01)
//     .name('elevation')

// gui.add(mesh.position, 'y', -7, 7, 0.01)
// gui.add(mesh.position, 'z', -7, 7, 0.01)

// //boolean
// gui.add(mesh, 'visible')
 
// //wireframe
// gui.add(material, 'wireframe')



// Camera
const camera = new THREE.PerspectiveCamera(
    60, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    100
);

scene.add(camera);
// camera.position.set(0, 0, 10);
camera.position.z = 5;
// camera.lookAt(group.position);
// camera.lookAt(mesh)

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.physicalRendering = true
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.useLegacyLights = true;
renderer.toneMappingExposure = true
renderer.toneMapping = true;

document.body.appendChild(renderer.domElement);

// Lights
//   

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Controllers
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.enablePan = true;
controls.maxPolarAngle = Math.PI / 2;



//Axes helper
// const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);
 
// Rotations
// mesh.rotation.reorder('XYZ')
// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25


// Time
let time = Date.now();

// Animation
// USING GSAP
// gsap.to(group.position, { duration: 1, delay: 1, x: 2})
// gsap.to(mesh1.position, { duration: 1, x: 2, y: 2, z: 2})
// gsap.to(mesh2.position, { duration: 1, delay: 2, x: -4, y: -2, z: 2})
// gsap.to(mesh3.position, { duration: 1, delay: 3, x: -1, y: -1})

const tick = () => {
    requestAnimationFrame(tick);

    // Timer tick
    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime;

    // Render
    renderer.render(scene, camera);

//     // Update
//     group.rotation.x += 0.001 * deltaTime
//     group.rotation.y += 0.001 * deltaTime
    // sphere.rotation.y += 0.001 * deltaTime
    // plane.rotation.z += 0.001 * deltaTime
    // torus.rotation.x += 0.001 * deltaTime
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 10;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 10;
    // camera.position.y = cursor.y * 10;
    // camera.lookAt(group.position)
    controls.update();
}

tick();


// resizw window
window.addEventListener("resize", () => {
    innerHeight = innerHeight
    innerWidth = innerWidth

    // update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
})

window.addEventListener("dblclick", () => {
    if(!document.fullscreenElement) {
        renderer.domElement.requestFullscreen();
        console.log("Going full screen mode motherfuckers!!")
    }
    else {
        console.log("Shit, Exiting full screen")
        document.exitFullscreen()
    }
})

window.addEventListener("keydown", (event) => {
    if(event.key === 'h') {
        if(gui._hidden)
            gui.show()
        else
            gui.hide()
    }
})



// Steps
/*
 * Go through all steps 
 * Look for your designs 
 * Plan the code
 * CODE!!!
 * */ 










// 101
// DATA TYPES
// String
// let me = 'He is a boy..!';

// let age = 16;
// let fullName = 'Emma Crentsil';


// let bio = `She is called ${fullName} and she is ${age}`;

// alert(bio);

//Undefined
// var age;

// console.log(age);


//BOolean
// const hisAge = 17;
// var questionaire = +prompt('Please enter your age');


// if(questionaire === hisAge) {
//     return hisAge;
// }


// console.log(17 === hisAge);


// Decision making 
// const age = 18;

// let clubAcceptance = +prompt('What is your age');

// if (clubAcceptance < age) {
//     alert("You're too young to be clubbing. Go HOME!!")
// } else if (clubAcceptance === age && clubAcceptance <= 50) {
//     alert('Welcome to the club...Hurray')
// } else {
//     alert("You're too old to be here....")
// }

//Switch case
// const customersAge = 18;

// let clubAcceptance = +prompt('What is your age');


// switch(clubAcceptance) {
//     case 17:
//         alert("You're too young to be clubbing. Go HOME!!")
//         break;


//     case 18 || 49:
//         alert('Welcome to the club...Hurray')
//         break;


//     case clubAcceptance > 50:
//         alert("You're too old to be here....")
//         break;


//     default:
//         alert("Go HOME!!")
//         break;
// }
