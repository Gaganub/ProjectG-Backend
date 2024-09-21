import { Request } from 'express';

export interface AuthRequest extends Request {
    user: string
}

export interface User {
    id: number;
    walletAddress: string;
    name: string;
    nonce: string;
    userType: UserType;
}   

enum UserType {
    SUPPLIER,
    CUSTOMER,
    LOGISTICS_PROVIDER
  }