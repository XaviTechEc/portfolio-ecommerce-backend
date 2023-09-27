export abstract class ILoggerService {
  abstract debug(context: string, message: string): void;
  abstract log(context: string, message: string): void;
  abstract warn(context: string, message: string): void;
  abstract error(context: string, message: string, stack?: string): void;
  abstract verbose(context: string, message: string): void;
}
