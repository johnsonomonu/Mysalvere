declare module 'flutterwave-react-v3' {
  export interface FlutterwaveConfig {
    public_key: string;
    tx_ref: string;
    amount: number;
    currency: string;
    payment_options: string;
    customer: {
      email: string;
      phone_number: string;
      name: string;
    };
    customizations: {
      title: string;
      description: string;
      logo: string;
    };
  }

  export function useFlutterwave(config: FlutterwaveConfig): (params: { callback: (response: any) => void; onClose: () => void }) => void;
  export function closePaymentModal(): void;
}
