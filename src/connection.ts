import fetch from "node-fetch";
import Parameters from "./parameters";
import RequestMethod from "./request-method";
import Setting from "./setting";

export default class Connection {
    private readonly setting: Setting;

    constructor(setting: Setting) {
        this.setting = setting;
    }

    public requestGet(path: string, params: Parameters): Promise<any> {
        return this.request(path, params, RequestMethod.GET);
    }

    public requestPost(path: string, params: Parameters): Promise<any> {
        return this.request(path, params, RequestMethod.POST);
    }

    private request(path: string, params: Parameters, method: RequestMethod): Promise<any> {
        const url = this.setting.baseUrl + path;
        const headers = {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": method,
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
                return new Promise((_, reject) => {
                    res.json().then(json => {
                        reject(json);
                    });
                });
            }
        });
    }
}
