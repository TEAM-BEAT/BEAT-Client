export interface ApiResponseType<T> {
  status: number;
  message: string;
  data: T;
}
