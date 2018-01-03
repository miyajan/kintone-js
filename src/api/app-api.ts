import Connection from "../connection";
import AppConverter from "../converter/app";
import AppDeployStatusConverter from "../converter/app-deploy-status";
import AppInfoConverter from "../converter/app-info";
import GuestContext from "../guest-context";
import KintonePathResolver from "../kintone-path-resolver";
import App from "../model/app";
import AppDeployStatus from "../model/app-deploy-status";
import AppInfo from "../model/app-info";
import DeployStatus from "../model/deploy-status";
import Parameters from "../parameters";
import AppInfoRequest from "../request/app-info-request";
import AppResponse from "../response/app";
import AppDeployStatuses from "../response/app-deploy-statuses";
import AppInfoResponse from "../response/app-info";
import AppsResponse from "../response/apps";

export default class AppAPI {
    private readonly conn: Connection;
    private readonly appConverter: AppConverter;
    private readonly appDeployStatusConverter: AppDeployStatusConverter;
    private readonly appInfoConverter: AppInfoConverter;
    private guestContext: GuestContext;

    constructor(conn: Connection) {
        this.conn = conn;
        this.appConverter = new AppConverter();
        this.appDeployStatusConverter = new AppDeployStatusConverter();
        this.appInfoConverter = new AppInfoConverter();
    }

    public setGuestContext(context: GuestContext) {
        this.guestContext = context;
    }

    /**
     * Gets general information of an App, including the name, description, related Space, creator and updater
     * information.
     *
     * Permissions to view the App is needed.
     * API Tokens cannot be used with this API.
     *
     * @see {@link https://developer.kintone.io/hc/en-us/articles/212494888}
     *
     * @param appId The App ID.
     */
    public getApp(appId: number | string): Promise<App> {
        const path = KintonePathResolver.resolve("/v1/app.json", this.guestContext);
        const params = {id: String(appId)};
        return this.conn.requestGet(path, params).then((res: AppResponse) => {
            return this.appConverter.fromResponseToModel(res);
        });
    }

