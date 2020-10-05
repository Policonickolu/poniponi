
import * as fs from 'fs';

var data: fs.readFileSync(process.argv[1], 'utf8');

var inputs: string = data[0].split(' ');

const L: number = parseInt(inputs[0]);
const C: number = parseInt(inputs[1]);
const N: number = parseInt(inputs[2]);

const pi: Array<number> = new Array<number>(N);
let n_people: number = 0;

for (let i = 0; i < N; i++) {
	let l = await it.next();
	pi[i] = parseInt(l);
    n_people += pi[i];
}

let index: number = 0;
let cach: Array<[number, number]> = new Array<[number, number]>(N);
let total: number = 0;

for (let i = 0; i < C; i++) {
    let charge: number = 0;
    let firstgroup: number = index;
    
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
    }
}

console.log(total);
