export interface apiResponseInterface<T> {
  status: number;
  success: boolean;
  message?: string;
  content?: T;
  lastPage?: boolean;
}
