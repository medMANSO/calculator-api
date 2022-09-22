const logger = require('../config/logger')

 // the hard way
const mulDiv = /([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*([*/])\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)/;
const plusMin = /([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*([+-])\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)/;
const parentheses = /(\d)?\s*\(([^()]*)\)\s*/;

const parenthesesPrio = (eq) => {
    while (eq.search(parentheses) !== -1) {

        eq = eq.replace(parentheses, (a, b, c) => {
          c =   multiplyAndDivide(c);
          c =   addAndSubstract(c);
          return c;
        });
      }
      eq =  multiplyAndDivide(eq);
      eq =  addAndSubstract(eq);
      return eq;
}

const multiplyAndDivide = (eq) => {
    while (eq.search(mulDiv) !== -1) {
        eq = eq.replace(mulDiv, (a) => {
          const sides = mulDiv.exec(a);
          const result = sides[2] === '*' ? sides[1] * sides[3] : sides[1] / sides[3];
          return result >= 0 ? '+' + result : result;
        });
      }
      return eq;
}
const addAndSubstract = (eq) => {
    eq = eq.replace(/([+-])([+-])(\d|\.)/g, (a, b, c, d) => { return (b === c ? '+' : '-') + d; });
    while (eq.search(plusMin) !== -1) {
      eq = eq.replace(plusMin, (a) => {
        const sides = plusMin.exec(a);
        return sides[2] === '+' ? +sides[1] + +sides[3] : sides[1] - sides[3];
      });
      
    }
    return eq;
}


module.exports = (query) => {
    try {
        // the easier way
        //result =  eval(query)

        const calculationResult =  parenthesesPrio(query)

        if(calculationResult.includes('Infinity')) return { status: 'error', message:'AHA ! A parentheses operation lead to a division by Zero !'} 

        const result =  Number(parseFloat(calculationResult).toFixed(3))

        return result ? { status: 'success', result: result } : { status: 'error', message: 'A calculation error has occured !' }
    } catch (error) {
        logger.error('something went wrong !', error)
        return { status: 'error', "message": "An error has occured !" }
    }
}