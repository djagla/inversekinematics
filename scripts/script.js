function radians_to_degrees(radians) {
    return radians * (180 / Math.PI);
}

function degrees_to_radians(degrees) {
    return degrees * Math.PI / 180;
}

function drawWorkspace() {
    var a2 = $("input[name='a2']").val();
    var a3 = $("input[name='a3']").val();
    var parentWidth = $(".scene3 .workspace").parent().width();
    var scale = parentWidth / 480;
    var armRange = parseInt(a2) + parseInt(a3);

    $(".scene2 .workspace").width(2 * armRange * scale);
    $(".scene2 .workspace").height(2 * armRange * scale);

    $(".scene3 .workspace").width(2 * armRange * scale);
    $(".scene3 .workspace").height(2 * armRange * scale);
}

function calculateIK() {
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
    setEffectorPosition();
}

function calculateFK() {
    var theta1 = degrees_to_radians($("input[name='theta1']").val());
    var theta2 = degrees_to_radians($("input[name='theta2']").val());
    var theta3 = degrees_to_radians($("input[name='theta3']").val());

    animate3DModelFK(theta1, theta2, theta3);
    setEffectorPosition();
}

$(document).ready(function () {
    $(".hg__left").mCustomScrollbar({
        scrollInertia: 200,
        scrollButtons: { enable: false }
    });

    $("#calculateIK").click(function () {
        calculateIK();
        $("#xSlider").slider("value", $("input[name='x']").val());
        $("#ySlider").slider("value", $("input[name='y']").val());
        $("#zSlider").slider("value", $("input[name='z']").val());
        $("#phiSlider").slider("value", $("input[name='phi']").val());
        $("#thetaSlider").slider("value", $("input[name='theta']").val());
        $("#ksiSlider").slider("value", $("input[name='ksi']").val());
    });

    $("#calculateFK").click(function () {
        calculateFK();
        $("#theta1Slider").slider("value", $("input[name='theta1']").val());
        $("#theta2Slider").slider("value", $("input[name='theta2']").val());
        $("#theta3Slider").slider("value", $("input[name='theta3']").val());
    });

    $("#goHome").click(function () {
        $("input[name='x']").val(145);
        $("input[name='y']").val(0);
        $("input[name='z']").val(200);
        $("input[name='phi']").val(0);
        $("input[name='theta']").val(-90);
        $("input[name='ksi']").val(0);

        $("#xSlider").slider({
            value: $("input[name='x']").val()
        });

        $("#ySlider").slider({
            value: $("input[name='y']").val()
        });

        $("#zSlider").slider({
            value: $("input[name='z']").val()
        });

        $("#phiSlider").slider({
            value: $("input[name='phi']").val()
        });

        $("#thetaSlider").slider({
            value: $("input[name='theta']").val()
        });

        $("#ksiSlider").slider({
            value: $("input[name='ksi']").val()
        });

        calculateIK();
    });

    drawWorkspace();

    calculateIK();


    // window resize
    window.addEventListener('resize', function () {
        drawWorkspace();
    });

    $(".reset-view").click(function () {
        camera.position.set(16, 14, 16);
        controls.reset();
        controls.update();
    });

    $(".hide-panel").click(function () {
        $(".hg").addClass("two-columns");
        resizeLayout();
    });

    $(".show-panel").click(function () {
        $(".hg").removeClass("two-columns");
        resizeLayout();
    });

    $("#xSlider").slider({
        value: $("input[name='x']").val(),
        max: 200,
        min: -200,
        slide: function (event, ui) {
            var selection = $("#xSlider").slider("value");
            $("input[name='x']").val(selection);
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
            setEffectorPosition();
        }
    });

    $("#ySlider").slider({
        value: $("input[name='y']").val(),
        max: 200,
        min: -200,
        slide: function (event, ui) {
            var selection = $("#ySlider").slider("value");
            $("input[name='y']").val(selection);
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
            setEffectorPosition();
        }
    });

    $("#zSlider").slider({
        value: $("input[name='z']").val(),
        max: 300,
        slide: function (event, ui) {
            var selection = $("#zSlider").slider("value");
            $("input[name='z']").val(selection);
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
            setEffectorPosition();
        }
    })

    $("#phiSlider").slider({
        value: $("input[name='phi']").val(),
        min: -180,
        max: 180,
        slide: function (event, ui) {
            var selection = $("#phiSlider").slider("value");
            $("input[name='phi']").val(selection);
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
            setEffectorPosition();
        }
    })

    $("#thetaSlider").slider({
        value: $("input[name='theta']").val(),
        min: -180,
        max: 180,
        slide: function (event, ui) {
            var selection = $("#thetaSlider").slider("value");
            $("input[name='theta']").val(selection);
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
            setEffectorPosition();
        }
    })

    $("#ksiSlider").slider({
        value: $("input[name='ksi']").val(),
        min: -180,
        max: 180,
        slide: function (event, ui) {
            var selection = $("#ksiSlider").slider("value");
            $("input[name='ksi']").val(selection);
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
            setEffectorPosition();
        }
    })

    $("#theta1Slider").slider({
        value: $("input[name='theta1']").val(),
        min: -180,
        max: 180,
        slide: function (event, ui) {
            var selection = $("#theta1Slider").slider("value");
            $("input[name='theta1']").val(selection);
            var theta1 = degrees_to_radians($("input[name='theta1']").val());
            var theta2 = degrees_to_radians($("input[name='theta2']").val());
            var theta3 = degrees_to_radians($("input[name='theta3']").val());
            animate3DModelFK(theta1, theta2, theta3);
            setEffectorPosition();
        }
    })

    $("#theta2Slider").slider({
        value: $("input[name='theta2']").val(),
        min: -180,
        max: 180,
        slide: function (event, ui) {
            var selection = $("#theta2Slider").slider("value");
            $("input[name='theta2']").val(selection);
            var theta1 = degrees_to_radians($("input[name='theta1']").val());
            var theta2 = degrees_to_radians($("input[name='theta2']").val());
            var theta3 = degrees_to_radians($("input[name='theta3']").val());
            animate3DModelFK(theta1, theta2, theta3);
            setEffectorPosition();
        }
    })

    $("#theta3Slider").slider({
        value: $("input[name='theta3']").val(),
        min: -180,
        max: 180,
        slide: function (event, ui) {
            var selection = $("#theta3Slider").slider("value");
            $("input[name='theta3']").val(selection);
            var theta1 = degrees_to_radians($("input[name='theta1']").val());
            var theta2 = degrees_to_radians($("input[name='theta2']").val());
            var theta3 = degrees_to_radians($("input[name='theta3']").val());
            animate3DModelFK(theta1, theta2, theta3);
            setEffectorPosition();
        }
    })

    $("#theta4Slider").slider({
        value: $("input[name='theta4']").val(),
        min: -180,
        max: 180,
        slide: function (event, ui) {
            //var selection = $("#theta1Slider").slider("value");
            //$("input[name='theta1']").val(selection);
            //var theta1 = degrees_to_radians($("input[name='theta1']").val());
            //var theta2 = degrees_to_radians($("input[name='theta2']").val());
            //var theta3 = degrees_to_radians($("input[name='theta3']").val());
            //animate3DModelFK(theta1, theta2, theta3);
            //setEffectorPosition();
        }
    })

    $("#theta5Slider").slider({
        value: $("input[name='theta5']").val(),
        min: -180,
        max: 180,
        slide: function (event, ui) {
            //var selection = $("#theta2Slider").slider("value");
            //$("input[name='theta2']").val(selection);
            //var theta1 = degrees_to_radians($("input[name='theta1']").val());
            //var theta2 = degrees_to_radians($("input[name='theta2']").val());
            //var theta3 = degrees_to_radians($("input[name='theta3']").val());
            //animate3DModelFK(theta1, theta2, theta3);
            //setEffectorPosition();
        }
    })

    $("#theta6Slider").slider({
        value: $("input[name='theta6']").val(),
        min: -180,
        max: 180,
        slide: function (event, ui) {
            //var selection = $("#theta3Slider").slider("value");
            //$("input[name='theta3']").val(selection);
            //var theta1 = degrees_to_radians($("input[name='theta1']").val());
            //var theta2 = degrees_to_radians($("input[name='theta2']").val());
            //var theta3 = degrees_to_radians($("input[name='theta3']").val());
            //animate3DModelFK(theta1, theta2, theta3);
            //setEffectorPosition();
        }
    })
});


