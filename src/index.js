/**
 * Created by Adrian on 05.12.2018.
 */
import Operation from './Operation.js';
import UIGenerator from './UIGenerator.js';
import Calc from './Calc.js';

window.onload = function(){
    let calc = new Calc();
    let generator = new UIGenerator("#root", calc);

    // Each operation insertion spread into two lines for clarity
    let add = new Operation("+",(a,b) => a+b);
    generator.addOperation(add);

    let multiply = new Operation("*",(a,b) => a*b);
    generator.addOperation(multiply);

    let subtract = new Operation("-",(a,b) => a-b);
    generator.addOperation(subtract);

    let divide = new Operation("/",(a,b) => a/b);
    generator.addOperation(divide);

    // let power = new Operation("x^y",(a,b) => a**b);
    // generator.addOperation(power);


};

