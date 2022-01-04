
import { AxiosInstance } from "axios";
import Request, { instanceMock } from "./requestUtil";


interface IRequestBuilder {
    baseUrl: string;
    headers?: {};
    instance?: AxiosInstance
}
interface IOption {
    mock?: boolean;
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
            case "production":
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
        this.self.headers = { ...this.self.headers, ...headers };
        return this;
    }

    build(option?: IOption): Request {
        return new Request(option?.mock ? "" : this.self.baseUrl, this.self.headers, option?.mock ? instanceMock : undefined);
    }

}

const request = new RequestBuilder();

export default request;