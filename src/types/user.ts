import { Request } from 'express';

export interface AuthRequest extends Request {
    user: string
}

export interface User {
    walletAddress: string;
    name: string;
    nonce: string;
    userType: UserType;
    id?: number;
}   

export enum UserType {
    SUPPLIER = 'SUPPLIER',
    CUSTOMER = 'CUSTOMER' ,
    SHIPMENT_PROVIDER = 'SHIPMENT_PROVIDER'
  }