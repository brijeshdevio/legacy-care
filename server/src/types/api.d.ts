interface ApiSuccess<T> {
  status?: number;
  message?: string;
  data?: T;
}

export interface ApiError<T = unknown> {
  status: number;
  message: string;
  errors?: T;
  code?: string;
  success: false;
}
