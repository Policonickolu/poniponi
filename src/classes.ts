

export class RollerCoaster {
	L: number;
	C: number;
	N: number;
	pi: Array<number>;
	n_people: number;

	constructor(L: number, C: number, N: number) {
		this.L = L;
		this.C = C;
		this.N = N;
		this.pi = new Array<number>(N);
		this.n_people = 0;
	}
}
