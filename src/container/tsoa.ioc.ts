import { container } from "tsyringe";

export const iocContainer = {
  get: <T>(someClass: new (...args: any[]) => T): T => {
    return container.resolve<T>(someClass);
  },
};
