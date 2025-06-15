import { container } from "tsyringe";
import ILogger from "../../../core/contracts/services/logger.service";

export const getLogger = (): ILogger => container.resolve<ILogger>("Logger");
