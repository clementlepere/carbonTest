import { readFileSync } from 'fs';
import { IFileReader } from '../interfaces/IFileReader';

export class FileReader implements IFileReader {
  private readonly filePath: string;
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
  }

  getRegionString(): string[] {
    const regionString = Array<string>();
    this.fileString.forEach((line) => {
      if (!line.includes('C')) {
        regionString.push(line);
      }
    });
    return regionString;
  }

  getInstructionsString(): string[] {
    const instructionString: string[] = [];
    this.fileString.forEach((line) => {
      if (line.includes('C')) {
        instructionString.push(line);
      }
    });
    return instructionString;
  }
}
