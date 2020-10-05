
import * as fs from 'fs';

console.error("Reading file...");

var data = fs.readFileSync(process.argv[2], 'utf8').split('\n');

var inputs: string[] = data[0].split(' ');

const L: number = parseInt(inputs[0]);
const C: number = parseInt(inputs[1]);
const N: number = parseInt(inputs[2]);
const pi: Array<number> = new Array<number>(N);

let n_people: number = 0;
for (let i = 0; i < N; i++) {
    pi[i] = parseInt(data[i + 1]);
    n_people += pi[i];
}
console.error("capacity : " + L);
console.error("number of run per day : " + C);
console.error("number of groups :" + N);
console.error("number of people :" + n_people);


let index: number = 0;
let cach: Array<[number, number]> = new Array<[number, number]>(N);

console.error("Start computing result...");

let total: number = 0;
let p: number = 0;

for (let i = 0; i < C; i++) {
    let charge: number = 0;
    let firstgroup: number = index;
    if (cach[firstgroup]) {
        //console.error("retrieve from caching...");
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
        //console.log("comput");
    }
    //console.error("current earnings : " + total);
}

console.log("Earnings : " + total);