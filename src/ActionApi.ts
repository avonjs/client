import type Request from './Request';

class ActionApi {
  constructor(
    readonly req: Request,
    readonly resourceName: string,
    readonly actionName: string,
    readonly destructive: boolean,
  ) {}

  // Standalone action (no resource ID)
  public async standalone(data?: BodyInit) {
    return this.makeRequest(
      `/resources/${this.resourceName}/actions/${this.actionName}`,
      data,
    );
  }

  // Inline action (requires a single resource ID)
  public async inline(resourceId: number | string, data?: BodyInit) {
    if (!resourceId) {
      throw new Error('Inline actions require a single resource ID.');
    }

    return this.makeRequest(
      `/resources/${this.resourceName}/${resourceId}/actions/${this.actionName}`,
      data,
    );
  }

  // Bulk action (requires multiple resource IDs)
  public async bulk(resourceIds?: number[], data?: BodyInit) {
    if (!resourceIds || resourceIds.length === 0) {
      throw new Error('Bulk actions require at least one resource ID.');
    }
    return this.makeRequest(
      `/resources/${this.resourceName}/actions/${this.actionName}`,
      data,
    );
  }

  protected async makeRequest(path: string, payload?: BodyInit) {
    return this.destructive
      ? this.req.delete(path, payload)
      : this.req.post(path, payload);
  }
}

export { ActionApi, ActionApi as default };
