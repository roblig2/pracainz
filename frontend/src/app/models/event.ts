import {User} from "./user";

export interface Event {
  id: string;
  name: string;
  date: Date;
  datePacking:Date;
  requiredUsers: number;
  requiredDrivers: number;
  availableUsers: User[];
  location: string,
  eventTime: string,
  packingTime: string
  blackListedUsers: User[]
  confirmedUsers: User[],
  availablePackingUsers?: User[]
}
