export type Debugger = (...args: unknown[]) => void;

export type ResourceId = string | number;

export type SoftDeletes = 'with' | 'without' | 'only';

export type Pagination = {
  perPage: number;
  page: number;
  softDeletes?: SoftDeletes;
  filters?: Record<string, string>;
  search?: string;
};
