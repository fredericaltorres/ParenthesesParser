// A simple stack
function Stack() {

    this._stack = [];

    this.push = function(v) {
        this._stack.push(v);
    }
    this.pop = function() {
        return this._stack.pop();
    }
    this.peek = function() {
        return this._stack[this._stack.length-1];
    }
    this.isEmpty = function() {
        return this._stack.length === 0;
    }
}

module.exports = Stack;
