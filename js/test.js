var book = {};
Object.defineProperties(book, {
    _year: { value: 2004 },
    age: { value: 20 },
    name: {
        get: function() {
            return this._name;
        },
        set: function(value) {
            this._name = value;
        }
    }
});
console.log("runing..");