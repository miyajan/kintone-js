import assert = require("assert");
import KintonePathResolver from "../../src/kintone-path-resolver";

describe("KintonePathResolver", function() {
    describe("resolve", function() {
        it("should resolve kintone api path", function() {
            assert(KintonePathResolver.resolve("/v1/app.json") === "/k/v1/app.json");
            assert(KintonePathResolver.resolve("/v1/app.json", {guestSpaceId: "1"})
                === "/k/guest/1/v1/app.json");
        });
    });
});
