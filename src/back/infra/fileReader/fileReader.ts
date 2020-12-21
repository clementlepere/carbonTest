import { readFileSync } from 'fs';
import { IFileReader } from '../interfaces/IFileReader';

export class FileReader implements IFileReader {
    private readonly filePath: string;
    // probably more a string array but it's just demo
    private fileString: string[];

    constructor(filePath: string) {
        this.filePath = filePath;
        this.fileString = this.readFile(filePath);
    }

    readFile(filePath: string): string[] {
        const parsedFileText = Array<string>();
        const file = readFileSync(filePath, 'utf-8');
        Object.assign(parsedFileText, file.split('\n'));
        return parsedFileText;
    };

    getMapString(): string[] {
        const mapString = Array<string>();
        this.fileString.forEach(line => {
            if (!line.includes('C')) {
                mapString.push(line);
            }
        })
        return mapString;
    };

    getInstructionsString(): string[] {
        const instructionString = new Array<string>();
        this.fileString.forEach(line => {
            if (line.includes('C')) {
                instructionString.push(line);
            }
        })
        return instructionString;
    };
}
