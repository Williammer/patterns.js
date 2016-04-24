/*
 *	common useful methods implemented in javaScript.
 */

var common = (function () {
    //private methods.
    var __rand = function () {
        return Math.random();
    };

    var __throwErr = function (err) {
        throw new Error(err);
    };

    return {
    //public methods.

        //###MATH# 
        //add any numbers together. #solid[***]
        add: function() {
            if(arguments.length <= 0){
                __throwErr("at least need 1 input value!");
                return;
            }

            var res = 0;
            for(var i = 0; i < arguments.length; i++){// -------> should consider no argument condition.
                res = parseInt(res) + parseInt(arguments[i]);
            }
            return res;
        },

        randomElement: function(array) {
            if (array.length === 0)
                __throwErr("The array is empty.");
            
            return array[Math.floor(__rand() * array.length)];
        },

        //###classic methods# 
        //#iterate array or array-like object(including string) for the invocation of callback;
        forEach: function(arr, callback){	//---------------------> #add context, border-check
            for(var i = 0; i < arr.length; i++){
                callback(arr[i]);
            }
        },

        //#iterate and return result of each array member.
        map: function(arr, callback) {
            var res = [],
                that = this;
            that.forEach(arr, function(el){
                res.push(callback(el));
            });

            return res;
        },

        //#prepare the function to certain object, can call it in the next invocation.
        bind: function(func, object) {
            return function(){
                return func.apply(object, arguments);
            };
        },

        //# an alternative of bind() for object-method circumstance.
        method: function(object, name) {
            return function() {
                object[name].apply(object, arguments);
            };
        },

        //#iterate the property of an object to certain action.
        forEachIn: function(object, action) {	//iterate object property
            for (var property in object) {
                if (object.hasOwnProperty(property))
                action(property, object[property]);
            }
        },

        //#encapsulate the array-like object, including string, with real array.
        asArray: function(quasiArray, start) {
            var result = [];
            for (var i = (start || 0); i < quasiArray.length; i++){
                result.push(quasiArray[i]);
            }

            return result;
        },

        //#clone a new object.
        clone: function(object) {
            function OneShotConstructor(){};
            OneShotConstructor.prototype = object;

            return new OneShotConstructor();
        }

        //###Event	 
        //Event #1 registerEvent
        registerEventHandler: function(node, event, handler) {
            if (typeof node.addEventListener == "function"){
                node.addEventListener(event, handler, false);	//browser concern #1
            } else { 
                node.attachEvent("on" + event, handler);
            }
        },

        unregisterEventHandler: function(node, event, handler) {
            if (typeof node.removeEventListener == "function"){
                node.removeEventListener(event, handler, false);
            } else {
                node.detachEvent("on" + event, handler);
            }
        },

        //Event #2 event object eg. function(event){}
        normalizeEvent: function(event) {
            var that = this;
            if (!event.stopPropagation) {
                event.stopPropagation = function() {that.cancelBubble = true;};
                event.preventDefault = function() {that.returnValue = false;};
            }
            if (!event.stop){
                event.stop = function() {
                    that.stopPropagation();
                    that.preventDefault();
                };
            }
            if (event.srcElement && !event.target){
                event.target = event.srcElement;
            }
            if ((event.toElement || event.fromElement) && !event.relatedTarget){
                event.relatedTarget = event.toElement || event.fromElement;
            }
            if (event.clientX != undefined && event.pageX == undefined) {
                event.pageX = event.clientX + document.body.scrollLeft;
                event.pageY = event.clientY + document.body.scrollTop;
            }
            if (event.type == "keypress"){
                event.character = String.fromCharCode(event.charCode || event.keyCode);
            }

            return event;
        },

        //Event #3 combines #1 and #2
        addHandler: function(node, type, handler) {
            var that = this;
            function wrapHandler(event) {
                handler(that.normalizeEvent(event || window.event));	//browser concern #2
            }
            that.registerEventHandler(node, type, wrapHandler);

            return {node: node, type: type, handler: wrapHandler};
        },

        removeHandler: function(object) {
            var that = this;
            that.unregisterEventHandler(object.node, object.type, object.handler);
        },

        //###DOM 	
        //#create dom element with javascript, nested dom element supported.
        dom: function(name, attributes /*, children...*/) {
            var node = document.createElement(name),
                that = this;
            if (attributes) {
                that.forEachIn(attributes, function(name, value) {
                    node.setAttribute(name, value);
                });
            }
            for (var i = 2; i < arguments.length; i++) {	// for deep dom creation
                var child = arguments[i];
                if (typeof child == "string")
                    child = document.createTextNode(child);
                node.appendChild(child);
            }

            return node;
        }
    };
})();
