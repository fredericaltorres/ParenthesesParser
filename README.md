# ParenthesesParser

Given a string containing the characters '(', ')', '{', '}', '[' and ']'
and any other characters in between determine if the parentheses are balanced.

## Valid Expression
 - "()" 
 - "(){}[]" 
 - "([ok])"
 - "{([ok])}" 
 - "function() { return (1+1); }" 
 ## Invalid Expression
 
 - "(]"
 - "([)]"
 - "([ok]})"
 - "{([ok])})" 


 ## Unit tests ouput

```
 ParenthesesParser
    Valid expressions
      √ should return passed on expression '(),(a),((((())))),((((([[[]]]))))),((((([[[{{{}}}]]]))))),((((([[[{{{a}}}]]]))))),function(abs(compute(run(exec(array[list[array[object{object{object[1]}}]]]))))),(){}[],(()){{}}[[]],([ok]),{([ok])},function() { return (1+1); },<(>),(\),(\//),("),Valid-Expression,(Valid-Expression)'
    Invalid expressions
      √ should return failed on expression '(invalid-expression,invalid-expression),(,((((()))),,(((((]))))),[,{,(){[],([ok),{([ok]},function() { return (1+1; }'
      √ should return specific error message on failure
      √ should return specific error message on failure, complex expression
    Invalid expressions, missing closing parenthese
      √ should return specific error message on failure on '(ok'
      √ should return error message on failure (ok,{ok,[ok
    Invalid parameters
      √ should throw exception on empty string
      √ should throw exception on null string
      √ should throw exception on undefined string
    Utility methods
      √ isOpenParenthese() positive cases
      √ isOpenParenthese() negative cases
      √ isCloseParenthese() positive cases
      √ isCloseParenthese() negative cases


  13 passing (19ms)
```  