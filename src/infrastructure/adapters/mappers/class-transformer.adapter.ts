import { plainToInstance, instanceToPlain } from "class-transformer";
import IMapper, {
  ClassConstructor,
} from "../../../core/contracts/services/mapper.service";

export default class ClassTransformer implements IMapper {
  toClass<T, V>(cls: ClassConstructor<T>, plain: V): T {
    return plainToInstance(cls, plain);
  }

  toPlain<T>(instance: T): object {
    return instanceToPlain(instance);
  }

  clone<T>(instance: T, cls?: ClassConstructor<T>): T {
    const constructor =
      cls ?? ((instance as object).constructor as ClassConstructor<T>);
    return plainToInstance(constructor, instanceToPlain(instance));
  }
}
