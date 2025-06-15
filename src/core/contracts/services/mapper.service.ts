export interface ClassConstructor<T> {
  new (...args: unknown[]): T;
}

export default interface IMapper {
  toClass<T, V>(cls: ClassConstructor<T>, plain: V): T;
  toPlain<T>(instance: T): object;
  clone<T>(instance: T, cls?: ClassConstructor<T>): T;
}