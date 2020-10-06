"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Classes_1 = require("./Classes");
var data = fs.readFileSync(process.argv[2], 'utf8').split('\n');
var inputs = data[0].split(' ');
var L = parseInt(inputs[0]);
var C = parseInt(inputs[1]);
var N = parseInt(inputs[2]);
var rc = new Classes_1.RollerCoaster(L, C, N);
for (var i = 0; i < N; i++) {
    rc.pi[i] = parseInt(data[i + 1]);
    rc.n_people += rc.pi[i];
}
rc.estimateEarnings();
