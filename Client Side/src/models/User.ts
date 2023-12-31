export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  idNumber: number; // Primary key
  password: string;
  city?: string;
  street?: string;
  role?: string;
}
