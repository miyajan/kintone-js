import Connection from "../connection";
import AppConverter from "../converter/app";
import AppInfoConverter from "../converter/app-info";
import App from "../model/app";
import AppInfo from "../model/app-info";
import Parameters from "../parameters";
import AppResponse from "../response/app";
import AppInfoResponse from "../response/app-info";
import AppsResponse from "../response/apps";

export default class AppAPI {
    private readonly conn: Connection;
    private readonly appConverter: AppConverter;
    private readonly appInfoConverter: AppInfoConverter;

    constructor(conn: Connection) {
        this.conn = conn;
        this.appConverter = new AppConverter();
        this.appInfoConverter = new AppInfoConverter();
    }

    /**
     * Gets general information of an App, including the name, description, related Space, creator and updater
     * information.
     * Permissions to view the App is needed.
     * API Tokens cannot be used with this API.
     * @see {@link https://developer.kintone.io/hc/en-us/articles/212494888}
     * @param appId The App ID.
     */
    public getApp(appId: number | string): Promise<App> {
        const params = {id: String(appId)};
        return this.conn.requestGet("/k/v1/app.json", params).then((res: AppResponse) => {
            return this.appConverter.fromResponseToModel(res);
        });
    }

    /**
     * Gets general information of multiple Apps, including the name, description, related Space, creator and updater
     * information.
     * Permissions to view the Apps are needed.
     * API Tokens cannot be used with this API.
     * @see {@link https://developer.kintone.io/hc/en-us/articles/115005336727}
     * @param appIds The App IDs.
     * Up to 100 IDs can be specified.
     * @param codes The App Code.
     * Up to 100 App Codes can be specified.
     * Each App Code must be between 1 to 64 characters. An exact match search will be used, and will be case sensitive.
     * @param name The App Name.
     * A partial search will be used, and the search will be case insensitive.
     * The localized name of the App in the user's locale will also be included in the search.
     * @param spaceIds The Space ID of where the App resides in.
     * Up to 100 IDs can be specified.
     * @param limit The number of Apps to retrieve.
     * Must be between 1 and 100.
     * If nothing is specified, it will default to 100.
     * @param offset The number of retrievals that will be skipped.
     * Must be between 0 and 2147483647. If nothing is specified, it will default to 0.
     */
    public getApps(appIds?: number[], codes?: string[], name?: string, spaceIds?: number[], limit?: number,
                   offset?: number): Promise<App[]> {
        const params: Parameters = {};
        if (appIds !== undefined) {
            params.ids = appIds;
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
            const apps: App[] = [];
            res.apps.forEach((app: AppResponse) => {
                apps.push(this.appConverter.fromResponseToModel(app));
            });
            return apps;
        });
    }

    /**
     * Creates a preview App.
     * The {@link https://developer.kintone.io/hc/en-us/articles/115004881348|Deploy App Settings API} must be used on
     * the created preview App for the App to become live.
     * Permission to create Apps in the Default App Group is needed.
     * API Tokens cannot be used with this API.
     * @see {@link https://developer.kintone.io/hc/en-us/articles/115004712547}
     * @param {string} name The App name.
     * The maximum length is 64 characters.
     * @param spaceId The Space ID of where the App will be created.
     * @param threadId The Thread ID of the thread in the Space where the App will be created.
     * @return {Promise<AppInfo>}
     */
    public createPreviewApp(name: string, spaceId?: number, threadId?: number): Promise<AppInfo> {
        const params: Parameters = {
            name: name,
        };
        if (spaceId !== undefined) {
            params.space = spaceId;
        }
        if (threadId !== undefined) {
            params.thread = threadId;
        }
        return this.conn.requestPost("/k/v1/preview/app.json", params).then((res: AppInfoResponse) => {
            return this.appInfoConverter.fromResponseToModel(res);
        });
    }
}