    /**
     * Gets general information of multiple Apps, including the name, description, related Space, creator and updater
     * information.
     *
     * Permissions to view the Apps are needed.
     * API Tokens cannot be used with this API.
     *
     * @see {@link https://developer.kintone.io/hc/en-us/articles/115005336727}
     *
     * @param appIds The App IDs.
     * Up to 100 IDs can be specified.
     *
     * @param codes The App Code.
     * Up to 100 App Codes can be specified.
     * Each App Code must be between 1 to 64 characters. An exact match search will be used, and will be case sensitive.
     *
     * @param name The App Name.
     * A partial search will be used, and the search will be case insensitive.
     * The localized name of the App in the user's locale will also be included in the search.
     *
     * @param spaceIds The Space ID of where the App resides in.
     * Up to 100 IDs can be specified.
     *
     * @param limit The number of Apps to retrieve.
     * Must be between 1 and 100.
     * If nothing is specified, it will default to 100.
     *
     * @param offset The number of retrievals that will be skipped.
     * Must be between 0 and 2147483647. If nothing is specified, it will default to 0.
     */
    public getApps(appIds?: number[], codes?: string[], name?: string, spaceIds?: number[], limit?: number,
                   offset?: number): Promise<App[]> {
        const path = KintonePathResolver.resolve("/v1/apps.json", this.guestContext);
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
        return this.conn.requestGet(path, params).then((res: AppsResponse) => {
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
     *
     * Permission to create Apps in the Default App Group is needed.
     * API Tokens cannot be used with this API.
     *
     * @see {@link https://developer.kintone.io/hc/en-us/articles/115004712547}
     *
     * @param {string} name The App name.
     * The maximum length is 64 characters.
     *
     * @param spaceId The Space ID of where the App will be created.
     *
     * @param threadId The Thread ID of the thread in the Space where the App will be created.
     */
    public createPreviewApp(name: string, spaceId?: number, threadId?: number): Promise<AppInfo> {
        const path = KintonePathResolver.resolve("/v1/preview/app.json", this.guestContext);
        const params: Parameters = {
            name: name,
        };
        if (spaceId !== undefined) {
            params.space = spaceId;
        }
        if (threadId !== undefined) {
            params.thread = threadId;
        }
        return this.conn.requestPost(path, params).then((res: AppInfoResponse) => {
            return this.appInfoConverter.fromResponseToModel(res);
        });
    }

    /**
     * Updates the settings of a pre-live App to the live App.
     *
     * Using this API is the same as clicking on "Update App" in the kintone App's settings. Changes made to pre-live
     * settings will not be deployed to the live app until this API is used.
     *
     * This API can also be used to revert the pre-live settings back to the current live app settings. This would be
     * the same as clicking on "Discard Changes" in the kintone App's settings.
     *
     * If multiple apps are specified in this API, and one of the updates to an App fails, all of the specified Apps
     * will rollback to the state before this API was run.
     *
     * App Management Permissions are needed.
     * API Tokens cannot be used with this API.
     *
     * @see {@link https://developer.kintone.io/hc/en-us/articles/115004881348}
     *
     * @param apps The App or list of Apps to deploy the pre-live settings to the live Apps. The Maximum limit is 300.
     * If Apps are being deployed to Guest Spaces, Apps can only be deployed to the same Guest Space.
     *
     * @param revert Specify "true" to cancel all changes made to the pre-live settings. The pre-live settings will be
     * reverted back to the current settings of the live app.
     */
    public deployAppSettings(apps: AppInfoRequest | AppInfoRequest[], revert?: boolean): Promise<void> {
        const path = KintonePathResolver.resolve("/v1/preview/app/deploy.json", this.guestContext);
        if (!Array.isArray(apps)) {
            apps = [apps];
        }
        const params: Parameters = {
            apps: apps,
        };
        if (revert !== undefined) {
            params.revert = revert;
        }
        return this.conn.requestPost(path, params).then(() => {
            return Promise.resolve();
        });
    }

    /**
     * Gets the deployment status of the App settings for multiple Apps.
     *
     * App Management Permissions are needed.
     * API Tokens cannot be used with this API.
     *
     * @see {@link https://developer.kintone.io/hc/en-us/articles/115004890947}
     *
     * @param apps The list of App IDs to check the deploy statuses of. The Maximum limit is 300.
     * If Apps in Guest Spaces are specified, all Apps specified in the request must belong to that Guest Space.
     */
    public getAppDeployStatus(apps: Array<number | string>): Promise<AppDeployStatus[]> {
        const path = KintonePathResolver.resolve("/v1/preview/app/deploy.json", this.guestContext);
        const params: Parameters = {
            apps: apps,
        };
        return this.conn.requestGet(path, params).then((res: AppDeployStatuses) => {
            const statuses: AppDeployStatus[] = [];
            res.apps.forEach(app => {
                statuses.push(this.appDeployStatusConverter.fromResponseToModel(app));
            });
            return statuses;
        });
    }

    /**
     * Waits the deploy of Apps finished. Internally call [[getAppDeployStatus]] repeatedly until deploy of all Apps
     * become not PROCESSING.
     *
     * App Management Permissions are needed.
     * API Tokens cannot be used with this.
     *
     * @param {number | string | Array<number | string>} apps The App ID or IDs to wait deploy finished. The Maximum
     * limit is 300.
     * @param {number} intervalMs Interval time (ms) between calling [[getAppDeployStatus]].
     */
    public waitDeployFinished(apps: number | string | Array<number | string>, intervalMs?: number): Promise<void> {
        if (!Array.isArray(apps)) {
            apps = [apps];
        }
        if (intervalMs === undefined) {
            intervalMs = 1000;
        }
        return this.getAppDeployStatus(apps).then(statuses => {
            const isProcessing = (deployStatus: AppDeployStatus) => {
                return deployStatus.status === DeployStatus.PROCESSING;
            };
            if (statuses.some(isProcessing)) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(this.waitDeployFinished(apps));
                    }, intervalMs);
                }).then(() => {
                    return Promise.resolve();
                });
            }
            return Promise.resolve();
        });
    }
}
