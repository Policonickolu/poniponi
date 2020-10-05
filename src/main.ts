
import * as fs from 'fs';
import { RollerCoaster } from "./Classes";
import { GroupCache } from "./Interfaces";

/**
 *  readInput
 *
 *  read data input from stdin, create and return an object RollerCoaster
**/
function readInput(filename: string): RollerCoaster {

	let data = fs.readFileSync(filename, 'utf8').split('\n');
	let inputs: string[] = data[0].split(' ');
	const L: number = parseInt(inputs[0]);
	const C: number = parseInt(inputs[1]);
	const N: number = parseInt(inputs[2]);
	let rc: RollerCoaster = new RollerCoaster(L, C, N);
	for (let i = 0; i < N; i++) {
		rc.pi[i] = parseInt(data[i + 1]);
		rc.n_people += rc.pi[i];
	}
	return rc;
}

/**
 *  estimateEarnings
 *
 *  compute the earnings of the day given data input
**/
function estimateEarnings(filename: string) {

	// read stdin input
	let rc: RollerCoaster = readInput(filename);
	// declare cache
	let cache: Array<GroupCache> = new Array<GroupCache>(rc.N);
	let loopDetected: boolean = false;
	let index: number = 0;
	let total: number = 0;
	let i: number = 0;
	while (i < rc.C) {

		let firstgroup: number = index;
		// we check if a group as already be first to get the earnings for this ride
		if (cache[firstgroup]) {

			/*
			** we check if there is a loop for a given setting in roller coaster 
			** from the head group to the next time this group is first
			*/
			if (!loopDetected) {
				let n_cycles: number = i - cache[firstgroup].cycle;
				let loopCharge: number = total - cache[firstgroup].prevTotal;
				while (i + n_cycles < rc.C) {
					total += loopCharge;
					i = i + n_cycles;   	
				}
				loopDetected = true;
			}
			// else we just get the train setting for given firstgroup
			else {
				total += cache[firstgroup].charge;
				index = cache[firstgroup].nextGroup;
				++i;
			}
		}
		else {
			let charge: number = 0;
			let prevTotal: number = total;
			while (charge < rc.n_people && charge + rc.pi[index] <= rc.L) {
				charge += rc.pi[index];
				total += rc.pi[index];
				index = (index + 1 < rc.N ? index + 1 : 0);
			}
			// we fill the cache to prevent computing the same setting
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