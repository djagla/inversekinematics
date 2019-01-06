function forwardKinematics(a1, a2, a3, theta1, theta2, theta3) {
    //var theta2 = -theta2;
    
    var x = Math.cos(theta1) * (a3 * Math.cos(theta2 + theta3) + a2 * Math.cos(theta2));
    var y = Math.sin(theta1) * (a3 * Math.cos(theta2 + theta3) + a2 * Math.cos(theta2));
    var z = a1 - a3 * Math.sin(theta2 + theta3) - a2 * Math.sin(theta2);

    return [x, y, z];
}