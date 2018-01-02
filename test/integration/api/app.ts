import assert = require("assert");
import App from "../../../src/api/app";
import BasicAuth from "../../../src/auth/basic-auth";
import PasswordAuth from "../../../src/auth/password-auth";
import Connection from "../../../src/connection";

describe("App", function() {
    let sut: App;

    beforeEach(function() {
        const baseUrl = process.env.BASE_URL || "";
        const kintoneUsername = process.env.KINTONE_USERNAME || "";
        const kintonePassword = process.env.KINTONE_PASSWORD || "";
        const passwordAuth = new PasswordAuth(kintoneUsername, kintonePassword);
        const basicUsername = process.env.BASIC_USERNAME || "";
        const basicPassword = process.env.BASIC_PASSWORD || "";
        const basicAuth = new BasicAuth(basicUsername, basicPassword);
        const setting = {
            baseUrl: baseUrl,
            userAuth: passwordAuth,
            basicAuth: basicAuth,
        };
        const conn = new Connection(setting);
        sut = new App(conn);
    });

    describe("getApp", function() {
        it("should get app", function() {
            return sut.getApp(2).then((app) => {
                assert(app.appId === "2");
                assert(app.code === "");
                assert(app.name === "問い合わせ管理");
                assert(app.description === "<div><div>問い合わせ管理アプリです。</div></div>");
                assert(app.spaceId === null);
                assert(app.threadId === null);
                assert(app.createdAt.getTime() === new Date("2017-12-27T14:36:08.000Z").getTime());
                assert.deepEqual(app.creator, {
                    code: "user1",
                    name: "user1",
                });
                assert(app.modifiedAt.getTime() === new Date("2017-12-30T16:21:30.000Z").getTime());
                assert.deepEqual(app.modifier, {
                    code: "user1",
                    name: "user1",
                });
            });
        });
    });

    describe("getApps", function() {
        it("should get apps", function() {
            return sut.getApps([2]).then((apps) => {
                const app = apps[0];
                assert(app.appId === "2");
                assert(app.code === "");
                assert(app.name === "問い合わせ管理");
                assert(app.description === "<div><div>問い合わせ管理アプリです。</div></div>");
                assert(app.spaceId === null);
                assert(app.threadId === null);
                assert(app.createdAt.getTime() === new Date("2017-12-27T14:36:08.000Z").getTime());
                assert.deepEqual(app.creator, {
                    code: "user1",
                    name: "user1",
                });
                assert(app.modifiedAt.getTime() === new Date("2017-12-30T16:21:30.000Z").getTime());
                assert.deepEqual(app.modifier, {
                    code: "user1",
                    name: "user1",
                });
            });
        });
    });
});
