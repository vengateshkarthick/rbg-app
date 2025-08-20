export type ApiSuccess<T> = {
  data: T;
};

export type ApiError = {
  message: string;
  status?: number;
};


