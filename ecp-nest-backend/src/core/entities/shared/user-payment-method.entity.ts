export class IUserPaymentMethod {
  id: string;
  userId: string;
  paymentMethod: string;
  provider: string;
  accountNumber: string;
  expiryDate?: Date;
  isDefault?: boolean;
}
