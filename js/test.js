var book = {};
Object.defineProperties(book, {
    _year: { value: 2004 },
    edition: { value: 1 },
    year: {
        get: function() {
            return this._year;
        },
        set: function(value) {
            if (value > 2004) {
                this._year = value;
                this.edition += value - 2004;
            }
        }
    }
});
var descriptor = Object.getOwnPropertyDescriptor(book, "_year");
console.log(descriptor.value);
console.log(descriptor.configurable);
console.log(typeof descriptor.get);
console.log("-----------runing..--------");
var descriptor = Object.getOwnPropertyDescriptor(book, "year");
console.log(descriptor.value);
console.log(descriptor.configurable);
console.log(typeof descriptor.get);