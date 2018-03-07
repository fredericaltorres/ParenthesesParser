let assert = require('chai').assert;
let expect = require('chai').expect;
let ParenthesesParser = require('../src/ParenthesesParser');
let print = console.log;

describe('ParenthesesParser', () => {

    let subject;

    before(() => {
        subject = new ParenthesesParser();
    });
    
    describe('Valid expressions', () => {

        let validExpressions = [
            "()" ,"(a)", "((((()))))", 
            "((((([[[]]])))))",  "((((([[[{{{}}}]]])))))",  "((((([[[{{{a}}}]]])))))", 
            "function(abs(compute(run(exec(array[list[array[object{object{object[1]}}]]])))))", 
            "(){}[]" , "(()){{}}[[]]" ,
            "([ok])" ,
            "{([ok])}" ,
            "function() { return (1+1); }" ,
            "<(>)", // This one passed because '<' and '>' are not considered Parentheses
            "(\\)", "(\\//)", "(\")",
            "Valid-Expression", "(Valid-Expression)"
        ];
        it(`should return passed on expression '${validExpressions}'`, () => {

            validExpressions.forEach((exp) =>{
                expect(subject.parse(exp).Passed).to.be.true;
            });
        });
    });

    describe('Invalid expressions', () => {
       
        let invalidExpressions = [
            "(invalid-expression", "invalid-expression)",
            "(" , "((((())))", , "(((((])))))", 
            "[", "{",
            "(){[]" ,
            "([ok)" ,
            "{([ok]}" ,
            "function() { return (1+1; }" ,
        ];
        it(`should return failed on expression '${invalidExpressions}'`, () => {

            invalidExpressions.forEach((exp) =>{
                expect(subject.parse(exp).Passed).to.be.false;
            });
        });
        it(`should return failure details`, () => {

            let exp = "[(a])";
            let expected = "Parsing Error position:3, expected:), found:]";
            let result = subject.parse(exp);
            expect(result.ErrorMessage).to.equal(expected);
            expect(result.ErrorMessage.startsWith(ParenthesesParser.PARSING_ERROR)).to.be.true;
        });
        it(`should return failure details on complex expression`, () => {

            let exp = "((((([[[{{{a)}}}]]])))))";
            let expected = "Parsing Error position:12, expected:}, found:)";
            let result = subject.parse(exp);
            expect(result.ErrorMessage).to.equal(expected);
        });
    });

    describe('Invalid parameters', () => {

        it(`should throw exception on empty string`, () => {
            expect(function () { subject.parse("");}).to.throw(ParenthesesParser.EXPRESSION_CANNOT_BE_NULL_OR_UNDEFINED);
        });
        it(`should throw exception on null string`, () => {
            expect(function () { subject.parse(null);}).to.throw(ParenthesesParser.EXPRESSION_CANNOT_BE_NULL_OR_UNDEFINED);
        });
        it(`should throw exception on undefined string`, () => {
            expect(function () { subject.parse(undefined);}).to.throw(ParenthesesParser.EXPRESSION_CANNOT_BE_NULL_OR_UNDEFINED);
        });
    });

    describe('Utility methods', () => {

        it(`isOpenParenthese() positive cases`, () => {
            ['(', "{", "["].forEach((c) => {
                expect(subject.isOpenParenthese(c)).to.be.true;
            });
        });
        it(`isOpenParenthese() negative cases`, () => {
            ['a', "b", "c"].forEach((c) => {
                expect(subject.isOpenParenthese(c)).to.be.false;
            });
        });
        it(`isCloseParenthese() positive cases`, () => {
            [')', "}", "]"].forEach((c) => {
                expect(subject.isCloseParenthese(c)).to.be.true;
            });
        });
        it(`isCloseParenthese() negative cases`, () => {
            ['a', "b", "c"].forEach((c) => {
                expect(subject.isCloseParenthese(c)).to.be.false;
            });
        });
    });
});
