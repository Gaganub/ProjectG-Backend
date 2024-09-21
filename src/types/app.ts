import { User } from "./user";


export interface App {
    id: number;
    name: string;
    owner: User;
    version?: string;
  }