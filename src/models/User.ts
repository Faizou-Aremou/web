
import { Eventing } from "./Eventing";

export interface UserProps {
  id?: number
  name: string;
  age: number;
}


export class User {
  events = new Eventing();
  constructor(public data: any) {

  }

}