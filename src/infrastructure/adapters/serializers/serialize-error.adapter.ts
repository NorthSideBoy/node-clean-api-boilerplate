import ISerializer from "../../../core/contracts/services/serializer.service";
import * as serializer from "serialize-error";

export default class SerializeError implements ISerializer {
  private serializer: typeof serializer;

  constructor() {
    this.serializer = serializer;
  }

  serialize(error: Error): Object {
    return this.serializer.serializeError(error);
  }

  deserialize(error: Error): Error {
    return this.serializer.deserializeError(error);
  }
}
