import { expect } from "chai";

describe("builtin.Object", function () {
    describe("#freeze()", function () {
        it("should throw a TypeError if trying to assign a readonly property", function () {
            var object = { a: 1, b: 2 };
            Object.freeze(object);

            var assign = () => { object.a = 4;};
            expect(assign).to.throw(TypeError);
        });
    });
});
