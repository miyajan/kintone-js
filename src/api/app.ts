import Connection from "../connection";
import AppConverter from "../converter/app";
import GetParameters from "../get-parameters";
import AppModel from "../model/app";
import AppResponse from "../response/app";
import AppsResponse from "../response/apps";

export default class App {
    private readonly conn: Connection;
    private readonly appConverter: AppConverter;

    constructor(conn: Connection) {
        this.conn = conn;
        this.appConverter = new AppConverter();
    }

    /**
     * Gets general information of an App, including the name, description, related Space, creator and updater
     * information.
     * API Tokens cannot be used with this API.
     * @see {@link https://developer.kintone.io/hc/en-us/articles/212494888}
     */
    public getApp(appId: number | string): Promise<AppModel> {
        const params = {id: String(appId)};
        return this.conn.requestGet("/k/v1/app.json", params).then((res: AppResponse) => {
            return this.appConverter.fromResponseToModel(res);
        });
    }

    /**
     * Gets general information of multiple Apps, including the name, description, related Space, creator and updater
     * information.
     * @see {@link https://developer.kintone.io/hc/en-us/articles/115005336727}
     */
    public getApps(ids?: number[], codes?: string[], name?: string, spaceIds?: number[], limit?: number,
                   offset?: number): Promise<AppModel[]> {
        const params: GetParameters = {};
        if (ids !== undefined) {
            params.ids = ids;
        }
        if (codes !== undefined) {
            params.codes = codes;
        }
        if (name !== undefined) {
            params.name = name;
        }
        if (spaceIds !== undefined) {
            params.spaceIds = spaceIds;
        }
        if (limit !== undefined) {
            params.limit = limit;
        }
        if (offset !== undefined) {
            params.offset = offset;
        }
        return this.conn.requestGet("/k/v1/apps.json", params).then((res: AppsResponse) => {
            const apps: AppModel[] = [];
            res.apps.forEach((app: AppResponse) => {
                apps.push(this.appConverter.fromResponseToModel(app));
            });
            return apps;
        });
    }
}
