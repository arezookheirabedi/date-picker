
import Request from "./requestUtil";


interface IRequestBuilder {
    baseUrl: string;
    headers?: {};
}

class RequestBuilder {
    private readonly self: IRequestBuilder;

    constructor() {
        this.self = {
            baseUrl: "",
            headers: {},
        };
        this.detectBaseUrlBaseOnEnv();
    }

    detectBaseUrlBaseOnEnv() {
        switch (process.env.REACT_APP_ENVIRONMENT) {
            case "local":
                return this;
            case "development":
                this.self.baseUrl = `${process.env.REACT_APP_BASE_URL}`;
                return this;
            case "production" :
                this.self.baseUrl = `${process.env.REACT_APP_BASE_URL}`;
                return this;
            default:
                return this;
        }
    }

    forBaseUrl(baseUrl?: string): RequestBuilder {
        this.self.baseUrl = process.env.REACT_APP_BASE_API_URL || baseUrl || "";
        return this;
    }

    forFastUrl(): RequestBuilder {
        this.self.baseUrl = process.env.REACT_APP_FAST_BASE_API_URL || "";
        return this;
    }

    forGuildUrl(): RequestBuilder {
        this.self.baseUrl = process.env.REACT_APP_GUILDS_BASE_API_URL || "";
        return this;
    }

    withHeaders(headers: {}): RequestBuilder {
        this.self.headers = headers;
        return this;
    }

    build(): Request {
        return new Request(this.self.baseUrl, this.self.headers);
    }

}

const request = new RequestBuilder();

export default request;