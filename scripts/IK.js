//function position(a1, a2, a3, x, y, z) {
//    var theta1 = Math.atan2(y, x); // (1)
//    var r1 = Math.sqrt(x * x + y * y); // (2)
//    var r2 = z - a1; // (3)
//    var phi2 = Math.atan2(r2, r1); // (4)
//    var r3 = Math.sqrt(r1 * r1 + r2 * r2); // (5)
//    var phi1 = Math.acos((a3 * a3 - a2 * a2 - r3 * r3) / (-2 * a2 * r3)); // (6)
//    var theta2 = phi2 + phi1; // (7) <-- ELBOW UP for ELBOW DOWN --> theta2 = phi2 - phi1
//    var phi3 = Math.acos((r3 * r3 - a2 * a2 - a3 * a3) / (-2 * a2 * a3)); // (8)
//    var theta3 = Math.PI - phi3; // (9)    

//    return [theta1, theta2, theta3];
//}

function position(a1, a2, a3, x, y, z) {
    var theta1 = Math.atan2(y, x);
    var r1 = Math.sqrt(x * x + y * y);
    var r2 = z - a1;
    var c = Math.sqrt(r1 * r1 + r2 * r2); //r3

    var alpha = Math.acos((a3 * a3 - a2 * a2 - c * c) / (-2 * a2 * c)); //phi1
    var phi = Math.acos((c * c - a2 * a2 - a3 * a3) / (-2 * a2 * a3)); //phi3
    var delta = Math.atan2(r2, Math.sqrt(x * x + y * y)); //phi2

    var theta2 = (Math.PI / 2) - (delta + alpha);
    var theta3 = (Math.PI / 2) - phi;

    return [theta1, theta2, theta3];
}

function orientation(theta1, theta2, theta3, R, DH) {

    var i = 0; //DH i=1!!!

    var H0_1 = math.matrix([
        [Math.cos(DH.get([i, 0])), -Math.sin(DH.get([i, 0])) * Math.cos(DH.get([i, 1])), Math.sin(DH.get([i, 0])) * Math.sin(DH.get([i, 1])), DH.get([i, 2]) * Math.cos(DH.get([i, 0]))],
        [Math.sin(DH.get([i, 0])), Math.cos(DH.get([i, 0])) * Math.cos(DH.get([i, 1])), -Math.cos(DH.get([i, 0])) * Math.sin(DH.get([i, 1])), DH.get([i, 2]) * Math.sin(DH.get([i, 0]))],
        [0, Math.sin(DH.get([i, 1])), Math.cos(DH.get([i, 1])), DH.get([i, 3])],
        [0, 0, 0, 1]
    ]);

    var i = 1; //DH i=2!!!

    var H1_2 = math.matrix([
        [Math.cos(DH.get([i, 0])), -Math.sin(DH.get([i, 0])) * Math.cos(DH.get([i, 1])), Math.sin(DH.get([i, 0])) * Math.sin(DH.get([i, 1])), DH.get([i, 2]) * Math.cos(DH.get([i, 0]))],
        [Math.sin(DH.get([i, 0])), Math.cos(DH.get([i, 0])) * Math.cos(DH.get([i, 1])), -Math.cos(DH.get([i, 0])) * Math.sin(DH.get([i, 1])), DH.get([i, 2]) * Math.sin(DH.get([i, 0]))],
        [0, Math.sin(DH.get([i, 1])), Math.cos(DH.get([i, 1])), DH.get([i, 3])],
        [0, 0, 0, 1]
    ]);

    var i = 2; //DH i=3!!!

    var H2_3 = math.matrix([
        [Math.cos(DH.get([i, 0])), -Math.sin(DH.get([i, 0])) * Math.cos(DH.get([i, 1])), Math.sin(DH.get([i, 0])) * Math.sin(DH.get([i, 1])), DH.get([i, 2]) * Math.cos(DH.get([i, 0]))],
        [Math.sin(DH.get([i, 0])), Math.cos(DH.get([i, 0])) * Math.cos(DH.get([i, 1])), -Math.cos(DH.get([i, 0])) * Math.sin(DH.get([i, 1])), DH.get([i, 2]) * Math.sin(DH.get([i, 0]))],
        [0, Math.sin(DH.get([i, 1])), Math.cos(DH.get([i, 1])), DH.get([i, 3])],
        [0, 0, 0, 1]
    ]);

    var H0_3 = math.multiply(H0_1, H1_2, H2_3);

    var R0_3 = math.matrix([
        [H0_3.get([0, 0]), H0_3.get([0, 1]), H0_3.get([0, 2])],
        [H0_3.get([1, 0]), H0_3.get([1, 1]), H0_3.get([1, 2])],
        [H0_3.get([2, 0]), H0_3.get([2, 1]), H0_3.get([2, 2])]
    ]);

    var inverse_R0_3 = math.inv(R0_3);

    var R3_6 = math.multiply(inverse_R0_3, R);

    //var theta5 = Math.acos(R3_6.get([2, 2]));

    var theta5 = Math.atan2(Math.sqrt(1 - R3_6.get([2, 2]) * R3_6.get([2, 2])), R3_6.get([2, 2]));

    if (Math.sin(theta5) == 0) {
        //var theta4 = -Math.atan2(-R3_6.get([0, 2]), R3_6.get([1, 2]));
        //var theta6 = Math.atan2(R3_6.get([2, 0]), -R3_6.get([2, 1]));
        var theta4 = 0;
        var theta6 = 0;
        //alert("BOOM!");

    } else if (Math.sin(theta5) > 0) {
        var theta4 = Math.atan2(R3_6.get([1, 2]), -R3_6.get([0, 2]));
        var theta6 = Math.atan2(R3_6.get([2, 1]), -R3_6.get([2, 0]));
    }
    else {
        var theta4 = Math.atan2(R3_6.get([1, 2]), R3_6.get([0, 2]));
        var theta6 = Math.atan2(-R3_6.get([2, 1]), R3_6.get([2, 0]));
    }

    return [theta4, theta5, theta6];
}


