export interface Repo<T> {
  readAll(): Promise<T[]>;
  readID(_id: string): Promise<T>;
  write(_info: Partial<T>): Promise<T>;
  update(_info: Partial<T>): Promise<T>;
  delete(_id: string): Promise<void>;
}
