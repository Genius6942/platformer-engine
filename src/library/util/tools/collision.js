"use strict";
exports.__esModule = true;
exports.aabb = void 0;
var aabb = function (object1, object2) {
    // AABB collision with x and y as center
    return (object1.x - object1.width / 2 < object2.x + object2.width / 2 &&
        object1.x + object1.width / 2 > object2.x - object2.width / 2 &&
        object1.y - object1.height / 2 < object2.y + object2.height / 2 &&
        object1.y + object1.height / 2 > object2.y - object2.height / 2);
};
exports.aabb = aabb;
