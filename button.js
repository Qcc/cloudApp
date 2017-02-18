Function.prototype.method = function(name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
}

Number.method("intger", function() {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});

String.method("trim", function() {
    return this.replace(/^\s+|\s+$/g, '');
});

var fibonacci = function(n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

var fibonacci = function() {
    var memo = [0, 1];
    var fib = function(n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
}();

var start = new Date();
for (var i = 0; i <= 40; i += 1) {
    console.log(i + ":" + fibonacci(i) + "\n");
}
var end = new Date();
console.log("总时间：" + end.getSeconds() + "-" + start.getSeconds());