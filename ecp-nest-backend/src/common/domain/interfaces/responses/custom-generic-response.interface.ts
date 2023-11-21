export interface ICustomGenericResponse<TData = any> {
  success: boolean;
  data: TData;
  error?: { code: number; message: string };
}

export interface ICustomGenericResponseWithPagination<TData = any> {
  success: boolean;
  data: TData[];
  error?: { code: number; message: string };
  pagination?: IPagination;
}

export interface IPagination {
  total?: number;
  page?: number;
  pageCount?: number;
}

export interface ICustomError {
  code: number;
  message: string;
}
