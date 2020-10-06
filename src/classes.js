"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollerCoaster = void 0;
var RollerCoaster = (function () {
    function RollerCoaster(L, C, N) {
        this.L = L;
        this.C = C;
        this.N = N;
        this.pi = new Array(N);
        this.n_people = BigInt(0);
        this.total = BigInt(0);
    }
    RollerCoaster.prototype.estimateEarnings = function () {
        var cache = new Array(Number(this.N));
        var loopDetected = false;
        var index = 0;
        var i = 0;
        this.total = BigInt(0);
        while (i < this.C) {
            var firstgroup = index;
            if (cache[firstgroup]) {
                if (!loopDetected) {
                    var n_cycles = i - cache[firstgroup].cycle;
                    var loopCharge = this.total - cache[firstgroup].prevTotal;
                    while (i + n_cycles < this.C) {
                        this.total += loopCharge;
                        i = i + n_cycles;
                    }
                    loopDetected = true;
                }
                else {
                    this.total += cache[firstgroup].charge;
                    index = cache[firstgroup].nextGroup;
                    ++i;
                }
            }
            else {
                var charge = BigInt(0);
                var prevTotal = this.total;
                while (charge < this.n_people && charge + this.pi[index] <= this.L) {
                    charge += this.pi[index];
                    this.total += this.pi[index];
                    index = (index + 1 < this.N ? index + 1 : 0);
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
        console.log("Total earnings : " + this.total);
    };
    return RollerCoaster;
}());
exports.RollerCoaster = RollerCoaster;
