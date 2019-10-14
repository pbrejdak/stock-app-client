export interface RegisterForm {
  name: string;
  surname: string;
  email: string;
  password: string;
  cash: number;
  shares: Share;
}

export interface Share {
  id: string;
  amount: number;
}
