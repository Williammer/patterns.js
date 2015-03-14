/*
 *	reusable pattern methods implemented in javaScript.
 *	#category# good algorithm, design patterns, etc.
 */

var ptn = (function () {
    //private methods.
    var __throwErr = function (err) {
        throw new Error(err);
    };

    return {
    //public methods.

        //###Design
        //#iterator pattern to iterator through collections.
        iterator: function(collections) {
            if (!collections || !collections.length) {
                __throwErr("invalid inputs.");
                console.log("[ERR] invalid inputs.");
                return;
            }

            var index = 0,
                length = collections.length;

            function next(){
                var item = collections[index++];
                next.hasNext = index<length;
                return item;
            }

            next.hasNext = index<length;

            next.reset = function(){
                index = 0;
                next.hasNext = index<length;
            };

            next.position = function(){
                return index;
            };

            return next;
        },

        //#curry pattern to partially apply certain function.
        curry: function(fn) {
            var that = this,
                fixedArgs = that.asArray(arguments, 1);

            return function(){
                return fn.apply(null, fixedArgs.concat(that.asArray(arguments)));
            };
        },

        //#one even nicer way for curry pattern, no dependence of other self defined functions.
        schonfinkelize: function(fn) {
            var slice = Array.prototype.slice,
                stored_args = slice.call(arguments, 1);

            return function() {
                var new_args = slice.call(arguments),
                    args = stored_args.concat(new_args);
                return fn.apply(null, args);
            };
        }
    };

})();
