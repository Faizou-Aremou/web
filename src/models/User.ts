
import { Eventing } from "./Eventing";

export interface UserProps {
  id?: number
  name: string;
  age: number;
}


export class User {
  events = new Eventing();
  constructor(private data: UserProps) {
  }

  get(propName: keyof UserProps): number | string | undefined {
    return this.data[propName];
  }

  set(update: Partial<UserProps>): void {
    this.data = { ...this.data, ...update }
  }

}