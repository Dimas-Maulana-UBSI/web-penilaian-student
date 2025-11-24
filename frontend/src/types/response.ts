export type WebResponse<T> = {
  Status: number;
  Message: string;
  Data: T;
};
