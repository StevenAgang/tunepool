export interface ApiResponseInterface<T> {
  status: number;
  success: boolean;
  message?: string;
  content?: T;
  lastPage?: boolean;
}
