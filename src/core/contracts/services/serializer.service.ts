export default interface ISerializer {
  serialize(error: Error): any;
  deserialize(error: Error): Error;
}
