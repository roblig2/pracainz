import {Role} from "./role";
import {Event} from "./event";

export interface UserDate {
  date:Date;
  remark:string;
}

export interface User {
  id: string;
  firstName:string;
  lastName:string;
  username?:string;
  userCredentials: UserCredentials
  definedRoles:Role[];
  isDriver: boolean;
  dateOfBirth:Date;
  availableDates: UserDate[];
  password?: string;
  phoneNumber: string;
  complaints?:string;
  events?:{ name:string, date:Date ,isEvent:boolean;}[];
}
export interface UserCredentials {
  roles: Role[];
  password?: string;
  username: string;
}

