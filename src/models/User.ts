
import { Attribute } from "./Attribute";
import { Eventing } from "./Eventing";
import { rootUrl } from "./rootUrl";
import { Sync } from "./Sync";

export interface UserProps {
  id?: number;
  name: string;
  age: number;
}


export class User {
  events = new Eventing();
  sync: Sync = new Sync(rootUrl);
  attributes: Attribute<UserProps>;
  constructor(private data: any) {
    this.attributes = new Attribute(data);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: Partial<UserProps>): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.attributes.get('id');
    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    this.sync.fetch(id).then((response) => {
      this.set(response.data);
    })
  }
}