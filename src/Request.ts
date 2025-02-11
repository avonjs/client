import type { Debugger } from './types';

class Request {
  protected params = new URLSearchParams();

  constructor(
    protected baseUrl: string,
    protected headers: HeadersInit,
    protected debug: Debugger,
  ) {}

  /**
   * Makes GET requests.
   */
  async get(url: string) {
    return this.makeRequest('GET', url);
  }

  /**
   * Makes POST requests.
   */
  async post(url: string, body?: BodyInit) {
    return this.makeRequest('POST', url, body);
  }

  /**
   * Makes PUT requests.
   */
  async put(url: string, body?: BodyInit) {
    return this.makeRequest('PUT', url, body);
  }

  /**
   * Makes DELETE requests.
   */
  async delete(url: string, body?: BodyInit) {
    return this.makeRequest('DELETE', url, body);
  }

  /**
   * Common request handler.
   */
  private async makeRequest(method: string, uri: string, body?: BodyInit) {
    // Ensure there are no duplicate slashes in the URL
    const url = `${this.baseUrl.replace(/\/$/, '')}/${uri.replace(/^\//, '')}?${this.params.toString()}`;

    this.debug(
      `Send [${method}] request to: '${url}'`,
      `\nHeaders are: ${JSON.stringify(this.headers ?? {})}`,
      `\nPayload is: ${JSON.stringify(body ?? {})}\n`,
    );

    return fetch(url, {
      method,
      headers: this.headers,
      body,
    });
  }

  mergeParams(params: URLSearchParams) {
    params.forEach((value, key) => this.params.append(key, value));

    return this;
  }

  replaceParams(params: URLSearchParams) {
    this.params = params;

    return this;
  }

  mergeHeaders(headers: HeadersInit) {
    this.headers = { ...this.headers, ...headers };

    return this;
  }

  replaceHeaders(headers: HeadersInit) {
    this.headers = headers;

    return this;
  }
}

export { Request, Request as default };
