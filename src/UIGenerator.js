/**
 * Created by Adrian on 05.12.2018.
 */
import $ from 'jquery';
export default class UIGenerator {

    constructor(root, calc) {
        this.calc=calc;

        let calcDiv = $('<div></div>').attr("id","calcDiv");

        let display = $('<input type="text">').attr('id',"display").prop('disabled', true);
        calcDiv.append(display);
        calc.setDisplay(display);

        let btnContainer = $('<div></div>').attr("id","btnContainer");
        let numContainer = $('<div></div>').attr("id","numContainer");
        let opsContainer = $('<div></div>').attr("id","opsContainer");
        
        this.addButton(opsContainer, "=", "Enter", "evaluate", () => (this.calc.evaluate()));

        for (let i=1;i<=9;i++){
            this.addButton(numContainer, i, i, "number", () => (this.calc.addNumToArg(event.key || event.target.value)));
        }

        this.addButton(numContainer, ".", ".", "number", () => (this.calc.addPointToArg()));
        this.addButton(numContainer, "0", "0", "number", () => (this.calc.addNumToArg(event.key || event.target.value)));
        this.addButton(numContainer, "C", "Delete", "number", () => (this.calc.clear()));


        btnContainer.append(numContainer);
        btnContainer.append(opsContainer);
        calcDiv.append(btnContainer);

        $(root).append(calcDiv);
    }

    addOperation(operation){
        let opsContainer=$("#opsContainer");
        this.addButton(opsContainer, operation.symbol, operation.symbol, "operation", () => (this.calc.setOperation(event.key || event.target.value)));
        this.calc.pushOperation(operation);
    }

    addKeyListener(key, button){
        document.addEventListener('keydown', function(event) {
            if (event.key == key) {
                button.click();
            }
        });
    }

    addButton(container, val, key, className, callback){
        let btn = $('<input type="button" value="'+val+'">').addClass(className).on('click', callback);
        this.addKeyListener(key, btn);
        container.append(btn);
    }

}