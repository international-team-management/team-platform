export global {
  export declare type Nullable<T> = T | null;

  export declare const __API_ENDPOINT__: string; // это нужно, чтобы потом добавить переменную в .env и TS не ругался
  export declare const __API_ENDPOINT_BASE__: string;
}
