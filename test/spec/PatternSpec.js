// #DESIGN PATTERNS
describe('Pattern methods tests', function () {
    
    describe('Iterator pattern tests', function () {
        var collection = [1,2,3,5,6,7,8,4], // better way to mock?
            string = "abcefghd",
            lengthArr = collection.length,
            lengthStr = string.length;

        it('should throw exception if invalid input is provided', function () {
            expect(function(){
                ptn.iterator();
            }).toThrowError("invalid inputs.");

            var primInput = {a:"a", b:"b"};
            expect(function(){
                ptn.iterator(primInput);
            }).toThrowError("invalid inputs.");
        });

        it('should start with 1st element of collection', function () {
            var firstElementPosition = ptn.iterator(collection).position();//array
            expect(firstElementPosition).toBe(0);

            firstElementPosition = ptn.iterator(string).position();//string
            expect(firstElementPosition).toBe(0);
        });

        it('should track the current position of collection element: iterator(input).position()', function () {
            var iter = ptn.iterator(collection),
            iterStr  = ptn.iterator(string);

            for (var i = 0; i < lengthArr; i++) {
                expect(iter.position()).toEqual(i);
                iter();
                expect(iter.position()).toEqual(i+1);
            };

            // string input
            for (var i = 0; i < lengthStr; i++) {
                expect(iterStr.position()).toEqual(i);
                iterStr();
                expect(iterStr.position()).toEqual(i+1);
            };
        });

        it('should be able to return next element of collection: iterator(input)()', function () {
            var iter = ptn.iterator(collection),
                iterStr  = ptn.iterator(string),
                elementStr = iterStr(),
                element = iter();

            expect(element).toBe(collection[0]);
            element = iter();
            expect(element).toBe(collection[1]);

            // string input
            expect(elementStr).toBe(string[0]);
            elementStr = iterStr();
            expect(elementStr).toBe(string[1]);
        });

        it('should be able to reset the iterator: iterator(input).reset()', function () {
            var iter = ptn.iterator(collection),
                element = iter(),
                iterStr  = ptn.iterator(string),
                elementStr = iterStr();

            expect(element).toBe(collection[0]);
            element = iter();
            expect(element).toBe(collection[1]);

            iter.reset();

            element = iter();
            expect(element).toBe(collection[0]);

            // string input
            expect(elementStr).toBe(string[0]);
            elementStr = iterStr();
            expect(elementStr).toBe(string[1]);

            iterStr.reset();

            elementStr = iterStr();
            expect(elementStr).toBe(string[0]);
        });

        it('should return when reaches collection end: iterator(input).hasNext', function () {
            var iter = ptn.iterator(collection),
                iterStr = ptn.iterator(string);

            for (var i = 0; i < lengthArr-1; i++) {
                iter();
                expect(iter.hasNext).toBe(true);
            }
            // last element iterate.
            iter();
            expect(iter.hasNext).toBe(false);

            // string input
            for (var i = 0; i < lengthStr-1; i++) {
                iterStr();
                expect(iterStr.hasNext).toBe(true);
            }
            // last element iterate.
            iterStr();
            expect(iterStr.hasNext).toBe(false);
        });
       
    });

    /*describe('Add tests', function () {
        it('should add multiple numbers', function () {

        });
    });*/
});