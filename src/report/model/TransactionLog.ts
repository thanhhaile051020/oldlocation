export class TransactionLog {
  exShortName: string;
  payerShortName: string;
  payeeShortName: string;
  amount: number;
  currency: string;
  bankAccount: string;

  actionDate: Date;
  actionStatus: string;
  description: string;
  ipAddr: string;
}
