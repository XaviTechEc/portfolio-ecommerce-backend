export class IUserPaymentMethod {
  id: string;
  userId: string;
  paymentMethodId: string;
  provider: string;
  accountNumber: string;
  expiryDate?: Date;
  isDefault?: boolean;
}
