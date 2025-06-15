import { container } from "tsyringe";
import IOrm from "../../../core/contracts/services/orm.service";

export const getOrm = (): IOrm => container.resolve<IOrm>("Orm");