function inverseKinematics(a1, a2, a3, d6, x, y, z, euler_x, euler_y, euler_z) {

    //console.log("Euler X = " + euler_x);
    //console.log("Euler Y = " + euler_y);
    //console.log("Euler Z = " + euler_z);

    var R = math.matrix([
        [Math.cos(euler_z) * Math.cos(euler_y), -Math.sin(euler_z) * Math.cos(euler_x) + Math.cos(euler_z) * Math.sin(euler_y) * Math.sin(euler_x), Math.sin(euler_z) * Math.sin(euler_x) + Math.cos(euler_z) * Math.sin(euler_y) * Math.cos(euler_x)],
        [Math.sin(euler_z) * Math.sin(euler_y), Math.cos(euler_z) * Math.cos(euler_x) + Math.sin(euler_z) * Math.sin(euler_y) * Math.sin(euler_x), -Math.cos(euler_z) * Math.sin(euler_x) + Math.sin(euler_z) * Math.sin(euler_y) * Math.cos(euler_x)],
        [-Math.sin(euler_y), Math.cos(euler_y) * Math.sin(euler_x), Math.cos(euler_y) * Math.cos(euler_x)]
    ]);

    //console.log("R");
    //console.log(R.get([0, 0]) + ", " + R.get([0, 1]) + ", " + R.get([0, 2]));
    //console.log(R.get([1, 0]) + ", " + R.get([1, 1]) + ", " + R.get([1, 2]));
    //console.log(R.get([2, 0]) + ", " + R.get([2, 1]) + ", " + R.get([2, 2]));

    var new_x = x - d6 * R.get([0, 2]);
    var new_y = y - d6 * R.get([1, 2]);
    var new_z = z - d6 * R.get([2, 2]);

    //console.log(d6 * R.get([0, 2]));
    //console.log(d6 * R.get([1, 2]));
    //console.log(d6 * R.get([2, 2]));

    //console.log("x = " + new_x);
    //console.log("y = " + new_y);
    //console.log("z = " + new_z);
    //console.log("d6 = " + d6);


    var effectorPosition = position(a1, a2, a3, new_x, new_y, new_z);

    var theta1 = effectorPosition[0];
    var theta2 = effectorPosition[1];
    var theta3 = effectorPosition[2];


    var DH = math.matrix([
        [theta1, -Math.PI / 2, 0, a1],
        [theta2, 0, a2, 0],
        [theta3 - Math.PI / 2, -Math.PI / 2, 0, 0]

        //[theta4, Math.PI / 2, 0, a3],
        //[theta5, -Math.PI / 2, 0, 0],
        //[theta6, 0, 0, d6]
    ]);

    var effectorOrientation = orientation(theta1, theta2, theta3, R, DH);

    var theta4 = effectorOrientation[0];
    var theta5 = effectorOrientation[1];
    var theta6 = effectorOrientation[2];

    /*#################################################################################################################################*/
    var DH = math.matrix([
        [theta1, -Math.PI / 2, 0, a1],
        [theta2, 0, a2, 0],
        [theta3 - Math.PI / 2, -Math.PI / 2, 0, 0],
        [theta4, Math.PI / 2, 0, a3],
        [theta5, -Math.PI / 2, 0, 0],
        [theta6, 0, 0, d6]
    ]);

    var i = 0; //DH i=1!!!

    var H0_1 = math.matrix([
        [Math.cos(DH.get([i, 0])), -Math.sin(DH.get([i, 0])) * Math.cos(DH.get([i, 1])), Math.sin(DH.get([i, 0])) * Math.sin(DH.get([i, 1])), DH.get([i, 2]) * Math.cos(DH.get([i, 0]))],
        [Math.sin(DH.get([i, 0])), Math.cos(DH.get([i, 0])) * Math.cos(DH.get([i, 1])), -Math.cos(DH.get([i, 0])) * Math.sin(DH.get([i, 1])), DH.get([i, 2]) * Math.sin(DH.get([i, 0]))],
        [0, Math.sin(DH.get([i, 1])), Math.cos(DH.get([i, 1])), DH.get([i, 3])],
        [0, 0, 0, 1]
    ]);

    var i = 1; //DH i=2!!!

    var H1_2 = math.matrix([
        [Math.cos(DH.get([i, 0])), -Math.sin(DH.get([i, 0])) * Math.cos(DH.get([i, 1])), Math.sin(DH.get([i, 0])) * Math.sin(DH.get([i, 1])), DH.get([i, 2]) * Math.cos(DH.get([i, 0]))],
        [Math.sin(DH.get([i, 0])), Math.cos(DH.get([i, 0])) * Math.cos(DH.get([i, 1])), -Math.cos(DH.get([i, 0])) * Math.sin(DH.get([i, 1])), DH.get([i, 2]) * Math.sin(DH.get([i, 0]))],
        [0, Math.sin(DH.get([i, 1])), Math.cos(DH.get([i, 1])), DH.get([i, 3])],
        [0, 0, 0, 1]
    ]);

    var i = 2; //DH i=3!!!

    var H2_3 = math.matrix([
        [Math.cos(DH.get([i, 0])), -Math.sin(DH.get([i, 0])) * Math.cos(DH.get([i, 1])), Math.sin(DH.get([i, 0])) * Math.sin(DH.get([i, 1])), DH.get([i, 2]) * Math.cos(DH.get([i, 0]))],
        [Math.sin(DH.get([i, 0])), Math.cos(DH.get([i, 0])) * Math.cos(DH.get([i, 1])), -Math.cos(DH.get([i, 0])) * Math.sin(DH.get([i, 1])), DH.get([i, 2]) * Math.sin(DH.get([i, 0]))],
        [0, Math.sin(DH.get([i, 1])), Math.cos(DH.get([i, 1])), DH.get([i, 3])],
        [0, 0, 0, 1]
    ]);

    var i = 3; //DH i=4!!!

    var H3_4 = math.matrix([
        [Math.cos(DH.get([i, 0])), -Math.sin(DH.get([i, 0])) * Math.cos(DH.get([i, 1])), Math.sin(DH.get([i, 0])) * Math.sin(DH.get([i, 1])), DH.get([i, 2]) * Math.cos(DH.get([i, 0]))],
        [Math.sin(DH.get([i, 0])), Math.cos(DH.get([i, 0])) * Math.cos(DH.get([i, 1])), -Math.cos(DH.get([i, 0])) * Math.sin(DH.get([i, 1])), DH.get([i, 2]) * Math.sin(DH.get([i, 0]))],
        [0, Math.sin(DH.get([i, 1])), Math.cos(DH.get([i, 1])), DH.get([i, 3])],
        [0, 0, 0, 1]
    ]);

    var i = 4; //DH i=5!!!

    var H4_5 = math.matrix([
        [Math.cos(DH.get([i, 0])), -Math.sin(DH.get([i, 0])) * Math.cos(DH.get([i, 1])), Math.sin(DH.get([i, 0])) * Math.sin(DH.get([i, 1])), DH.get([i, 2]) * Math.cos(DH.get([i, 0]))],
        [Math.sin(DH.get([i, 0])), Math.cos(DH.get([i, 0])) * Math.cos(DH.get([i, 1])), -Math.cos(DH.get([i, 0])) * Math.sin(DH.get([i, 1])), DH.get([i, 2]) * Math.sin(DH.get([i, 0]))],
        [0, Math.sin(DH.get([i, 1])), Math.cos(DH.get([i, 1])), DH.get([i, 3])],
        [0, 0, 0, 1]
    ]);

    var i = 5; //DH i=6!!!

    var H5_6 = math.matrix([
        [Math.cos(DH.get([i, 0])), -Math.sin(DH.get([i, 0])) * Math.cos(DH.get([i, 1])), Math.sin(DH.get([i, 0])) * Math.sin(DH.get([i, 1])), DH.get([i, 2]) * Math.cos(DH.get([i, 0]))],
        [Math.sin(DH.get([i, 0])), Math.cos(DH.get([i, 0])) * Math.cos(DH.get([i, 1])), -Math.cos(DH.get([i, 0])) * Math.sin(DH.get([i, 1])), DH.get([i, 2]) * Math.sin(DH.get([i, 0]))],
        [0, Math.sin(DH.get([i, 1])), Math.cos(DH.get([i, 1])), DH.get([i, 3])],
        [0, 0, 0, 1]
    ]);

    console.log(".......................................................................................");

    //var H0_1 = math.matrix([
    //    [Math.cos(theta1), 0, Math.sin(theta1), 0],
    //    [Math.sin(theta1), 0, -Math.cos(theta1), 0],
    //    [0, -1, 0, a1],
    //    [0, 0, 0, 1]
    //]);

    //var H1_2 = math.matrix([
    //    [Math.cos(theta2 - Math.PI / 2), -Math.sin(theta2 - Math.PI / 2), 0, a2 * Math.cos(theta2 - Math.PI / 2)],
    //    [Math.sin(theta2 - Math.PI / 2), Math.cos(theta2 - Math.PI / 2), 0, a2 * Math.sin(theta2 - Math.PI / 2)],
    //    [0, 0, 1, 0],
    //    [0, 0, 0, 1]
    //]);

    //var H2_3 = math.matrix([
    //    [Math.cos(theta3), 0, Math.sin(theta3), 0],
    //    [Math.sin(theta3), 0, -Math.cos(theta3), 0],
    //    [0, -1, 0, 0],
    //    [0, 0, 0, 1]
    //]);

    //var H3_4 = math.matrix([
    //    [Math.cos(theta4), 0, Math.sin(theta4), 0],
    //    [Math.sin(theta4), 0, -Math.cos(theta4), 0],
    //    [0, 1, 0, a3],
    //    [0, 0, 0, 1]
    //]);

    //var H4_5 = math.matrix([
    //    [Math.cos(theta5), 0, Math.sin(theta5), 0],
    //    [Math.sin(theta5), 0, -Math.cos(theta5), 0],
    //    [0, -1, 0, 0],
    //    [0, 0, 0, 1]
    //]);

    //var H5_6 = math.matrix([
    //    [Math.cos(theta6), -Math.sin(theta6), 0, 0],
    //    [Math.sin(theta6), Math.cos(theta6) , 0, 0],
    //    [0, 0, 1, d6],
    //    [0, 0, 0, 1]
    //]);


    var H0_3 = math.multiply(H0_1, H1_2, H2_3);

    var H0_6 = math.multiply(H0_1, H1_2, H2_3, H3_4, H4_5, H5_6);

    /* PRINT MATRICES */

    console.log("H0_1");
    console.log(H0_1.get([0, 0]) + ", " + H0_1.get([0, 1]) + ", " + H0_1.get([0, 2]) + ", " + H0_1.get([0, 3]));
    console.log(H0_1.get([1, 0]) + ", " + H0_1.get([1, 1]) + ", " + H0_1.get([1, 2]) + ", " + H0_1.get([1, 3]));
    console.log(H0_1.get([2, 0]) + ", " + H0_1.get([2, 1]) + ", " + H0_1.get([2, 2]) + ", " + H0_1.get([2, 3]));
    console.log(H0_1.get([3, 0]) + ", " + H0_1.get([3, 1]) + ", " + H0_1.get([3, 2]) + ", " + H0_1.get([3, 3]));

    console.log("H1_2");
    console.log(H1_2.get([0, 0]) + ", " + H1_2.get([0, 1]) + ", " + H1_2.get([0, 2]) + ", " + H1_2.get([0, 3]));
    console.log(H1_2.get([1, 0]) + ", " + H1_2.get([1, 1]) + ", " + H1_2.get([1, 2]) + ", " + H1_2.get([1, 3]));
    console.log(H1_2.get([2, 0]) + ", " + H1_2.get([2, 1]) + ", " + H1_2.get([2, 2]) + ", " + H1_2.get([2, 3]));
    console.log(H1_2.get([3, 0]) + ", " + H1_2.get([3, 1]) + ", " + H1_2.get([3, 2]) + ", " + H1_2.get([3, 3]));

    console.log("H2_3");
    console.log(H2_3.get([0, 0]) + ", " + H2_3.get([0, 1]) + ", " + H2_3.get([0, 2]) + ", " + H2_3.get([0, 3]));
    console.log(H2_3.get([1, 0]) + ", " + H2_3.get([1, 1]) + ", " + H2_3.get([1, 2]) + ", " + H2_3.get([1, 3]));
    console.log(H2_3.get([2, 0]) + ", " + H2_3.get([2, 1]) + ", " + H2_3.get([2, 2]) + ", " + H2_3.get([2, 3]));
    console.log(H2_3.get([3, 0]) + ", " + H2_3.get([3, 1]) + ", " + H2_3.get([3, 2]) + ", " + H2_3.get([3, 3]));

    console.log("H3_4");
    console.log(H3_4.get([0, 0]) + ", " + H3_4.get([0, 1]) + ", " + H3_4.get([0, 2]) + ", " + H3_4.get([0, 3]));
    console.log(H3_4.get([1, 0]) + ", " + H3_4.get([1, 1]) + ", " + H3_4.get([1, 2]) + ", " + H3_4.get([1, 3]));
    console.log(H3_4.get([2, 0]) + ", " + H3_4.get([2, 1]) + ", " + H3_4.get([2, 2]) + ", " + H3_4.get([2, 3]));
    console.log(H3_4.get([3, 0]) + ", " + H3_4.get([3, 1]) + ", " + H3_4.get([3, 2]) + ", " + H3_4.get([3, 3]));

    console.log("H4_5");
    console.log(H4_5.get([0, 0]) + ", " + H4_5.get([0, 1]) + ", " + H4_5.get([0, 2]) + ", " + H4_5.get([0, 3]));
    console.log(H4_5.get([1, 0]) + ", " + H4_5.get([1, 1]) + ", " + H4_5.get([1, 2]) + ", " + H4_5.get([1, 3]));
    console.log(H4_5.get([2, 0]) + ", " + H4_5.get([2, 1]) + ", " + H4_5.get([2, 2]) + ", " + H4_5.get([2, 3]));
    console.log(H4_5.get([3, 0]) + ", " + H4_5.get([3, 1]) + ", " + H4_5.get([3, 2]) + ", " + H4_5.get([3, 3]));

    console.log("H5_6");
    console.log(H5_6.get([0, 0]) + ", " + H5_6.get([0, 1]) + ", " + H5_6.get([0, 2]) + ", " + H5_6.get([0, 3]));
    console.log(H5_6.get([1, 0]) + ", " + H5_6.get([1, 1]) + ", " + H5_6.get([1, 2]) + ", " + H5_6.get([1, 3]));
    console.log(H5_6.get([2, 0]) + ", " + H5_6.get([2, 1]) + ", " + H5_6.get([2, 2]) + ", " + H5_6.get([2, 3]));
    console.log(H5_6.get([3, 0]) + ", " + H5_6.get([3, 1]) + ", " + H5_6.get([3, 2]) + ", " + H5_6.get([3, 3]));

    console.log("---------------------------------------------------------------------------------------");

    console.log("H0_3");
    console.log(H0_3.get([0, 0]) + ", " + H0_3.get([0, 1]) + ", " + H0_3.get([0, 2]) + ", " + H0_3.get([0, 3]));
    console.log(H0_3.get([1, 0]) + ", " + H0_3.get([1, 1]) + ", " + H0_3.get([1, 2]) + ", " + H0_3.get([1, 3]));
    console.log(H0_3.get([2, 0]) + ", " + H0_3.get([2, 1]) + ", " + H0_3.get([2, 2]) + ", " + H0_3.get([2, 3]));
    console.log(H0_3.get([3, 0]) + ", " + H0_3.get([3, 1]) + ", " + H0_3.get([3, 2]) + ", " + H0_3.get([3, 3]));

    console.log("H0_6");
    console.log(H0_6.get([0, 0]) + ", " + H0_6.get([0, 1]) + ", " + H0_6.get([0, 2]) + ", " + H0_6.get([0, 3]));
    console.log(H0_6.get([1, 0]) + ", " + H0_6.get([1, 1]) + ", " + H0_6.get([1, 2]) + ", " + H0_6.get([1, 3]));
    console.log(H0_6.get([2, 0]) + ", " + H0_6.get([2, 1]) + ", " + H0_6.get([2, 2]) + ", " + H0_6.get([2, 3]));
    console.log(H0_6.get([3, 0]) + ", " + H0_6.get([3, 1]) + ", " + H0_6.get([3, 2]) + ", " + H0_6.get([3, 3]));

    //console.log("R0_3");
    //console.log(R0_3.get([0, 0]) + ", " + R0_3.get([0, 1]) + ", " + R0_3.get([0, 2]));
    //console.log(R0_3.get([1, 0]) + ", " + R0_3.get([1, 1]) + ", " + R0_3.get([1, 2]));
    //console.log(R0_3.get([2, 0]) + ", " + R0_3.get([2, 1]) + ", " + R0_3.get([2, 2]));

    //console.log("R0_6");
    //console.log(R.get([0, 0]) + ", " + R.get([0, 1]) + ", " + R.get([0, 2]));
    //console.log(R.get([1, 0]) + ", " + R.get([1, 1]) + ", " + R.get([1, 2]));
    //console.log(R.get([2, 0]) + ", " + R.get([2, 1]) + ", " + R.get([2, 2]));

    //console.log("R3_6");
    //console.log(R3_6.get([0, 0]) + ", " + R3_6.get([0, 1]) + ", " + R3_6.get([0, 2]));
    //console.log(R3_6.get([1, 0]) + ", " + R3_6.get([1, 1]) + ", " + R3_6.get([1, 2]));
    //console.log(R3_6.get([2, 0]) + ", " + R3_6.get([2, 1]) + ", " + R3_6.get([2, 2]));
    /*#################################################################################################################################*/

    return [theta1, theta2, theta3, theta4, theta5, theta6];
}