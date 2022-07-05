import { createReadStream, readFileSync } from 'fs';

export class UtilsService {

    constructor(){
        
    }
  getCliHelp() {
    const help = readFileSync('./help.txt', 'utf-8');
    return help;
  }
  groupBy = (array: any[], key: string) => {
    // Return the end result
    return array.reduce((result, currentValue: []) => {
      // This is how the above code in multiple line
      if (!result[currentValue[key]]) {
        result[currentValue[key]] = [];
      }
      result[currentValue[key]].push(currentValue);
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };

  isSymbol(input:string){

  }
  isDate(input: string): Date | undefined {
    const isNumber = !isNaN(Number(input));
    if (isNumber) {
      const numLenght = input.length;
      if (numLenght == 10) {
        // time in sec
        const check = this.checkDateUsingNumber(Number(input) * 1000);
        return new Date(Number(input) * 1000);
      } else if (numLenght == 13) {
        // time in milsec
        const check = this.checkDateUsingNumber(Number(input));
        return new Date(Number(input));
      } else {
        console.log('Wrong Input');
        return undefined;
      }
    }

    let x = new Date(input);

    if (x instanceof Date && !isNaN(x.getTime())) {
      return x;
    }

    return undefined;
  }

  checkDateUsingNumber(input: number) {
    let x = new Date(input);

    if (x instanceof Date && !isNaN(x.getTime())) {
      return true;
    }
    return false;
  }
}
