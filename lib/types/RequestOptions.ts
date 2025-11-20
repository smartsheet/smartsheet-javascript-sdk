export interface RequestOptions<QP, B> {
  queryParameters?: QP;
  body?: B;
  customProperties?: Record<string, any>;
}
