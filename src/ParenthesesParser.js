let Stack = require('./Stack');
let print = console.log;

function ParenthesesParser(expression) {

    this._parentheseDefinition = {
        '(' : ')', 
        '{' : '}', 
        '[' : ']',
    };
    this.parse = function(expression) {

        if(!expression)
            throw new Error(ParenthesesParser.EXPRESSION_CANNOT_BE_NULL_OR_UNDEFINED);

        let stack = new Stack();

        for(let i = 0; i < expression.length; i++) {
            let c = expression.charAt(i);
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
        // if stack is empty the expression is valid else we have an invalid expression
        // with a missing closing parenthese like this '(ok'
        const passed = stack.isEmpty();
        return this.createResult(passed, passed ? `` : `expected:"${this._parentheseDefinition[stack.pop()]}" at end of expression`);
    }
    this.createResult = function (passed, errorMsg) {
        return {
            Expression   : this._expression,
            Passed       : passed,
            ErrorMessage : ParenthesesParser.PARSING_ERROR + " " + errorMsg
        };
    }
    this.isOpenParenthese = function(c) {

        return c in this._parentheseDefinition;
    }
    this.isCloseParenthese = function(c) {
        
        return Object.values(this._parentheseDefinition).indexOf(c) !== -1;
    }
};

ParenthesesParser.EXPRESSION_CANNOT_BE_NULL_OR_UNDEFINED = "expression cannot be null or undefined";
ParenthesesParser.PARSING_ERROR                          = "Parsing Error";

module.exports = ParenthesesParser;
