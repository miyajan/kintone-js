import Connection from "../connection";
import AppConverter from "../converter/app";
import AppModel from "../model/app";
import AppResponse from "../response/app";

import URLSearchParams = require("url-search-params");

export default class App {
    private readonly conn: Connection;
    private readonly appConverter: AppConverter;

    constructor(conn: Connection) {
        this.conn = conn;
        this.appConverter = new AppConverter();
    }

    public getApp(appId: number | string): Promise<AppModel> {
        const params = new URLSearchParams();
        params.set("id", String(appId));
        return this.conn.requestGet("/k/v1/app.json?" + params.toString()).then((res: AppResponse) => {
            return this.appConverter.fromResponseToModel(res);
        });
    }
}
