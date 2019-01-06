// draw Scene
var render = function () {
    control.update();
    scene.add(control, axisHelper);
    renderer.render(scene, camera);
};

var render2 = function () {
    scene.add(gridHelper2);
    scene.remove(axisHelper, control);
    renderer2.render(scene, camera2);
};

var render3 = function () {
    scene.remove(gridHelper2);
    renderer3.render(scene, camera3);
};

var newEffectorPosition = function () {
    var effectorPosition = effector.position;
    var effectorX = effectorPosition.x * 20;
    var effectorY = effectorPosition.y * 20;
    var effectorZ = -effectorPosition.z * 20;

    $("input[name='x']").val(effectorX);
    $("input[name='y']").val(effectorZ);
    $("input[name='z']").val(effectorY);

    var a1 = $("input[name='a1']").val();
    var a2 = $("input[name='a2']").val();
    var a3 = $("input[name='a3']").val();
    var d6 = $("input[name='d6']").val();
    var x = $("input[name='x']").val();
    var y = $("input[name='y']").val();
    var z = $("input[name='z']").val();
    var euler_x = $("input[name='phi']").val();
    var euler_y = $("input[name='theta']").val();
    var euler_z = $("input[name='ksi']").val();

    euler_x = degrees_to_radians(euler_x);
    euler_y = degrees_to_radians(euler_y);
    euler_z = degrees_to_radians(euler_z);

    animate3DModelIK(a1, a2, a3, d6, x, y, z, euler_x, euler_y, euler_z);


    $("#xSlider").slider({
        value: $("input[name='x']").val()
    });

    $("#ySlider").slider({
        value: $("input[name='y']").val()
    });

    $("#zSlider").slider({
        value: $("input[name='z']").val()
    });

    $("#theta1Slider").slider({
        value: $("input[name='theta1']").val()
    });

    $("#theta2Slider").slider({
        value: $("input[name='theta2']").val()
    });

    $("#theta3Slider").slider({
        value: $("input[name='theta3']").val()
    });
};

var setEffectorPosition = function () {
    effector.position.x = $("input[name='x']").val() / 20;
    effector.position.y = $("input[name='z']").val() / 20;
    effector.position.z = -$("input[name='y']").val() / 20;

    effector.rotation.x = degrees_to_radians($("input[name='phi']").val());
    effector.rotation.z = degrees_to_radians($("input[name='theta']").val());
    effector.rotation.y = degrees_to_radians($("input[name='ksi']").val());
};

function animate3DModelIK(a1, a2, a3, d6, x, y, z, euler_x, euler_y, euler_z) {

    var angles = inverseKinematics(a1, a2, a3, d6, x, y, z, euler_x, euler_y, euler_z);

    var theta1 = angles[0];
    var theta2 = angles[1];
    var theta3 = angles[2];
    var theta4 = angles[3];
    var theta5 = angles[4];
    var theta6 = angles[5];

    if (!isNaN(theta1) && !isNaN(theta2) && !isNaN(theta3)) {
        joint1.rotation.y = theta1;
        joint2.rotation.x = theta2;
        joint3.rotation.x = theta3 + Math.PI / 2;

        //joint4.rotation.y = -theta4 - Math.PI / 2;
        joint4.rotation.y = -theta4;
        joint5.rotation.x = theta5;
        //joint6.rotation.y = -theta6;
        joint6.rotation.y = theta6;

        $("input[name='theta1']").val(radians_to_degrees(theta1));
        $("input[name='theta2']").val(radians_to_degrees(theta2));
        $("input[name='theta3']").val(radians_to_degrees(theta3));
        $("input[name='theta4']").val(radians_to_degrees(theta4));
        $("input[name='theta5']").val(radians_to_degrees(theta5));
        $("input[name='theta6']").val(radians_to_degrees(theta6));

        $("#theta1Slider").slider({
            value: $("input[name='theta1']").val()
        });

        $("#theta2Slider").slider({
            value: $("input[name='theta2']").val()
        });

        $("#theta3Slider").slider({
            value: $("input[name='theta3']").val()
        });

        $("#theta4Slider").slider({
            value: $("input[name='theta4']").val()
        });

        $("#theta5Slider").slider({
            value: $("input[name='theta5']").val()
        });

        $("#theta6Slider").slider({
            value: $("input[name='theta6']").val()
        });

        material.color.setHex(0xFF5800); // normal color
        material3.color.setHex(0x1E90FF); // error red
        $(".ui-slider").removeClass("error");
    }
    else {
        material.color.setHex(0xff0000); // error red
        material3.color.setHex(0xff0000); // error red
        $(".ui-slider").addClass("error");
    }
}

