export class Player {
    id: number;
    score = 0;

    constructor(values) {
        Object.assign(this, values);
    }
}
