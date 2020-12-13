import { Injectable } from '@angular/core';

@Injectable()

export class Utils {
    findValuesIn2DArray(array: Array<Array<string>>, value: string): string[] {
        const foundList = Array<string>();
        for (let x = 0; x < array.length; x++) {
            for (let y = 0; y < array[x].length; y++) {
                if (array[x][y].includes(value)) {
                    foundList.push(array[x][y]);
                }
            }
        }
        return foundList;
    }
}