function animate3DModelFK(theta1, theta2, theta3) {
    var a1 = $("input[name='a1']").val();
    var a2 = $("input[name='a2']").val();
    var a3 = $("input[name='a3']").val();

    var coordinates = forwardKinematics(a1, a2, a3, theta1, theta2, theta3);

    var x = coordinates[0];
    var y = coordinates[1];
    var z = coordinates[2];

    joint1.rotation.y = theta1;
    joint2.rotation.x = -theta2 + Math.PI / 2;
    joint3.rotation.x = -theta3;

    $("input[name='x']").val(x);
    $("input[name='y']").val(y);
    $("input[name='z']").val(z);

    $("#xSlider").slider({
        value: $("input[name='x']").val()
    });

    $("#ySlider").slider({
        value: $("input[name='y']").val()
    });

    $("#zSlider").slider({
        value: $("input[name='z']").val()
    });
}

function resizeLayout() {
    var parentWidth = $("#3dScene").width();
    var parentHeight = $("#3dScene").height();

    renderer.setSize(parseInt(parentWidth), parseInt(parentHeight));
    camera.aspect = parseInt(parentWidth) / parseInt(parentHeight);
    camera.updateProjectionMatrix();

    var parentWidth2 = $("#3dScene2").width();
    var parentHeight2 = $("#3dScene2").height();
    renderer2.setSize(parseInt(parentWidth2), parseInt(parentHeight2));

    var parentWidth3 = $("#3dScene3").width();
    var parentHeight3 = $("#3dScene3").height();
    renderer3.setSize(parseInt(parentWidth3), parseInt(parentHeight3));
}

var scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

var parentWidth = $("#3dScene").width();
var parentHeight = $("#3dScene").height();

var parentWidth2 = $("#3dScene2").width();
var parentHeight2 = $("#3dScene2").height();

var parentWidth3 = $("#3dScene3").width();
var parentHeight3 = $("#3dScene3").height();

var camera = new THREE.PerspectiveCamera(75, parentWidth / parentHeight, 0.1, 1000);
var camera2 = new THREE.OrthographicCamera(24 / - 2, 24 / 2, 24 / 2, 24 / - 2, 1, 1000);
var camera3 = new THREE.OrthographicCamera(24 / - 2, 24 / 2, 24 / 2, 24 / - 2, 1, 1000);

var renderer = new THREE.WebGLRenderer();
var renderer2 = new THREE.WebGLRenderer();
var renderer3 = new THREE.WebGLRenderer();

renderer.setSize(parseInt(parentWidth), parseInt(parentHeight));
document.getElementById("3dScene").appendChild(renderer.domElement);

renderer2.setSize(parseInt(parentWidth2), parseInt(parentHeight2));
document.getElementById("3dScene2").appendChild(renderer2.domElement);

renderer3.setSize(parseInt(parentWidth3), parseInt(parentHeight3));
document.getElementById("3dScene3").appendChild(renderer3.domElement);

camera.position.set(12, 12, 12);
camera2.position.set(0, 6, 16);
camera3.position.set(0, 20, 0);
camera3.lookAt(new THREE.Vector3(0, 0, 0));

// orbit controls
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enablePan = true;
controls.enableZoom = true;
controls.enableDamping = true;
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI;
controls.dampingFactor = 0.07;
controls.rotateSpeed = 0.07;
controls.keys = {
    LEFT: 68, //left arrow
    UP: 83, // up arrow
    RIGHT: 65, // right arrow
    BOTTOM: 87 // down arrow
}

// window resize
window.addEventListener('resize', function () {
    resizeLayout();
});

// create the shape
var cube = new THREE.BoxGeometry(1, 1, 1);
var box = new THREE.BoxGeometry(0.7, 5, 0.7);
var box2 = new THREE.BoxGeometry(0.7, 2.5, 0.7);
var box3 = new THREE.BoxGeometry(0.7, 1.25, 0.7);
var cylinder = new THREE.CylinderGeometry(1, 1, 1, 16);
var cylinder2 = new THREE.CylinderGeometry(0.5, 0.5, 1, 16);

