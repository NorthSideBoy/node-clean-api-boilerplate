import ILogger from "../../contracts/services/logger.service";
import ISerializer from "../../contracts/services/serializer.service";

export class BaseLogger {
  constructor(
    protected readonly logger: ILogger,
    protected readonly serializer: ISerializer,
    protected readonly type: string,
    protected readonly service?: string
  ) {}

  protected createLogPayload(additionalData: Record<string, any> = {}) {
    return {
      ...additionalData,
      type: this.type,
      service: this.service,
      //timestamp: new Date().toISOString()
    };
  }

  error(error: any, context?: Record<string, any>) {
    const serializedError = this.serializer.serialize(error);
    const payload = this.createLogPayload({
      ...context,
      name: serializedError.name,
      message: serializedError.message
    });
    this.logger.error(payload);
  }

  warning(message: string, context?: Record<string, any>) {
    const payload = this.createLogPayload({
      ...context,
      message
    });
    this.logger.warning(payload);
  }

  info(message: string, context?: Record<string, any>) {
    const payload = this.createLogPayload({
      ...context,
      message
    });
    this.logger.info(payload);
  }

  debug(message: string, context?: Record<string, any>) {
    const payload = this.createLogPayload({
      ...context,
      message
    });
    this.logger.debug(payload);
  }
}

export class ControllerLogger extends BaseLogger {
  constructor(
    logger: ILogger,
    serializer: ISerializer,
    service: string,
    protected readonly route: string,
    protected readonly method: string,
    protected readonly ip: string,
    protected readonly body?: any
  ) {
    super(logger, serializer, 'controller', service);
  }

  protected createLogPayload(additionalData: Record<string, any> = {}) {
    return {
      ...super.createLogPayload(additionalData),
      route: this.route,
      method: this.method,
      ip: this.ip,
      ...(this.body && { body: this.body })
    };
  }
}