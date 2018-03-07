let Stack = require('./Stack');
let print = console.log;

function ParenthesesParser(expression) {

    this._result = null;
    this._parentheseDefinition = {
        '(' : ')', 
        '{' : '}', 
        '[' : ']',
    };
    this.parse = function(expression) {

        if(expression === null || expression === undefined)
            throw new Error(ParenthesesParser.EXPRESSION_CANNOT_BE_NULL_OR_UNDEFINED);

        let errorMsg        = "";            
        let passed          = false;
        let stack           = new Stack();
        this._expression    = expression;

        for(let i = 0; i < this._expression.length; i++) {
            let c = this._expression.charAt(i);
            if(this.isOpenParenthese(c)) {
                stack.push(c);
            }
            else {
                if(this.isCloseParenthese(c)) {
                    let p = stack.pop();
                    if(c !== this._parentheseDefinition[p]) // Fail
                        return this.createResult(false, `position:${i}, expected:${this._parentheseDefinition[p]}, found:${c}`);
                }
            }
        }
        return this.createResult(stack.isEmpty()); // Parse expression with success
    }
    this.createResult = function (passed, errorMsg) {
        this._result = {
            Expression   : this._expression,
            Passed       : passed,
            ErrorMessage : ParenthesesParser.PARSING_ERROR + " " + errorMsg
        };
        return this._result;
    }
    this.isOpenParenthese = function(c) {

        return c in this._parentheseDefinition;
    }
    this.isCloseParenthese = function(c) {
        
        return Object.values(this._parentheseDefinition).indexOf(c) !== -1;
    }
};

ParenthesesParser.EXPRESSION_CANNOT_BE_NULL_OR_UNDEFINED = "expression cannot be null or undefined";
ParenthesesParser.PARSING_ERROR = "Parsing Error";

module.exports = ParenthesesParser;
