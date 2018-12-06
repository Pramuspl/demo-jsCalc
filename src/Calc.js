/**
 * Created by Adrian on 05.12.2018.
 */
const MAX_DIGITS=8;

export default class Calc {

    setDisplay(display){
        this.display=display;
        this.operations=[];
        this.clear();
    }

    clear(){
        this.display.val('');
        this.activeOperation=null;
        this.args={
            arg1: "0",
            arg2: "0"
        };
        this.display.val(this.args.arg1);
    }

    setOperation(symbol){
        this.activeOperation = this.operations.find(function (op) { return op.symbol === symbol; });
        console.log(this.activeOperation);
    }

    addNumToArg(num){
        let argToSet="arg2";
        if (this.activeOperation==null || this.activeOperation=="RESULT"){
            argToSet="arg1";
        }

        if (this.args[argToSet].length>=MAX_DIGITS){
            return;
        }

        if (this.args[argToSet]==="0" || this.activeOperation=="RESULT"){
            this.args[argToSet]=num;
        } else {
            this.args[argToSet]+=num;
        }
        this.display.val(this.args[argToSet]);
    }

    addPointToArg(){
        let argToSet="arg2";
        if (this.activeOperation==null || this.activeOperation=="RESULT"){
            argToSet="arg1";
        }
        if (this.args[argToSet].length>=MAX_DIGITS-1){
            return;
        }
        if (this.activeOperation=="RESULT"){
            this.args[argToSet]='0.';
            this.activeOperation=null;
        } else if (this.args[argToSet].includes('.')){
            return;
        } else {
            this.args[argToSet]+='.';
        }
        this.display.val(this.args[argToSet]);
    }

    pushOperation(operation){
        this.operations.push(operation);
    }

    evaluate(){
        if (this.args.arg2!=="0"){
            let result = this.activeOperation.method(Number(this.args.arg1), Number(this.args.arg2));
            this.args.arg1=String(result);
            this.args.arg2="0";
            this.activeOperation="RESULT";
            this.display.val(result);
        }
    }
}