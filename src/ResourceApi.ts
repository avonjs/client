import ActionApi from './ActionApi';
import type Request from './Request';
import type { Pagination, ResourceId } from './types';

class ResourceApi {
  private request: Request;
  private resourceName: string;

  constructor(request: Request, resourceName: string) {
    this.request = request;
    this.resourceName = resourceName;
  }

  // CRUD methods (index, view, create, update, delete)
  async paginate(params: Pagination) {
    return this.request
      .mergeParams(this.queryParams(params))
      .get(this.resourceUri());
  }

  // CRUD methods (index, view, create, update, delete)
  async associable(associableName: string, params: Pagination) {
    return this.request
      .mergeParams(this.queryParams(params))
      .get(this.resourceUri(`/associable/${associableName}`));
  }

  protected queryParams(params: Pagination) {
    const queryParams = new URLSearchParams({
      perPage: params.perPage.toString(),
      page: params.page.toString(),
    });

    if (params.softDeletes) {
      queryParams.append('softDeletes', params.softDeletes);
    }
    if (params.search) {
      queryParams.append('search', params.search);
    }
    for (const [key, value] of Object.entries(params.filters ?? {})) {
      queryParams.append(
        key.includes('filters') ? key : `filters[${key}]`,
        value,
      );
    }
    return queryParams;
  }

  async view(id: ResourceId) {
    return this.request.get(this.resourceUri(`/${id}`));
  }

  async create(data: BodyInit) {
    return this.request.post(this.resourceUri(), data);
  }

  async update(id: ResourceId, data: BodyInit) {
    return this.request.put(this.resourceUri(`/${id}`), data);
  }

  async delete(id: ResourceId) {
    return this.request.delete(this.resourceUri(`/${id}`));
  }

  async forceDelete(id: ResourceId) {
    return this.request.delete(this.resourceUri(`/${id}/force`));
  }

  async restore(id: ResourceId) {
    return this.request.put(this.resourceUri(`/${id}/restore`));
  }

  async review(id: ResourceId) {
    return this.request.get(this.resourceUri(`/${id}/review`));
  }

  protected resourceUri(uri = '/') {
    return `/resources/${this.resourceName}${uri}`;
  }

  // Action method: delegates to the ActionHandler class
  action(actionName: string, destructive = false) {
    return new ActionApi(
      this.request,
      this.resourceName,
      actionName,
      destructive,
    );
  }
}

export { ResourceApi, ResourceApi as default };
