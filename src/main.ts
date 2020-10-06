
import * as fs from 'fs';
import { RollerCoaster } from "./Classes";

/*
** I need to find another way to read the filename
** The good practice is to read the file line by line
** to not overload the memory
** I know how to do it in C, but i'm not used to in node
** because I use it principaly for web developement
**/

let data = fs.readFileSync(process.argv[2], 'utf8').split('\n');
let inputs: string[] = data[0].split(' ');
const L: bigint = BigInt(inputs[0]);
const C: bigint = BigInt(inputs[1]);
const N: bigint = BigInt(inputs[2]);

let rc: RollerCoaster = new RollerCoaster(L, C, N);

for (let i = 0; i < N; i++) {
	rc.pi[i] = BigInt(data[i + 1]);
	rc.n_people += rc.pi[i];
}

rc.estimateEarnings();
