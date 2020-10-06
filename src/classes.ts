
import { GroupCache } from "./Interfaces";

export class RollerCoaster {
	L: number;
	C: number;
	N: number;
	pi: Array<number>;
	n_people: number;
	total: number;

	constructor(L: number, C: number, N: number) {
		this.L = L;
		this.C = C;
		this.N = N;
		this.pi = new Array<number>(N);
		this.n_people = 0;
		this.total = 0;
	}

	/**
	 *  estimateEarnings
	 *
	 *  compute the earnings of the day given data input
	**/
	estimateEarnings() {

		// declare cache
		let cache: Array<GroupCache> = new Array<GroupCache>(this.N);
		let loopDetected: boolean = false;
		let index: number = 0;
		let i: number = 0;
		this.total = 0;
		while (i < this.C) {

			let firstgroup: number = index;
			// we check if a group as already be first to get the earnings for this ride
			if (cache[firstgroup]) {

				/*
				** we check if there is a loop for a given setting in roller coaster 
				** from the head group to the next time this group is first
				*/
				if (!loopDetected) {
					let n_cycles: number = i - cache[firstgroup].cycle;
					let loopCharge: number = this.total - cache[firstgroup].prevTotal;
					while (i + n_cycles < this.C) {
						this.total += loopCharge;
						i = i + n_cycles;   	
					}
					loopDetected = true;
				}
				// else we just get the train setting for given firstgroup
				else {
					this.total += cache[firstgroup].charge;
					index = cache[firstgroup].nextGroup;
					++i;
				}
			}
			else {
				let charge: number = 0;
				let prevTotal: number = this.total;
				while (charge < this.n_people && charge + this.pi[index] <= this.L) {
					charge += this.pi[index];
					this.total += this.pi[index];
					index = (index + 1 < this.N ? index + 1 : 0);
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
		console.log("Total earnings : " + this.total);
	}
}
