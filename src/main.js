"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
console.error("Reading file...");
var data = fs.readFileSync(process.argv[2], 'utf8').split('\n');
var inputs = data[0].split(' ');
var L = parseInt(inputs[0]);
var C = parseInt(inputs[1]);
var N = parseInt(inputs[2]);
var pi = new Array(N);
var n_people = 0;
for (var i = 0; i < N; i++) {
    pi[i] = parseInt(data[i + 1]);
    n_people += pi[i];
}
console.error("capacity : " + L);
console.error("number of run per day : " + C);
console.error("number of groups :" + N);
console.error("number of people :" + n_people);
var index = 0;
var cach = new Array(N);
console.error("Start computing result...");
var total = 0;
var p = 0;
for (var i = 0; i < C; i++) {
    var charge = 0;
    var firstgroup = index;
    if (cach[firstgroup]) {
        total += cach[firstgroup][1];
        index = cach[firstgroup][0];
    }
    else {
        while (charge < n_people && charge + pi[index] <= L) {
            charge += pi[index];
            total += pi[index];
            index = (index + 1 < N ? index + 1 : 0);
        }
        cach[firstgroup] = [index, charge];
        ++p;
    }
}
console.log("Earnings : " + total);
