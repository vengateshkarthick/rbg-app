export interface RequestConfig {
  signal?: AbortSignal;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | null | undefined>;
}


