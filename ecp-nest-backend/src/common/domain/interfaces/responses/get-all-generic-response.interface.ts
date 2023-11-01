export interface GetAllGenericResponse<T> {
  items: T[];
  total: number;
  pageCount?: number;
}
