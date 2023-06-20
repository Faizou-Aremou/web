import { AxiosPromise } from "../../node_modules/axios/index";
import { HasId } from "./has-id";

export type CallBack = () => void;
interface ModelAttributes<T extends HasId> {
  set: (value: Partial<T>) => void;
  getAll(): T;
  get: <K extends keyof T>(key:K) => T[K];
}

interface Sync {
  fetch: (id: number) => AxiosPromise;
  save: <T>(data: Partial<T>) => AxiosPromise;
}

interface Events {
  on: (eventName: string, callback: CallBack) => void
  trigger: (eventName: string) => void
}


export class Model<T extends HasId> { // viewModelBase service
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync
  ) {

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

  set(update: Partial<T>): void {
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
  save(): void {
    this.sync.save(this.attributes.getAll()).then(() => { this.trigger('save') }).catch(() => {
      this.trigger('error');
    })
  }
}