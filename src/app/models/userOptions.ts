export interface UserOptions {
  name: string;
  number: string;
  email: string;
  birthday: string;
  password: string;
  role: string;
  id?: string;
}
export interface responsedUserOptions {
  name: string;
  number: string;
  email: string;
  password: string;
  role: string;
  id?: string;
  birthday: {
    seconds: number;
    nanoseconds: number;
  };
}
export interface SignIn {
  email: string;
  password: string;
}
