"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Classes_1 = require("./Classes");
function readInput(filename) {
    var data = fs.readFileSync(filename, 'utf8').split('\n');
    var inputs = data[0].split(' ');
    var L = parseInt(inputs[0]);
    var C = parseInt(inputs[1]);
    var N = parseInt(inputs[2]);
    var rc = new Classes_1.RollerCoaster(L, C, N);
    for (var i = 0; i < N; i++) {
        rc.pi[i] = parseInt(data[i + 1]);
        rc.n_people += rc.pi[i];
    }
    return rc;
}
function estimateEarnings(filename) {
    var rc = readInput(filename);
    var cache = new Array(rc.N);
    var loopDetected = false;
    var index = 0;
    var total = 0;
    var i = 0;
    while (i < rc.C) {
        var firstgroup = index;
        if (cache[firstgroup]) {
            if (!loopDetected) {
                var n_cycles = i - cache[firstgroup].cycle;
                var loopCharge = total - cache[firstgroup].prevTotal;
                while (i + n_cycles < rc.C) {
                    total += loopCharge;
                    i = i + n_cycles;
                }
                loopDetected = true;
            }
            else {
                total += cache[firstgroup].charge;
                index = cache[firstgroup].nextGroup;
                ++i;
            }
        }
        else {
            var charge = 0;
            var prevTotal = total;
            while (charge < rc.n_people && charge + rc.pi[index] <= rc.L) {
                charge += rc.pi[index];
                total += rc.pi[index];
                index = (index + 1 < rc.N ? index + 1 : 0);
            }
            cache[firstgroup] = {
                nextGroup: index,
                charge: charge,
                prevTotal: prevTotal,
                cycle: i
            };
            ++i;
        }
    }
    console.log("Total earnings : " + total);
}
estimateEarnings(process.argv[2]);
