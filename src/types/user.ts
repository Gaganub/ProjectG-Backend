import { Request } from 'express';
import { App } from './app';

export interface AuthRequest extends Request {
    user: string
}

export interface User {
    id: number;
    walletAddress: string;
    name: string;
    nonce: string;
    userType: UserType;
    apps: App[];
}

enum UserType {
    SUPPLIER,
    CUSTOMER,
    LOGISTICS_PROVIDER
  }