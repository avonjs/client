import Request from './Request';
import ResourceApi from './ResourceApi';
import type { Debugger } from './types';

class AvonClient {
  private baseUrl: string;
  private headers: HeadersInit = { 'Content-Type': 'application/json' };
  private params = new URLSearchParams();
  private debugger: Debugger = console.debug;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Sets custom headers.
   */
  withHeaders(customHeaders: HeadersInit) {
    this.headers = { ...this.headers, ...customHeaders };

    return this;
  }

  /**
   * Sets custom parameters.
   */
  withParam(key: string, value: string) {
    this.params.append(key, value);

    return this;
  }

  /**
   * Resource method to interact with specific resources.
   */
  resource(resourceName: string) {
    return new ResourceApi(this.resolveRequest(), resourceName);
  }

  protected resolveRequest() {
    return new Request(this.baseUrl, this.headers, this.debugger).mergeParams(
      this.params,
    );
  }

  debugUsing(debugUsing: Debugger) {
    this.debugger = debugUsing;

    return this;
  }
}

export { AvonClient, AvonClient as default };
