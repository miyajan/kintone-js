import fetch from "node-fetch";
import GetParameters from "./get-parameters";
import Setting from "./setting";

export default class Connection {
    private readonly setting: Setting;

    constructor(setting: Setting) {
        this.setting = setting;
    }

    public requestGet(path: string, params: GetParameters): Promise<any> {
        const url = this.setting.baseUrl + path;
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "GET",
        };

        this.setting.userAuth.customizeHeaders(headers);
        if (this.setting.basicAuth !== undefined) {
            this.setting.basicAuth.customizeHeaders(headers);
        }

        return fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(params),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(new Error(res.statusText));
            }
        });
    }
}
