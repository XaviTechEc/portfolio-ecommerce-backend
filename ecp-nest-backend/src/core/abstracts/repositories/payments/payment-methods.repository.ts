export abstract class IPaymentMethodsRepository<T> {
  abstract getPaymentMethodById(id: string): Promise<T>;
  abstract createPaymentMethod(data: T): Promise<T>;
  abstract updatePaymentMethod(id: string, data: T): Promise<T>;
  abstract removePaymentMethod(id: string): Promise<T>;
}
