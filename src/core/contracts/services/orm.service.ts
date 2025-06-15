export default interface IOrm {
  connect(): Promise<boolean>;
  disconnect(): Promise<void>;
}