// create a material, color or image texture
var material = new THREE.MeshStandardMaterial({ color: 0xFF5800, wireframe: false }); // ORANGE
var material2 = new THREE.MeshStandardMaterial({ color: 0xFFFF00, wireframe: false }); // YELLOW
var material3 = new THREE.MeshStandardMaterial({ color: 0x1E90FF, wireframe: true }); // BLUE
var material4 = new THREE.MeshBasicMaterial({ color: 0xcccccc, wireframe: true }); // WIREFRAME
var material5 = new THREE.MeshStandardMaterial({ color: 0x00ff00, wireframe: false }); // RED
var material6 = new THREE.MeshStandardMaterial({ color: 0xcccccc, wireframe: false }); // dark blue

// model parts
var effector = new THREE.Mesh(cube, material6);
var a1 = new THREE.Mesh(box, material);
var a2 = new THREE.Mesh(box, material);
var a3 = new THREE.Mesh(box2, material);
var a4 = new THREE.Mesh(box2, material);
var a5 = new THREE.Mesh(box3, material);
var joint1 = new THREE.Object3D();
var joint2 = new THREE.Object3D();
var joint3 = new THREE.Object3D();
var joint4 = new THREE.Object3D();
var joint5 = new THREE.Object3D();
var joint6 = new THREE.Object3D();
var jointCover1 = new THREE.Mesh(cylinder, material3);
var jointCover2 = new THREE.Mesh(cylinder2, material3);
var jointCover3 = new THREE.Mesh(cylinder2, material3);
var jointCover4 = new THREE.Mesh(cylinder2, material3);
var jointCover5 = new THREE.Mesh(cylinder2, material3);
var jointCover6 = new THREE.Mesh(cylinder2, material3);

// model parts configuration
jointCover1.position.y = 0.5;
jointCover1.rotation.y = Math.PI / 2;
jointCover2.rotation.z = Math.PI / 2;
jointCover3.rotation.z = Math.PI / 2;
jointCover5.rotation.z = Math.PI / 2;
a1.position.y = 2.5;
a2.position.y = 2.5;
a3.position.y = 1.25;
a4.position.y = 1.25;
a5.position.y = 0.625;
joint1.position.y = -0.5;
joint2.position.y = 2.5;
joint3.position.y = 2.5;
joint4.position.y = 1.25;
joint5.position.y = 1.25;
joint6.position.y = 0.625;

// assembling
joint6.add(jointCover6);
a5.add(joint6);
joint5.add(a5, jointCover5);
a4.add(joint5);
joint4.add(a4, jointCover4);
a3.add(joint4);
joint3.add(a3, jointCover3);
a2.add(joint3);
joint2.add(a2, jointCover2);
a1.add(joint2);
joint1.add(a1);
jointCover1.add(joint1);

scene.add(jointCover1);
scene.add(effector);

var axisHelper = new THREE.AxesHelper(2);
axisHelper.position.x = -11;
axisHelper.position.y = 0;
axisHelper.position.z = -11;
scene.add(axisHelper);

var axisHelper2 = new THREE.AxesHelper(2);
axisHelper2.position.x = 0;
axisHelper2.position.y = 0;
axisHelper2.position.z = 0;
effector.add(axisHelper2);

// grid
var gridHelper = new THREE.GridHelper(20, 20, 0xffffff, 0x666666);
var gridHelper2 = new THREE.GridHelper(20, 20, 0xffffff, 0x666666);
gridHelper2.rotation.x = Math.PI / 2;
gridHelper2.rotation.y = Math.PI / 2;
gridHelper2.position.y = 6;
gridHelper2.position.z = -10;
scene.add(gridHelper);

// lights
var light1 = new THREE.AmbientLight(0xffffff, 0.5);

var light2 = new THREE.PointLight(0xffffff, 2.0, 600);
light2.position.y = 15;
light2.position.x = -10;
light2.position.z = -10;

var light3 = new THREE.PointLight(0xffffff, 2.0, 600);
light3.position.y = 15;
light3.position.x = 10;
light3.position.z = 10;

scene.add(light1, light2, light3);

// transform controls
var control = new THREE.TransformControls(camera, renderer.domElement);
control.addEventListener('change', newEffectorPosition);
control.attach(effector);

// game logic
var update = function () {
};

// run game loop (update, render, repeat)
var GameLoop = function () {
    requestAnimationFrame(GameLoop);

    //update();
    render();
    render2();
    render3();
};

GameLoop();